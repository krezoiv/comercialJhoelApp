export const expenseFormStyles = {
  /* 🔥 CONTENEDOR */
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

  /* ✨ INPUT BASE */
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

  /* 💎 INPUT FOCUS (manual) */
  inputFocus: {
    border: "1px solid #22c55e",
    boxShadow: "0 0 0 2px rgba(34,197,94,0.25)",
  },

  /* 💰 INPUT CON ICONO */
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

  /* 💚 BOTÓN */
  button: {
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",

    color: "white",
    fontWeight: "600",

    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    gap: "8px",

    transition: "all 0.25s ease",

    boxShadow: "0 6px 20px rgba(34,197,94,0.35)",
  },

  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(34,197,94,0.5)",
  },

  /* 🔽 DROPDOWN */
  dropdown: {
    position: "absolute" as const,
    top: "110%",
    left: 0,
    right: 0,

    background: "rgba(2,6,23,0.95)",
    backdropFilter: "blur(10px)",

    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",

    zIndex: 1000,

    maxHeight: "220px",
    overflowY: "auto" as const,

    boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
  },

  dropdownItem: {
    padding: "12px",
    cursor: "pointer",
    color: "#e2e8f0",

    transition: "all 0.2s ease",
  },

  dropdownItemHover: {
    background: "rgba(34,197,94,0.15)",
    color: "white",
  },

  /* 🎯 SELECT PRO */
  select: {
    padding: "12px 16px",
    borderRadius: "12px",

    border: "1px solid rgba(255,255,255,0.08)",

    background: "rgba(15,23,42,0.6)",
    color: "white",

    minWidth: "180px",

    appearance: "none" as const,

    backgroundImage:
      "linear-gradient(45deg, transparent 50%, #22c55e 50%), linear-gradient(135deg, #22c55e 50%, transparent 50%)",
    backgroundPosition:
      "calc(100% - 18px) calc(50% - 3px), calc(100% - 12px) calc(50% - 3px)",
    backgroundSize: "5px 5px",
    backgroundRepeat: "no-repeat",

    paddingRight: "36px",
  },
};
