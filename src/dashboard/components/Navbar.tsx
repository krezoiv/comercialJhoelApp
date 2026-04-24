import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { tokenService } from "../../auth/services/tokenService.service";
import { useUser } from "../../users/hooks/useUser";
import { routes } from "../../routes/routes";
import { navbarStyles } from "../styles/navbar.styles";

import logo from "../../assets/logo.png";

export const Navbar = () => {
  const { userName, rol } = useUser();
  const navigate = useNavigate();

  const [openNotif, setOpenNotif] = useState(false);

  const notifications = [
    { id: 1, text: "Nuevo gasto registrado" },
    { id: 2, text: "Cliente actualizado" },
  ];

  const handleLogout = () => {
    tokenService.removeToken();
    navigate(routes.login);
  };

  return (
    <div style={navbarStyles.navbar}>
      {/* LEFT */}
      <div style={navbarStyles.left} onClick={() => navigate("/dashboard")}>
        <div style={navbarStyles.logoContainer}>
          <img src={logo} alt="logo" style={navbarStyles.logo} />
          <span style={navbarStyles.logoBadge}></span>
        </div>

        <div style={navbarStyles.brand}>
          <span style={navbarStyles.appName}>Comercial Jhoel</span>
          <span style={navbarStyles.subtitle}>Sistema financiero</span>
        </div>
      </div>

      {/* RIGHT */}
      <div style={navbarStyles.right}>
        {/* NOTIFICACIONES */}
        <div style={navbarStyles.notificationContainer}>
          <span
            style={navbarStyles.bell}
            onClick={() => setOpenNotif(!openNotif)}
          >
            🔔
          </span>

          <span style={navbarStyles.notificationBadge}>
            {notifications.length}
          </span>

          {openNotif && (
            <div style={navbarStyles.notificationDropdown}>
              {notifications.map((n) => (
                <div key={n.id} style={navbarStyles.notificationItem}>
                  {n.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* USER */}
        <div style={navbarStyles.userInfo}>
          <span style={navbarStyles.userName}>{userName}</span>
          <span style={navbarStyles.rol}>{rol}</span>
        </div>

        {/* LOGOUT */}
        <button onClick={handleLogout} style={navbarStyles.button}>
          Logout
        </button>
      </div>
    </div>
  );
};
