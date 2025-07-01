import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const branchApi = createApi({
  reducerPath: "branchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Branch"],

  endpoints: (builder) => ({
    getBranches: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/branches?page=${page}&limit=${limit}`,
      providesTags: ["Branch"],
    }),
    createBranch: builder.mutation({
      query: (formData) => ({
        url: "/branches",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Branch"],
    }),
    updateBranch: builder.mutation({
      query: ({ id, body }) => ({
        url: `/branches/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Branch"],
    }),

    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/branches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Branch"],
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchApi;
