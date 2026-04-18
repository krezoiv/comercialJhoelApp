export const bankPageStyles: { [key: string]: React.CSSProperties } = {
  layout: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    background: "#0f172a",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  // 🔥 HEADER GENERAL
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

  // 🔥 KPI SALDO TOTAL (MEJORADO)
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

  // 🔍 BUSCADOR
  search: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#020617",
    color: "white",
    width: "100%",
  },

  // 🔥 CONTENEDOR GENERAL
  tableContainer: {
    margin: "0 30px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  // 🧱 TABLA
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },

  th: {
    padding: "12px",
    borderBottom: "1px solid #334155",
    color: "#94a3b8",
    fontSize: "14px",
    textAlign: "center", // 🔥 AÑADE ESTO
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #1e293b",
    textAlign: "center",
    verticalAlign: "middle", // 🔥 centra vertical también
  },

  // 🏦 HEADER DE BANCO (IMPORTANTE)
  bankHeader: {
    background: "#0f172a",
    fontWeight: "bold",
    color: "#e2e8f0",
  },

  // 💰 NUMEROS
  amount: {
    fontWeight: "bold",
    textAlign: "center", // ✅
  },

  // 🟢 POSITIVO
  positive: {
    color: "#22c55e",
  },

  // 🔴 NEGATIVO
  negative: {
    color: "#ef4444",
  },

  // ✨ HOVER
  rowHover: {
    cursor: "pointer",
    transition: "0.2s",
  },

  // FORM (por si lo usas aún)
  form: {
    width: "30%",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    color: "white",
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
  },

  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    background: "#22c55e",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  editButton: {
    marginRight: "8px",
    padding: "5px 8px",
    border: "none",
    borderRadius: "5px",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "5px 8px",
    border: "none",
    borderRadius: "5px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  },
};
