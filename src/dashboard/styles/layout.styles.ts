export const layoutStyles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",

    // 🔥 FONDO GLOBAL PRO
    background: `
    radial-gradient(circle at 20% 10%, rgba(34,197,94,0.08), transparent 40%),
    radial-gradient(circle at 80% 90%, rgba(59,130,246,0.08), transparent 40%),
    #020617
  `,

    padding: "20px",
    gap: "20px",
  },

  sidebarWrapper: {
    borderRadius: "16px",
    overflow: "hidden",
  },

  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },

  innerContent: {
    background: "linear-gradient(180deg, #020617, #020617)",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },
};
