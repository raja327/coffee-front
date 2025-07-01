import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminUserApi = createApi({
  reducerPath: "adminUserApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/admin",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllStats: builder.query({
      query: () => "/stats",
    }),

    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllStatsQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = adminUserApi;
