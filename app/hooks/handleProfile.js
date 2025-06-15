"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../_lib/apis";

export default function useProfile(id) {
  const { data: profile, isPending, error, isError, isSuccess } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(id),
    retry: false,
  });

  return { profile, isPending, error, isError, isSuccess };
}
