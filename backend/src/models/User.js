import mongoose, { mongo } from "mongoose"
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default: "",
  },
  nativeLanguage: {
    type: String,
    default: "",
  },
  learningLanguage: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  isOnboarded:{ //authorization ki help avthundhii..onboarded aithene main chats ki reqidect cheyachu else onboarding page ki redirect chestham! and then make this val to true
    type:Boolean,
    default:false,
  },

  friends:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  ]
}, { timestamps: true }); // Saves createdAt and updatedAt timestamps


//hashing the password, prev projects renditilo manam controller lo original pass ni hash chesi apudu db call chesthunam 
// eepudu manam direct lo model ki db lo save chese mundhu chey ani chepthunam , more scalable anta! THIS IS BEST

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is new/changed

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


const User = mongoose.model('User', userSchema);
export default User;


