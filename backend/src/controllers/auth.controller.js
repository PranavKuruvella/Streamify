import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body

  try {
    if (!email || !password || !fullName) return res.status(400).json({ message: "All fileds required" })

    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" })

    //invalid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return res.status(400).json({ message: "Password must be at least 6 characters" })

    //user or same email unte
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: "Email already exists" })

    //so saving the new User data into db
    const idx = Math.floor(Math.random() * 100) + 1 //generates random num btw 1 to 100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png` //gives random avatars this links need idx from 1 to 100 which gives 100 different avatars

    const newUser = await User.create({ //creates new User and also saves it into db
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    })

    //saving the new User into stream 
    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "https://avatar.iran.liara.run/public/1.png"
      })
      console.log(`Stream User created for ${newUser.fullName} with id ${newUser._id}`)
    } catch (error) {
      console.log(`error creating Stream User!!`, error)
    }


    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d"
    })

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevents XSS attack,
      sameSite: 'strict', //prevents CRSF attacks
      secure: process.env.NODE_ENV === "production",
    })

    res.status(201).json({ success: true, user: newUser })
  } catch (error) {
    console.log('error in signup controller', error)
    res.status(500).json({ message: "Internal server error" })
  }

};

// Login route
export const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" });


    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d"
    })

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevents XSS attack,
      sameSite: 'strict', //prevents CRSF attacks
      secure: process.env.NODE_ENV === "production",
    })

    res.status(201).json({ success: true, user })
  } catch (error) {
    console.log('error in login controller', error)
    res.status(500).json({ message: "Internal server error" })
  }

};

// Logout route
export const logout = (req, res) => {

  res.clearCookie("jwt")
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Onboarding route
export const onboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body

    //checking if everything is present or not
    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All fields required",
        missingFields: [ //just missing values isthundhii
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean), //gives only which are not present 
      });
    }

    //updating the details of the existing user by adding other fields like bio,...
    const updatedUser = await User.findByIdAndUpdate(userId, {
      fullName,
      bio,
      nativeLanguage,
      learningLanguage,
      location,
      isOnboarded: true,
    }, { new: true }); //this new:true....if clg chesthe by default mongo manaki old doc echi then update chesthundhi..now update chesina doc ee isthundhi

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //updating user info in stream
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "https://avatar.iran.liara.run/public/1.png"
      })
      console.log(`Stream User updated for ${updatedUser.fullName} with id ${updatedUser._id} after onboarding`)
    } catch (streamError) {
      console.log(`error updating Stream User!!`)
    }

    res.status(200).json({ success: true, message: "Onboarding successful" });

  } catch (error) {
    console.log('error in onboard controller', error)
    res.status(500).json({ message: "Internal server error" })
  }
}