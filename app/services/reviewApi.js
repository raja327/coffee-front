import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
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
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    getReviewsByMenuId: builder.query({
      query: (menuItemId) => `/reviews/${menuItemId}`,
      providesTags: ["Review"],
    }),
    createReview: builder.mutation({
      query: ({ menuId, rating, comment }) => ({
        url: `/reviews/${menuId}`,
        method: "POST",
        body: { rating, comment },
      }),
      invalidatesTags: ["Review"],
    }),

    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
    getAllReviews: builder.query({
      query: () => "/reviews",
      providesTags: ["Review"],
    }),
    updateReviewStatus: builder.mutation({
      query: ({ reviewId, status }) => ({
        url: `/reviews/${reviewId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});
export const {
  useGetReviewsByMenuIdQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useUpdateReviewStatusMutation,
} = reviewApi;
