import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../_lib/apis";

export default function useSignup() {
    const {
      mutate: signup,
      isPending: signupLoading,
      error:signupError,
      isError:signupisError,
      isSuccess:signupisSuccess
    } = useMutation({
      mutationFn: ({otp, email, password})=>signupUser(otp, email, password),
      retry: false,
    });
    
    return {signup, signupLoading, signupError, signupisError,signupisSuccess };
  }
  

  