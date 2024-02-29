import { apiSlice } from "../../app/api/apiSlice";

const friendApiSlice = apiSlice.injectEndpoints({
  tagType: ["Friend"],
  endpoints: (builder) => ({
    getAllFriends: builder.query({
      query: () => ({
        url: "friends/",
        method: "GET",
      }),
      providesTags: ["Friend"],
      keepUnusedDataFor: 5,
    }),
    isFriend: builder.query({
      query: (userId) => ({
        url: `friends/${userId}`,
        method: "GET",
      }),
      providesTags: ["Friend"],
    }),
    addFriend: builder.mutation({
      query: ({ userId }) => ({
        url: "friends/add",
        method: "PATCH",
        body: {
          userId,
        },
      }),
      invalidatesTags: ["Friend"],
    }),
    removeFriend: builder.mutation({
      query: ({ userId }) => ({
        url: "friends/remove",
        method: "PATCH",
        body: {
          userId,
        },
      }),
      invalidatesTags: ["Friend"],
    }),
  }),
});

export const {
  useGetAllFriendsQuery,
  useIsFriendQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
} = friendApiSlice;
