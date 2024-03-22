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
      query: (credentials) => ({
        url: "/auth/user/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    addproperty: builder.mutation({
      query: (credentials) => ({
        url: "/auth/property/add",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    checkout: builder.mutation({
      query: (credentials) => ({
        url: "/auth/checkout/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    fetchProperties: builder.query({
      query: () => ({
        url: "/auth/property/list",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useAddpropertyMutation,
  useCheckoutMutation,
  useFetchPropertiesQuery,
} = authApiSlice;
