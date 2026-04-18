import { Navigate } from "react-router-dom";
import { tokenService } from "../services/tokenService.service";


type Props = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const isAuth = tokenService.isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};