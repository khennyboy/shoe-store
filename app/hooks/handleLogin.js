
import { loginUser } from "../_lib/apis";
import { useMutation} from "@tanstack/react-query";

export default function useLogin() {
  const {
    mutate: login,
    isPending: isLoading,
    error,
    isError,
    isSuccess
  } = useMutation({
    mutationFn: loginUser,
    retry: false,
  });
  
  return {login, isLoading, error, isError, isSuccess };
}
