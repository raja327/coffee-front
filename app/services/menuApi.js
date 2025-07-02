import { apiSlice } from "./apiSlice";

export const menuApi = apiSlice.injectEndpoints({
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
  overrideExisting: false,
});

export const {
  useAddMenuItemMutation,
  useGetMenuItemByIdQuery,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
  useGetMenuItemsQuery,
} = menuApi;
