import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),
    getMyOrders: builder.query({
      query: () => "/orders/my",
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
  overrideExisting: false,
});

export const {
  usePlaceOrderMutation,
  useGetMyOrdersQuery,
  useDeleteMyOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
