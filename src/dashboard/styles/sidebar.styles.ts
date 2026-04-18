export const sideBarStyles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: "220px",
    background: "#1e293b",
    padding: "20px 10px",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s",
  },

  sidebarCollapsed: {
    width: "70px",
  },

  logo: {
    color: "white",
    marginBottom: "20px",
    textAlign: "center",
  },

  toggle: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    marginBottom: "20px",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    borderRadius: "8px",
    background: "transparent",
    border: "none",
    color: "#cbd5f5",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s",
  },

  linkActive: {
    background: "#3b82f6",
    color: "white",
  },

  icon: {
    minWidth: "20px",
  },

  label: {
    whiteSpace: "nowrap",
  },

  submenu: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
};
