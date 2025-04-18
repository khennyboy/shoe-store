import { loginUser, logoutUser } from "../_lib/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLoginLogout() {
 const queryClient = useQueryClient()
  const {
    mutate: login,
    isPending: isLoggingIn,
    error: loginError,
    isError: isLoginError,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationFn: loginUser,
    retry: false,
  });


  const {
    mutate: logout,
    isPending: isLoggingOut,
    error: logoutError,
    isError: isLogoutError,
    isSuccess: isLogoutSuccess,
  } = useMutation({
    mutationFn: logoutUser,
    retry: false,
    onSuccess: () => {
      queryClient.setQueryData(['session'], null);
    }
  });

  return {
    login,
    isLoggingIn,
    loginError,
    isLoginError,
    isLoginSuccess,
    
    logout,
    isLoggingOut,
    logoutError,
    isLogoutError,
    isLogoutSuccess,
  };
}
