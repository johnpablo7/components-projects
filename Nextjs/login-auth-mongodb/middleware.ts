export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"],
  // Protege todas las rutas que esten dentro de dashboard
  // matcher: ["/dashboard/:path*"],
};
