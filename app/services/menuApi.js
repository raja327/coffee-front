import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const menuApi = createApi({
  reducerPath: "menuApi",
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
  tagTypes: ["MenuItem"],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/menu?page=${page}&limit=${limit}`,
      providesTags: ["MenuItem"],
    }),
    getMenuItemById: builder.query({
      query: (id) => `/menu/${id}`,
    }),
    addMenuItem: builder.mutation({
      query: (menuData) => ({
        url: "/menu",
        method: "POST",
        body: menuData,
      }),
      invalidatesTags: ["MenuItem"],
    }),
    updateMenuItem: builder.mutation({
      query: ({ id, body }) => ({
        url: `/menu/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["MenuItem"],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `/menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MenuItem"],
    }),
  }),
});

export const {
  useAddMenuItemMutation,
  useGetMenuItemByIdQuery,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
  useGetMenuItemsQuery,
} = menuApi;
