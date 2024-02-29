import { apiSlice } from "../../app/api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  tagType: ["User"],
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (search) => ({
        url: `users?search=${search}`,
        method: "GET",
      }),
    }),
    getSingleUser: builder.query({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "GET",
      }),
      providesTags: ["User", "Friend"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Post", "Comment"],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/users/${body.userId}`,
        method: "PATCH",
        body: {
          firstName: body.firstName,
          lastName: body.lastName,
          address: body.address,
          occupation: body.occupation,
        },
      }),
      invalidatesTags: ["User", "Post", "Comment"],
    }),
    updateProfilePicture: builder.mutation({
      query: (body) => ({
        url: `users/profilepicture/${body.userId}`,
        method: "PATCH",
        body: {
          picturePath: body.picturePath,
        },
      }),
      invalidatesTags: ["User", "Post", "Comment"],
    }),
    getPeopleYouMayKnow: builder.query({
      query: () => ({
        url: "users/people",
        method: "GET",
      }),
      providesTags: ["User", "Friend"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateProfilePictureMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetPeopleYouMayKnowQuery,
} = userApiSlice;
