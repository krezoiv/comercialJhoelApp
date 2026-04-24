export const bankPageStyles: { [key: string]: React.CSSProperties } = {
  header: {
    padding: "25px 30px 10px 30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  title: {
    color: "white",
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
  },

  total: {
    background: "linear-gradient(90deg, #14532d, #166534)",
    padding: "18px 25px",
    borderRadius: "10px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    width: "fit-content",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },

  search: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#020617",
    color: "white",
    width: "100%",
  },

  tableContainer: {
    margin: "0 30px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    padding: "14px",
    borderBottom: "1px solid #334155",
    color: "#94a3b8",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    textAlign: "center",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #1e293b",
    textAlign: "center",
    verticalAlign: "middle",
  },

  bankHeader: {
    background: "#020617",
    fontWeight: "bold",
    color: "#e2e8f0",
  },

  amount: {
    fontWeight: "bold",
    textAlign: "center",
  },

  positive: {
    color: "#22c55e",
  },

  negative: {
    color: "#ef4444",
  },

  // 🔥 INPUT PRO
  inputBalance: {
    width: "110px",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #334155",
    background: "#020617",
    color: "white",
    textAlign: "center",
    outline: "none",
  },

  // 🔥 BOTONES
  btnEdit: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  btnSave: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#22c55e",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  floatingButton: {
    position: "fixed",
    right: "30px",
    top: "90px",
    padding: "14px 20px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)", // 🔥 detalle fino
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.25s ease",
    zIndex: 1000,
  },

  floatingTotal: {
    position: "fixed",
    left: "50%",
    top: "90px",
    transform: "translateX(-50%)",
    background: "linear-gradient(90deg, #14532d, #166534)",
    padding: "14px 22px",
    borderRadius: "12px",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    transition: "all 0.3s ease",
    zIndex: 998,
  },

  topBar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "rgba(15, 23, 42, 0.85)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #1e293b",
  },

  toolbarLeft: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  toolbarRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  kpi: {
    background: "linear-gradient(90deg, #14532d, #166534)",
    padding: "10px 18px",
    borderRadius: "10px",
    color: "white",
    fontWeight: "bold",
    fontSize: "14px",
  },

  saveButton: {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  toast: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#22c55e",
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: "bold",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    animation: "slideIn 0.4s ease",
    zIndex: 9999,
  },
};
