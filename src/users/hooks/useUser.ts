import { tokenService } from "../../auth/services/index-auth.service";

export const useUser = () => {
  const user = tokenService.decodeToken();

  return {
    user,
    userName: user?.userName,
    rol: user?.rol,
    firstName: user?.firstName,
    lastName: user?.lastName,
  };
};
