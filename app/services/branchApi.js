import { apiSlice } from "./apiSlice";

export const branchApi = apiSlice.injectEndpoints({
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
