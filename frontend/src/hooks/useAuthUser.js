import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAuthUser } from '../lib/api.js'

const useAuthUser = () => {

  const authUser = useQuery({
    queryKey: ['authUser'],
    queryFn: getAuthUser,
    retry: false, //by default tanStack 3 times try chesthundhi if res = err while fetching
  })

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user }// /me route degara user:req.user ani rasam anuduke .user rayali eekada
  //using authUser we can authenticate routes
}

export default useAuthUser
