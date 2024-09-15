import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/user/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    addproperty: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/property/add",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    checkout: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/checkout/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    fetchProperties: builder.query({
      query: () => ({
        url: "/api/v1/auth/property/list",
        method: "GET",
      }),
    }),
    searchProperties: builder.query({
      query: (searchParams) => {
        const queryString = new URLSearchParams(searchParams).toString();
        console.log("queryString:", queryString) 
        return {
          url: `/api/v1/auth/property/search/search?${queryString}`,
          method: "GET",
        };
      },
    }), 
    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/user/logout",
        method: "POST",
      }),
    }),

    propertyEnquiry: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/property/enquire",
        method: "POST",
        body: { ...credentials },
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
  usePropertyEnquiryMutation,
  useSearchPropertiesQuery,
  useLogoutMutation,
} = authApiSlice;
