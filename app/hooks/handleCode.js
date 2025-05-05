'use client'
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
  });
  
  return {sendCode, isLoading, error, isError, isSuccess };
}
