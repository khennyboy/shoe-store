'use client'
import { handleSendCode, sendOtpEmail } from "../_lib/send-code";
import { useMutation} from "@tanstack/react-query";

export default function useCode() {
  const {
    mutate: sendCode,
    isPending: isLoading,
    error,
    isError,
    isSuccess
  } = useMutation({
    mutationFn: handleSendCode,
    retry: false,
  });
  
  return {sendCode, isLoading, isSuccess };
}
