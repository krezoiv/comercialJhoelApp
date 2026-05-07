import { useEffect, useState } from "react";
import type { BankAgent } from "../interfaces/bank-agent.interface";

interface Props {
  data: BankAgent[];
  onView: (customerId: string) => void;
}

export const BankAgentsTable = ({ data, onView }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ ...styles.container, ...(mounted ? styles.fadeIn : {}) }}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Cliente</th>
            <th style={styles.th}>Transacciones</th>
            <th style={styles.th}>Monto total</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} style={styles.empty}>
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            data.map((c, index) => {
              const isHover = hoveredRow === c.customerId;

              return (
                <tr
                  key={c.customerId}
                  onMouseEnter={() => setHoveredRow(c.customerId)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    ...styles.row,
                    ...(mounted ? styles.rowEnter : {}),
                    ...(isHover ? styles.rowHover : {}),
                    transitionDelay: `${index * 40}ms`, // ✨ stagger
                  }}
                >
                  <td style={styles.td}>
                    <div style={styles.user}>
                      <div style={styles.avatar}>{c.firstName.charAt(0)}</div>
                      <div>
                        <div style={styles.name}>
                          {c.firstName} {c.lastName}
                        </div>
                        <div style={styles.sub}>
                          ID: {c.customerId.slice(0, 8)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={styles.tdCenter}>{c.totalBankAgent}</td>

                  <td style={styles.tdAmount}>
                    Q {Number(c.totalAmount).toFixed(2)}
                  </td>

                  <td style={styles.tdCenter}>
                    <div style={styles.actions}>
                      <AnimatedButton
                        label="👁 Ver"
                        styleType="view"
                        onClick={() => onView(c.customerId)}
                      />
                      <AnimatedButton label="✏️ Editar" styleType="edit" />
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
type BtnProps = {
  label: string;
  onClick?: () => void;
  styleType: "view" | "edit";
};

const AnimatedButton = ({ label, onClick, styleType }: BtnProps) => {
  const [hover, setHover] = useState(false);
  const base = styles.button;
  const variant = styleType === "view" ? styles.viewBtn : styles.editBtn;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...base,
        ...variant,
        ...(hover ? styles.buttonHoverApple : {}),
      }}
    >
      {label}
    </button>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    marginTop: "20px",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    borderRadius: "18px",
    padding: "18px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
    opacity: 0,
    transform: "translateY(10px)",
    transition: "all 0.5s ease",
  },

  fadeIn: {
    opacity: 1,
    transform: "translateY(0)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    color: "white",
  },

  headerRow: {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(6px)",
  },

  th: {
    padding: "14px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#cbd5f5",
    letterSpacing: "0.3px",
  },

  row: {
    opacity: 0,
    transform: "translateY(6px)",
    transition: "all 0.35s ease",
  },

  rowEnter: {
    opacity: 1,
    transform: "translateY(0)",
  },

  rowHover: {
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(6px)",
    transform: "translateY(-2px) scale(1.005)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },

  tdCenter: {
    padding: "14px",
    textAlign: "center",
  },

  tdAmount: {
    padding: "14px",
    fontWeight: 600,
    color: "#22c55e",
  },

  user: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "14px",
  },

  name: {
    fontWeight: 500,
  },

  sub: {
    fontSize: "12px",
    color: "#94a3b8",
  },

  actions: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  },

  button: {
    padding: "6px 12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.18s ease",
    fontWeight: 500,
    backdropFilter: "blur(6px)",
  },

  // ✨ clave: sutil, no exagerado
  buttonHoverApple: {
    transform: "scale(1.06)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  },

  viewBtn: {
    background: "rgba(59,130,246,0.18)",
    border: "1px solid rgba(59,130,246,0.35)",
    color: "#60a5fa",
  },

  editBtn: {
    background: "rgba(234,179,8,0.18)",
    border: "1px solid rgba(234,179,8,0.35)",
    color: "#facc15",
  },

  empty: {
    textAlign: "center",
    padding: "22px",
    color: "#94a3b8",
  },
};
