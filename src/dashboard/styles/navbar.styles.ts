export const navbarStyles: { [key: string]: React.CSSProperties } = {
  navbar: {
    height: "70px",
    background: "#0f172a",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    color: "white",
    borderBottom: "1px solid #1e293b",
  },
  left: {
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
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
    fontSize: "12px",
    color: "#94a3b8",
  },
  button: {
    background: "#ef4444",
    border: "none",
    padding: "8px 14px",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
