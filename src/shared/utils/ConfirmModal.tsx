import type { CSSProperties } from "react";

import { createPortal } from "react-dom";

interface Props {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.icon}>💾</div>

        <p style={styles.message}>{message}</p>

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>

          <button style={styles.confirmBtn} onClick={onConfirm}>
            Guardar
          </button>
        </div>
      </div>
    </div>,

    document.body,
  );
};

const styles: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",

    top: 0,

    left: 0,

    width: "100vw",

    height: "100vh",

    background: "rgba(2,6,23,.72)",

    backdropFilter: "blur(12px)",

    WebkitBackdropFilter: "blur(12px)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    zIndex: 999999999,
  },

  modal: {
    width: "430px",

    maxWidth: "92vw",

    background: `
      linear-gradient(
        180deg,
        rgba(15,23,42,.98),
        rgba(2,6,23,.98)
      )
    `,

    border: "1px solid rgba(255,255,255,.06)",

    borderRadius: "26px",

    padding: "38px 32px",

    textAlign: "center",

    boxShadow: `
      0 40px 120px rgba(0,0,0,.75),
      inset 0 1px 0 rgba(255,255,255,.04)
    `,
  },

  icon: {
    fontSize: "48px",

    marginBottom: "20px",
  },

  message: {
    color: "white",

    fontSize: "22px",

    fontWeight: 700,

    lineHeight: 1.4,

    margin: 0,
  },

  actions: {
    marginTop: "32px",

    display: "flex",

    justifyContent: "center",

    gap: "16px",
  },

  cancelBtn: {
    background: "rgba(148,163,184,.15)",

    border: "1px solid rgba(255,255,255,.06)",

    padding: "14px 24px",

    borderRadius: "14px",

    cursor: "pointer",

    color: "white",

    fontWeight: 700,

    fontSize: "15px",
  },

  confirmBtn: {
    background: "linear-gradient(135deg,#00c853,#00e676)",

    border: "none",

    padding: "14px 28px",

    borderRadius: "14px",

    cursor: "pointer",

    color: "white",

    fontWeight: 800,

    fontSize: "15px",

    boxShadow: "0 12px 30px rgba(0,200,83,.35)",
  },
};
