import type { CSSProperties } from "react";

export const navbarStyles = (
  collapsed: boolean,
): Record<string, CSSProperties> => ({
  /* 🔥 CONTENEDOR PRINCIPAL */
  navbar: {
    position: "fixed",
    top: "0px",
    left: collapsed ? "70px" : "230px", // 🔥 dinámico
    right: "10px",

    height: "65px",
    borderRadius: "14px",

    background: "rgba(15,23,42,0.75)",
    backdropFilter: "blur(12px)",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "0 20px",

    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",

    zIndex: 999,
  },

  /* 🔵 LEFT */
  left: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  },

  logoContainer: {
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    position: "relative",
    transition: "transform 0.2s ease",
  },

  logo: {
    width: "28px",
    height: "28px",
    objectFit: "contain" as const,
  },

  logoBadge: {
    position: "absolute",
    top: "4px",
    right: "4px",
    width: "10px",
    height: "10px",
    background: "#22c55e",
    borderRadius: "50%",
    boxShadow: "0 0 0 0 rgba(34,197,94,0.7)",
    animation: "pulse 1.5s infinite",
  },

  brand: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1",
  },

  appName: {
    fontSize: "15px",
    fontWeight: "600",
  },

  subtitle: {
    fontSize: "11px",
    color: "#94a3b8",
  },

  /* 🔔 RIGHT */
  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  notificationContainer: {
    position: "relative",
    cursor: "pointer",
  },

  bell: {
    fontSize: "20px",
  },

  notificationBadge: {
    position: "absolute",
    top: "-5px",
    right: "-8px",
    background: "#ef4444",
    color: "white",
    borderRadius: "50%",
    fontSize: "10px",
    padding: "2px 6px",
  },

  notificationDropdown: {
    position: "absolute",
    top: "35px",
    right: "0",
    width: "220px",
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "10px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
    zIndex: 100,
    overflow: "hidden",
  },

  notificationItem: {
    padding: "10px",
    fontSize: "13px",
    borderBottom: "1px solid #1e293b",
    cursor: "pointer",
  },

  userInfo: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
  },

  userName: {
    fontWeight: "bold",
  },

  rol: {
    fontSize: "11px",
    color: "#94a3b8",
  },

  button: {
    background: "#ef4444",
    border: "none",
    padding: "8px 14px",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.2s",
  },
  /* 🔥 HEADER USER (INICIALES + NOMBRE) */
  headerUserContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    transition: "all 0.3s ease",
  },

  initials: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600,
    fontSize: "18px",
    color: "#22c55e",
    letterSpacing: "3px",
    textShadow: "0 0 8px rgba(34,197,94,0.6)",
  },

  smallName: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "10px",
    color: "#9ca3af",
    textAlign: "center" as const,
    lineHeight: "12px",
    maxWidth: "60px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
});
