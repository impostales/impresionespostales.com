import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("admin", "routes/admin.tsx"),
  route("admin/:quoteId", "routes/admin.$quoteId.tsx"),
  route("admin/download/:quoteId", "routes/admin.download.$quoteId.tsx"),
] satisfies RouteConfig;
