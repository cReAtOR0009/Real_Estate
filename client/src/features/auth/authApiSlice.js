import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "/auth/user/signup",
        method: "POST",
        body: { ...userData },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;

