import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
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
  tagTypes: ["Order"],

  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),
    getMyOrders: builder.query({
      query: () => "/orders/my",
      method: "GET",
      providesTags: ["Order"],
    }),
    deleteMyOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/my/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),

    getAllOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Order"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  usePlaceOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteMyOrderMutation,
} = orderApi;
