import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({ authorizedParties: ["/test"] });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
