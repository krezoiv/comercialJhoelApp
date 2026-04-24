export const expensesPageStyles = {
  container: {
    minHeight: "100vh",
    background: "transparent", // 👈 importante
    padding: "20px",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
  },

  inner: {
    padding: "20px",
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  },

  title: {
    color: "white",
    marginBottom: "20px",
  },

  tableWrapper: {
    marginTop: "20px",
  },

  loading: {
    color: "white",
  },

  // 🔥 NUEVO (IMPORTANTE)
  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "20px",
  },
};
