export const expensesPageStyles = {
  container: {
    display: "flex",
    background: "#020617",
    minHeight: "100vh",
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
