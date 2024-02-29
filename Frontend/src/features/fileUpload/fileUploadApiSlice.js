import { apiSlice } from "../../app/api/apiSlice";

const fileUploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    photoUpload: builder.mutation({
      query: (body) => ({
        url: "upload",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePhotoUploadMutation } = fileUploadApiSlice;
