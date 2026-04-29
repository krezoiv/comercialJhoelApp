import type { CSSProperties } from "react";

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

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <p>{message}</p>

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button style={styles.confirmBtn} onClick={onConfirm}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  modal: {
    background: "#0f172a",
    padding: "24px",
    borderRadius: "12px",
    minWidth: "320px",
    color: "white",
    textAlign: "center",
  },

  actions: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },

  cancelBtn: {
    background: "#64748b",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "white",
  },

  confirmBtn: {
    background: "#22c55e",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "white",
  },
};
