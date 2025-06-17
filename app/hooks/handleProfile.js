"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../_lib/apis";

export default function useProfile(id) {

  const enabled = !!id; 

  const {
    data: profile,
    isPending,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserProfile(id),
    retry: false,
    enabled, 
  });

  return { profile, isPending, error, isError, isSuccess };
}
