import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { signup } from '../lib/api.js';

const useSignUp = () => {

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  })

  // this part is working fine fix aipoindhi
  /* this part is the core part of the auth thing... line 17-23 lo 29 lo singupData ni save chesthunam..after succesfull saving ee useMutation lo automatic ga metadata kind of save avthundhi adhi pendingaa err ochandha ani..so onSuccess lo App.jsx lo unna Data ni fetch chesi malla update cheyu ani chepthunam..akada unna data update aii malla routes lo check avthundhi for redirection */


  return { signupMutation: mutate, isPending, error }
}

export default useSignUp
