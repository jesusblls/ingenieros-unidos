import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = { 
  matcher: [
    "/home",
    "/materials",
    "/conversations/:path*",
    "/users/:path*",
  ]
};
