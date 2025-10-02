import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUserFriends } from '../lib/api'
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import FriendCard from "../components/FriendCard.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";


const FriendsPage = () => {

  //getting our friends
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  })

  return (
    <div className="min-h-screen bg-base-100 px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full space-y-10">

        {/* Friends req top bar */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>


        {/* Friends list */}

        {loadingFriends ? ( //loading animation chupisthunam
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound /> //friends lekapothe
        ) : (
          //friends ni chupisthunam
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default FriendsPage
