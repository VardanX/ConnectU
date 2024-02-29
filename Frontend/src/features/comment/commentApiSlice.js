import { apiSlice } from "../../app/api/apiSlice";

const commentApiSlice = apiSlice.injectEndpoints({
  tagType: ["Comment"],
  endpoints: (builder) => ({
    getAllComment: builder.query({
      query: (postId) => ({
        url: `posts/${postId}/comment`,
        method: "GET",
      }),
      providesTags: ["Comment", "User"],
    }),
    createComment: builder.mutation({
      query: ({ postId, description, userId }) => ({
        url: `posts/${postId}/comment`,
        method: "POST",
        body: {
          description,
          userId,
        },
      }),
      invalidatesTags: ["Comment"],
    }),
    updateComment: builder.mutation({
      query: ({ postId, commentId, description, userId }) => ({
        url: `posts/${postId}/comment/${commentId}`,
        method: "PATCH",
        body: {
          description,
          userId,
        },
      }),
      invalidatesTags: ["Comment", "User"],
    }),
    deleteComment: builder.mutation({
      query: ({ postId, commentId, userId }) => ({
        url: `posts/${postId}/comment/${commentId}`,
        method: "DELETE",
        body: {
          userId,
        },
      }),
      invalidatesTags: ["Comment", "User"],
    }),
  }),
});

export const {
  useGetAllCommentQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApiSlice;
