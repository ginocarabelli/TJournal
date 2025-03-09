export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", "/dashboard/cuentas", "/dashboard/trades", "/dashboard/configuracion"] }