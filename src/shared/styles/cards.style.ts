import type { CSSProperties } from "react";
import { theme } from "./theme.style";

export const cardStyles: Record<string, CSSProperties> = {
  base: {
    background: theme.colors.card,

    backdropFilter: "blur(18px)",

    border: `1px solid ${theme.colors.border}`,

    borderRadius: theme.radius.xl,

    padding: "20px",

    boxShadow: theme.shadows.card,

    transition: theme.transitions.default,
  },

  hover: {
    transform: "translateY(-2px)",

    boxShadow: `
      0 25px 70px rgba(0,0,0,.65),
      inset 0 1px 0 rgba(255,255,255,.03)
    `,
  },
};
