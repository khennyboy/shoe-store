'use client'
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../_lib/apis";

export const useUser = () => {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });
  return { user, isPending };
};
