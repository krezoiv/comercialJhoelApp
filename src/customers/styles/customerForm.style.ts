export const customerFormStyles = {
  form: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap" as const,

    background: "rgba(2,6,23,0.65)",
    backdropFilter: "blur(14px)",

    padding: "20px",
    borderRadius: "18px",

    border: "1px solid rgba(255,255,255,0.06)",

    boxShadow: `
      0 10px 40px rgba(0,0,0,0.6),
      inset 0 1px 0 rgba(255,255,255,0.03)
    `,
  },

  buttonLoading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    opacity: 0.8,
  },

  button: {
    background: "#22c55e",
    color: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  buttonHover: {
    background: "#16a34a",
  },

  input: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(15,23,42,0.6)",
    color: "white",
    outline: "none",
    fontSize: "14px",
    transition: "all 0.25s ease",
    minWidth: "160px",
  },

  inputFocus: {
    border: "1px solid #22c55e",
    boxShadow: "0 0 0 2px rgba(34,197,94,0.25)",
  },

  inputWrapper: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
  },

  inputIcon: {
    position: "absolute" as const,
    left: "12px",
    fontSize: "14px",
    opacity: 0.6,
  },

  inputWithIcon: {
    paddingLeft: "34px",
  },

  spinner: {
    width: "18px",
    height: "18px",
    border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    display: "inline-block",
  },
};
