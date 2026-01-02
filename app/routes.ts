import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/contact", "routes/contact.tsx"),
  route("/login", "routes/login.tsx"),
  route("/signup", "routes/signup.tsx"),
  route("/verify-email", "routes/verify-email.tsx"),
  route("/resend-verification", "routes/resend-verification.tsx"),
  route("/forgot-password", "routes/forgot-password.tsx"),
  route("/reset-password", "routes/reset-password.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/hiredesk-analyze", "routes/hiredesk-analyze.tsx"),
  route("/hiredesk-chat", "routes/hiredesk-chat.tsx"),
  route("/batch-analyze", "routes/batch-analyze.tsx"),
  route("/compare-resumes", "routes/compare-resumes.tsx"),
  route("/selection-candidates", "routes/selection-candidates.tsx"),
  route("/profile", "routes/profile.tsx"),
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
