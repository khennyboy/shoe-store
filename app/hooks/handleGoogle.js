'use client'
import { useMutation } from "@tanstack/react-query";
import { signInWithGoogle } from "../_lib/apis";

export default function useGoogle() {
    const {
      mutate: loginGoogle,
      isPending: isLoadingGoogle,
      error:errorGoogle,
      isError:isErrorGoogle,
      isSuccess:isSuccessGoogle,
    } = useMutation({
      mutationFn: signInWithGoogle,
      retry :false,
    });
    
    return {loginGoogle, isLoadingGoogle, errorGoogle, isErrorGoogle, isSuccessGoogle };
  }
  