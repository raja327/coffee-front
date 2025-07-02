import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Public/Auth
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/auth/profile",
        method: "PUT",
        body: userData,
      }),
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: passwordData,
      }),
    }),

    // ✅ Admin-only endpoints
    getAllUsers: builder.query({
      query: () => ({
        url: "/users", // Must be admin-protected on backend
        method: "GET",
      }),
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}/role`,
        method: "PUT",
        body: { role },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery, // 👈 For admin
  useDeleteUserMutation, // 👈 For admin
  useUpdateUserRoleMutation, // 👈 For admin
} = authApi;
