import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutGoingFriendReqs, getRecommendedUser, sendFriendRequest } from '../controllers/user.controller.js'

const router = express.Router()

router.use(protectRoute) //apply this as middleware to all routes...see that code...req lo user add ai untadu

router.get("/", getRecommendedUser) //will give the recommended friends
router.get("/friends", getMyFriends) //will give the friends of the user

router.post("/friend-request/:id", sendFriendRequest)
router.put("/friend-request/:id/accept", acceptFriendRequest) //manam vere valla req ni accept chesthe change in db chese route edhii...
router.get("/friend-requests", getFriendRequests) //notifications tab laga pampina or ochina req chupisthundhi
router.get("/outgoing-friend-request", getOutGoingFriendReqs) 

export default router