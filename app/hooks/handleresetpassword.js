'use client'
import { useMutation } from "@tanstack/react-query";
import { signupUser, updateUser } from "../_lib/apis";

export default function useUpdateUser() {
    const {
      mutate: updateUserData,
      isPending: isUpdating,
      error,
      isError,
      isSuccess
    } = useMutation({
      mutationFn: updateUser,
      retry: false,
    });
    
    return {updateUserData, isUpdating, error, isError, isSuccess };
  }
  

  