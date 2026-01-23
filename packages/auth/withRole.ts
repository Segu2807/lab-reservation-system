export const withRole = (role: string, user: any) => {
  if (user.role !== role) {
    window.location.href = "/dashboard";
  }
};
