
import { toast } from "react-toastify";
import { sendOtpEmail } from "../_lib/send-code";
import { useMutation} from "@tanstack/react-query";

export default function useCode() {
  const {
    mutate: sendCode,
    isPending: isLoading,
    error,
    isError,
    isSuccess
  } = useMutation({
    mutationFn: sendOtpEmail,
    retry: false,
    onError: (err) => {
        console.error('Caught by react-query:', err); // <-- put this to see it
        toast.error(err.message); // this will show your custom message
      },
  });
  
  return {sendCode, isLoading, error, isError, isSuccess };
}
