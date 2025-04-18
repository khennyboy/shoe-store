import { useQuery } from "@tanstack/react-query";
import { getSession } from "../_lib/apis";

export const useSession = () => {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    retry: false,
  });
  return { session };
};
