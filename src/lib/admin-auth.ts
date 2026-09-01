export const adminEmail = "admin@gmail.com";
export const adminPassword = "Admin123";

export function isAdminRequest(request: Request) {
  return (
    request.headers.get("x-admin-email") === adminEmail &&
    request.headers.get("x-admin-password") === adminPassword
  );
}
