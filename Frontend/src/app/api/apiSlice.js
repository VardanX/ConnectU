import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/dist/query/react";
import { logout, setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:3000/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

/**
 *
 * @param {*} args
 * @param {*} api
 * @param {*} extraOptions
 * @returns refresh access token if resfresh token has been expired
 */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  //   console.log(result);
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResutl = await baseQuery("auth/refresh", api, extraOptions);

    if (refreshResutl?.data) {
      // store the new token
      api.dispatch(setCredentials(refreshResutl?.data?.accessToken));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
    console.log(refreshResutl);
  }

  return result;
};
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
