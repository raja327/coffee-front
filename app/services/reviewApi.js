import { apiSlice } from "./apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
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
  overrideExisting: false,
});

export const {
  useGetReviewsByMenuIdQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useUpdateReviewStatusMutation,
} = reviewApi;
