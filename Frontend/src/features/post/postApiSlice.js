import { apiSlice } from "../../app/api/apiSlice";

const postApiSlice = apiSlice.injectEndpoints({
  tagType: ["Post"],
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => ({
        url: "posts",
        method: "GET",
      }),
      providesTags: ["Post", "User"],
    }),
    getUserPost: builder.query({
      query: (userId) => ({
        url: `posts/${userId}`,
        method: "GET",
      }),
      providesTags: ["Post", "User"],
    }),
    getIsPostLiked: builder.query({
      query: (postId) => ({
        url: `posts/${postId}/like`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: (body) => ({
        url: `posts/${body.postId}`,
        method: "PATCH",
        body: {
          caption: body.caption,
          userId: body.userId,
        },
      }),
      invalidatesTags: ["Post", "User"],
    }),
    deletePost: builder.mutation({
      query: (body) => ({
        url: `posts/${body.postId}`,
        method: "DELETE",
        body: {
          userId: body.userId,
        },
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: `posts/${postId}/like`,
        method: "PATCH",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetUserPostQuery,
  useGetIsPostLikedQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
} = postApiSlice;
