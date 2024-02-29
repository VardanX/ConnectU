import { useGetSingleUserQuery } from "../features/user/userApiSlice";

export default function useFetchSingleUser(userId) {
  const { isLoading, isError, data } = useGetSingleUserQuery(userId);
  return { isLoading, isError, data };
}
