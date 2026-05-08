import type { CSSProperties } from "react";
import { theme } from "./theme.style";

export const inputStyles: Record<string, CSSProperties> = {
  base: {
    padding: "14px 16px",

    borderRadius: theme.radius.md,

    border: `1px solid ${theme.colors.border}`,

    background: theme.colors.cardLight,

    color: "white",

    outline: "none",

    fontSize: "14px",

    transition: theme.transitions.default,

    minWidth: "180px",
  },

  focus: {
    border: `1px solid ${theme.colors.primary}`,

    boxShadow: theme.shadows.primaryGlow,

    transform: "scale(1.01)",
  },

  disabled: {
    opacity: 0.6,

    cursor: "not-allowed",
  },
};
