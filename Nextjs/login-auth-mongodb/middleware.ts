export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"],
  // path protege todas las rutas que esten dentro de dashboard
  // matcher: ["/dashboard/:path*"],
};
