const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://coffee-back-w7ki.onrender.com/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["User", "Branch", "MenuItem", "Order", "Review"],
  endpoints: () => ({}),
});
