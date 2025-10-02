import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import React, { use, useEffect, useState } from "react";
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from "../lib/api.js";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../lib/utils.js";
import NoFriendsFound from "../components/NoFriendsFound.jsx";
import FriendCard, { getLanguageFlag } from "../components/FriendCard.jsx";


const HomePage = () => {

	const queryClient = useQueryClient();
	const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set())

	//getting our friends
	const { data: friends = [], isLoading: loadingFriends } = useQuery({
		queryKey: ["friends"],
		queryFn: getUserFriends,
	})

	// getting recommendedUsers
	const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
		queryKey: ["users"],
		queryFn: getRecommendedUsers,
	})

	//outgoing friend req
	const { data: outgoingFriendReqs } = useQuery({
		queryKey: ["outgoingFriendReqs"],
		queryFn: getOutgoingFriendReqs,
	})

	const { mutate: sendRequestMutation, isPending } = useMutation({
		mutationFn: sendFriendRequest,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
	});

	useEffect(() => {
		const outgoingIds = new Set()
		if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
			outgoingFriendReqs.forEach((req) => {
				outgoingIds.add(req.recipient._id)
			})
			setOutgoingRequestsIds(outgoingIds)
		}
	}, [outgoingFriendReqs])

	return (
		<div className="min-h-screen bg-base-100 px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
			<div className="max-w-7xl mx-auto w-full space-y-10">


				{/* Friends req top bar */}

				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
					
					<Link to="/notifications" className="btn btn-outline btn-sm">
						<UsersIcon className="mr-2 size-4" />
						Friend Requests
					</Link>
				</div>



				{/* Recommended users */}

				<section>
					{/* Recommended users top bar */}
					<div className="mb-6 sm:mb-8">
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div>
								<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
								<p className="opacity-70">
									Discover perfect language exchange partners based on your profile
								</p>
							</div>
						</div>
					</div>

					{/* Recommended users list */}

					{loadingUsers ? (
						//loading animation chupisthunam is its loading to get users
						<div className="flex justify-center py-12">
							<span className="loading loading-spinner loading-lg" />
						</div>

					) : recommendedUsers.length === 0 ? (
						<div className="card bg-base-200 p-6 text-center">
							<h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
							<p className="text-base-content opacity-70">
								Check back later for new language partners!
							</p>
						</div>
					) : (

						//RECOMMENDED USERS CHUPISTHUNAM


						<div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
							{recommendedUsers.map((user) => {
								const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

								return (
									<div
										key={user._id}
										className="card bg-base-200 hover:shadow-lg transition-all duration-300">

										{/* USER PROFILE CARD */}

										<div className="card-body p-4 sm:p-5 space-y-4">


											{/* USER PROFILE PIC , NAME, LOCATION */}

											<div className="flex items-center gap-3">
												<div className="avatar size-16 rounded-full">
													<img src={user.profilePic} alt={user.fullName} />
												</div>

												<div>
													<h3 className="font-semibold text-lg">{user.fullName}</h3>
													{user.location && (
														<div className="flex items-center text-xs opacity-70 mt-1">
															<MapPinIcon className="size-3 mr-1" />
															{user.location}
														</div>
													)}
												</div>
											</div>

											{/* Languages with flags */}

											<div className="flex flex-wrap gap-1.5">
												<span className="badge badge-secondary">
													{getLanguageFlag(user.nativeLanguage)}
													Native: {capitialize(user.nativeLanguage)}
												</span>
												<span className="badge badge-outline">
													{getLanguageFlag(user.learningLanguage)}
													Learning: {capitialize(user.learningLanguage)}
												</span>
											</div>

											{/* User Bio */}
											{user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

											{/* FRIEND REQUEST BUTTON */}

											<button
												className={`btn w-9/12 mx-auto mt-2 text-center ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"
													} `}
												onClick={() => sendRequestMutation(user._id)}
												disabled={hasRequestBeenSent || isPending}
											>
												{hasRequestBeenSent ? (
													<>
														<CheckCircleIcon className="size-4 mr-2" />
														Request Sent
													</>
												) : (
													<>
														<UserPlusIcon className="size-4 mr-2" />
														Send Friend Request
													</>
												)}
											</button>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</section>
			</div>
		</div>
	);
};

export default HomePage;
