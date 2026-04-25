export const sideBarStyles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: "230px",
    height: "100%",
    borderRadius: "16px", // 🔥 clave
    top: "0",
    left: "0",

    background: `
  linear-gradient(
    180deg,
    #020617 0%,
    #020617 40%,
    #031022 70%,
    #020617 100%
  ),
  radial-gradient(
    circle at bottom left,
    rgba(34,197,94,0.18),
    transparent 40%
  ),
  radial-gradient(
    circle at top left,
    rgba(59,130,246,0.12),
    transparent 35%
  )
`,
    border: "1px solid rgba(255,255,255,0.04)",
    boxShadow: `
  inset 0 1px 0 rgba(255,255,255,0.02),
  0 10px 30px rgba(0,0,0,0.6)
`,
    backdropFilter: "blur(10px)",

    padding: "15px 10px",
    display: "flex",
    flexDirection: "column",
  },
  sublink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    borderRadius: "10px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)", // 👈 borde tipo botón
    color: "#cbd5f5",
    cursor: "pointer",
    fontSize: "13px",
    transition: "all 0.25s ease",
  },
  sidebarCollapsed: {
    width: "70px",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "white",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  logo: {
    fontSize: "20px",
  },

  logoText: {
    fontSize: "16px",
  },

  toggle: {
    background: "#020617",
    border: "1px solid #1e293b",
    color: "white",
    cursor: "pointer",
    borderRadius: "8px",
    marginBottom: "15px",
    padding: "6px",
    transition: "0.2s",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    borderRadius: "10px",
    background: "transparent",
    border: "none",
    color: "#cbd5f5",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  sublinkHover: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid #22c55e",
    color: "white",
  },

  sublinkActive: {
    background: "linear-gradient(135deg, #0287cf, #16a34a)",
    border: "1px solid transparent",
    color: "white",
    boxShadow: "0 0 10px rgba(34,197,94,0.4)",
  },

  linkHover: {
    background: "#1e293b",
    transform: "translateX(3px)",
  },

  linkActive: {
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "white",
    boxShadow: "0 0 12px rgba(34,197,94,0.4)",
  },

  submenuContainer: {
    overflow: "hidden",
    transition: "max-height 0.3s ease",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginLeft: "12px",
  },
};
