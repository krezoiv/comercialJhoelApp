import { useNavigate } from "react-router-dom";
import { tokenService } from "../../auth/services/tokenService.service";
import { useUser } from "../../users/hooks/useUser";
import { routes } from "../../routes/routes";
import { navbarStyles } from "../styles/navbar.styles";

export const Navbar = () => {
  const { userName, rol } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    tokenService.removeToken();
    navigate(routes.login);
  };

  return (
    <div style={navbarStyles.navbar}>
      <div>📚 App Librería</div>

      <div style={navbarStyles.right}>
        <span>{userName}</span>
        <span style={navbarStyles.rol}>{rol}</span>

        <button onClick={handleLogout} style={navbarStyles.button}>
          Logout
        </button>
      </div>
    </div>
  );
};