import FriendRequest from "../models/FriendRequest.js"
import User from "../models/User.js"

export const getRecommendedUser = async (req, res) => {

  try {
    const currentUserId = req.user.id
    const currentUser = req.user

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentUser.friends } }, //exclude current users friends
        { isOnboarded: true }
      ]
    })
    res.status(200).json(recommendedUsers)
  } catch (error) {
    console.log(`error in getRecommendedUser route`, error)
    res.status(500).json({ message: "Internal server error" })

  }

}

export const getMyFriends = async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select("friends").populate("friends", "fullName profilePic nativeLanguage learningLanguage") // only friends ni return chey where..friends lo prati oka id yokka full doc evvu but only give fullname profilepic.... and all in that doc
    res.status(200).json(user.friends)

  } catch (error) {
    console.log(`error in getMyFriends route`, error)
    res.status(500).json({ message: "Internal server error" })

  }

}

export const sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user.id
    const { id: recipientId } = req.params //url lo /:id ani undhi kabatti {id} ani rasthamu

    //prevent sending req to urlSelf
    if (myId === recipientId) {
      return res.status(400).json({ message: "You cannot send a friend request to yourself" })
    }

    //check if recipient exist
    const recipient = await User.findById(recipientId)
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" })
    }

    //if user and recipient r already friends
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "Users are already friends" })
    }

    //check id req already exist
    const existingRequest = await FriendRequest.findOne({ //motham model lo check chesthundhi with that condition and returns the top doc...if existingRequest null aithe req pampaledhu ani ardham as it isnt found in the db
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId }
      ]
    })

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" })
    }

    const FriendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId
    })

    res.status(201).json({ message: "Friend request sent successfully" })


  } catch (error) {
    console.log(`error in sendFriendRequest route`, error)
    res.status(500).json({ message: "Internal server error" })

  }
}

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params

    const friendRequest = await FriendRequest.findById(requestId)
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" })
    }

    //verify if the current user is the recipient
    //main ga aa req lo as recipient maname unnama ledha anedhi chustham..so eekada req.user.id lo recipient id untadhii
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to accept this friend request" })
    }

    friendRequest.status = "accepted"
    await friendRequest.save()

    //add each user to the other's friends array
    await User.findByIdAndUpdate(friendRequest.sender, { //sender lo ki recipent add chesthunam
      $addToSet: { friends: friendRequest.recipient } //$addToSet adds element if not present only
    })

    await User.findByIdAndUpdate(friendRequest.recipient, { //recipient loki sender ni add chesthunam
      $addToSet: { friends: friendRequest.sender }
    })

    res.status(200).json({ message: "Friend request accepted successfully" })

  } catch (error) {
    console.log(`error in acceptFriendRequest route`, error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getFriendRequests = async (req, res) => {
  try {
    //manaki ochina req
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending"
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage")

    //manam pampina req accept aindha ledha ani
    const acceptedReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "accepted"
    }).populate("recipient", "fullName profilePic")

    res.status(200).json({ incomingReqs, acceptedReqs })

  } catch (error) {
    console.log(`error in getFriendRequests route`, error)
    res.status(500).json({ message: "Internal server error" })

  }
}

export const getOutGoingFriendReqs = async (req, res) => {
  try {
    const outgoingReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "pending"
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage")

    res.status(200).json(outgoingReqs)
  } catch (error) {
    console.log(`error in getOutGoingFriendReqs route`, error)
    res.status(500).json({ message: "Internal server error" })
  }
}
