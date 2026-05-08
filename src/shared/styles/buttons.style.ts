import type { CSSProperties } from "react";
import { theme } from "./theme.style";

export const buttonStyles: Record<string, CSSProperties> = {
  base: {
    border: "none",

    borderRadius: theme.radius.md,

    padding: "12px 18px",

    color: "white",

    cursor: "pointer",

    fontWeight: 700,

    transition: theme.transitions.default,

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    gap: "8px",
  },

  primary: {
    background: `linear-gradient(135deg, ${theme.colors.primary}, #2563eb)`,

    boxShadow: theme.shadows.primaryGlow,
  },

  success: {
    background: `linear-gradient(135deg, ${theme.colors.success}, #16a34a)`,

    boxShadow: theme.shadows.successGlow,
  },

  danger: {
    background: `linear-gradient(135deg, ${theme.colors.danger}, #dc2626)`,

    boxShadow: theme.shadows.dangerGlow,
  },

  hover: {
    transform: "translateY(-2px) scale(1.02)",
  },

  disabled: {
    opacity: 0.5,

    cursor: "not-allowed",

    boxShadow: "none",
  },
};
