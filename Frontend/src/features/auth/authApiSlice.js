import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
    }),
    signin: builder.mutation({
      query: (body) => ({
        url: "auth",
        method: "POST",
        body,
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "auth/reset",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useSignoutMutation,
  useResetPasswordMutation,
} = authApiSlice;
