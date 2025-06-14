'use client'
import {  useQuery } from "@tanstack/react-query";
import {  userProfile } from "../_lib/apis";

export default function usePofile() {
    const {
      data,
      isPending,
      error,
      isError,
      isSuccess,
    } = useQuery({
      queryFn: userProfile,
      retry :false,
    });
    
    return {data};
  }
  