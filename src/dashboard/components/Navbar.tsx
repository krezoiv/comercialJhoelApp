import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { tokenService } from "../../auth/services/tokenService.service";
import { useUser } from "../../users/hooks/useUser";
import { routes } from "../../routes/routes";
import { navbarStyles } from "../styles/navbar.styles";

import logo from "../../assets/logo.png";

interface Props {
  collapsed: boolean;
}

export const Navbar = ({ collapsed }: Props) => {
  const { userName, rol } = useUser();
  const navigate = useNavigate();

  const [openNotif, setOpenNotif] = useState(false);

  const styles = navbarStyles(collapsed); // 🔥 clave

  const notifications = [
    { id: 1, text: "Nuevo gasto registrado" },
    { id: 2, text: "Cliente actualizado" },
  ];

  const handleLogout = () => {
    tokenService.removeToken();
    navigate(routes.login);
  };

  return (
    <div style={styles.navbar}>
      {/* LEFT */}
      <div style={styles.left} onClick={() => navigate("/dashboard")}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="logo" style={styles.logo} />
          <span style={styles.logoBadge}></span>
        </div>

        <div style={styles.brand}>
          <span style={styles.appName}>Comercial Jhoel</span>
          <span style={styles.subtitle}>Sistema financiero</span>
        </div>
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <div style={styles.notificationContainer}>
          <span style={styles.bell} onClick={() => setOpenNotif(!openNotif)}>
            🔔
          </span>

          <span style={styles.notificationBadge}>{notifications.length}</span>

          {openNotif && (
            <div style={styles.notificationDropdown}>
              {notifications.map((n) => (
                <div key={n.id} style={styles.notificationItem}>
                  {n.text}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.userInfo}>
          <span style={styles.userName}>{userName}</span>
          <span style={styles.rol}>{rol}</span>
        </div>

        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
};
