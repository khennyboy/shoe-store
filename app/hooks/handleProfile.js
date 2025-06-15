"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../_lib/apis";

export default function useProfile() {
  const { data, isPending, error, isError, isSuccess } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false,
  });

  return { data, isPending, error, isError, isSuccess };
}
