import { useEffect, useState, useCallback, useRef } from "react";
import { bankAgentService } from "../services/bank-agent.service";
import { ConfirmModal } from "../../shared/utils/ConfirmModal";
import type { DetailItem } from "../interfaces/detail-item.interface";
import { formatMoney } from "../../shared/utils/money.util";
import { validateDecimalInput } from "../../shared/utils/numberInput.util";

interface Props {
  customerId: string;

  onRefresh: () => void;
}

export const AgentDrillDown = ({ customerId, onRefresh }: Props) => {
  const [data, setData] = useState<DetailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState<DetailItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAmountChange = (id: string, value: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              amount: value,
            }
          : item,
      ),
    );
  };

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await bankAgentService.getBankAgentsByCustomerId(customerId);

      setData(res || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCheck = (item: DetailItem, checked: boolean) => {
    setData((prev) =>
      prev.map((x) => (x.id === item.id ? { ...x, checked } : x)),
    );

    setChanges((prev) => {
      const exists = prev.find((x) => x.id === item.id);

      const updated = {
        ...item,
        checked,
      };

      if (exists) {
        return prev.map((x) => (x.id === item.id ? updated : x));
      }

      return [...prev, updated];
    });
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);

      await bankAgentService.processBankAgents(data);

      onRefresh();

      setEditingId(null);

      console.log("✅ Cambios guardados");
    } catch (error) {
      console.error("❌ Error guardando:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    const newValue = !selectAll;

    setSelectAll(newValue);

    const updated = data.map((item) => ({
      ...item,
      checked: newValue,
    }));

    setData(updated);

    setChanges(updated);
  };

  const handleSave = async () => {
    try {
      await bankAgentService.processBankAgents(changes);

      setShowConfirm(false);

      setChanges([]);

      fetchData();

      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p style={{ color: "white" }}>Cargando...</p>;
  }

  return (
    <>
      <div
        style={{
          background: `
    linear-gradient(
      145deg,
      rgba(3, 25, 80, 0.1),
      rgba(7, 21, 64, 0.98)
    )
  `,
          border: "1px solid rgba(255,255,255,.04)",
          borderRadius: "18px",
          padding: "14px",
          width: "100%",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
          0 10px 35px rgba(0,0,0,.35),
          inset 0 1px 0 rgba(255,255,255,.03)
        `,
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Movimientos
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "10px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                background: "rgba(34,197,94,.12)",
                color: "#22c55e",
                padding: "10px 18px",
                borderRadius: "999px",
                fontWeight: 700,
                border: "1px solid rgba(34,197,94,.18)",
              }}
            >
              {data.length} Registros
            </div>

            <label
              onDoubleClick={handleSelectAll}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                color: "white",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              <input
                type="checkbox"
                checked={selectAll}
                readOnly
                style={{
                  width: "18px",
                  height: "18px",
                  accentColor: "#22c55e",
                }}
              />

              {selectAll ? "Marcar todos" : "Marcar todos"}
            </label>

            <span
              style={{
                fontSize: "10px",
                color: "#22c55e",
                fontWeight: 700,
              }}
            >
              {data.filter((x) => x.checked).length} seleccionados
            </span>
          </div>
        </div>

        {/* LIST */}
        <div
          style={{
            fontSize: "15px",
            maxHeight: "700px",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          {data.map((item) => (
            <div
              key={item.id}
              style={{
                background: "rgba(2,6,23,.96)",
                borderRadius: "24px",
                padding: "24px",
                marginBottom: "6px",
                border: item.checked
                  ? "1px solid rgba(239,68,68,.35)"
                  : "1px solid rgba(255,255,255,.04)",
                boxShadow: `
                  0 20px 40px rgba(0,0,0,.35),
                  inset 0 1px 0 rgba(255,255,255,.02)
                `,
              }}
            >
              {/* TOP */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      color: "white",
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    {item.customerName}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",

                      fontSize: "18px",
                      fontWeight: 700,

                      color: "#38bdf8",
                    }}
                  >
                    <span>🏦</span>
                    <span>{item.bankName}</span>
                  </div>

                  <div
                    style={{
                      color: "rgba(255,255,255,.82)",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    💳 {item.description}
                  </div>

                  <p
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      width: "fit-content",
                      padding: "6px 10px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.05)",
                      color: "#94a3b8",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    📅 {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                <div
                  onDoubleClick={() => handleCheck(item, !item.checked)}
                  style={{
                    width: "18px",
                    height: "18px",

                    borderRadius: "50%",

                    background: item.checked ? "#ef4444" : "#475569",

                    cursor: "pointer",

                    transition: "all .2s ease",
                  }}
                />
              </div>

              {/* INPUT */}
              <div
                style={{
                  marginTop: "18px",
                }}
              >
                <input
                  ref={editingId === item.id ? inputRef : null}
                  value={
                    editingId === item.id
                      ? item.amount
                      : formatMoney(Number(item.amount))
                  }
                  disabled={editingId !== item.id}
                  onChange={(e) => {
                    const value = e.target.value;

                    const validated = validateDecimalInput(value);

                    if (validated !== null) {
                      handleAmountChange(item.id, validated);
                    }
                  }}
                  style={{
                    width: "100%",

                    height: "48px",

                    borderRadius: "14px",

                    border: "1px solid rgba(255,255,255,.04)",

                    background: "rgba(15,23,42,.88)",

                    color: "white",

                    fontSize: "22px",

                    fontWeight: 800,

                    padding: "0 16px",

                    outline: "none",

                    boxShadow: "inset 0 1px 4px rgba(0,0,0,.25)",
                  }}
                />
              </div>

              {/* FOOTER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() =>
                    setEditingId(editingId === item.id ? null : item.id)
                  }
                  style={{
                    background:
                      editingId === item.id
                        ? "linear-gradient(135deg,#22c55e,#16a34a)"
                        : "linear-gradient(135deg,#2563eb,#1d4ed8)",

                    border: "none",

                    color: "white",

                    padding: "10px 16px",

                    borderRadius: "12px",

                    fontWeight: 700,

                    fontSize: "13px",

                    cursor: "pointer",

                    boxShadow:
                      editingId === item.id
                        ? "0 8px 20px rgba(34,197,94,.35)"
                        : "0 8px 20px rgba(37,99,235,.35)",
                  }}
                >
                  {editingId === item.id ? "✅ Guardar" : "✏️ Editar"}
                </button>

                <div
                  style={{
                    display: "flex",
                    fontSize: "15px",
                    alignItems: "center",
                    gap: "8px",
                    color: "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  <span style={{ fontSize: "14px" }}>🗑</span>
                  <span>Eliminar</span>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                    onDoubleClick={() => handleCheck(item, !item.checked)}
                    style={{
                      width: "18px",
                      height: "18px",
                      accentColor: "#ef4444",
                    }}
                  />
                </div>
              </div>

              <p
                style={{
                  color: "#64748b",
                  fontSize: "10px",
                  marginTop: "16px",
                }}
              >
                creado por: {item.userName}
              </p>
            </div>
          ))}
        </div>

        {/* SAVE */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",

            marginTop: "20px",
          }}
        >
          <button
            onClick={handleSaveChanges}
            style={{
              background: "linear-gradient(135deg,#2563eb,#1d4ed8)",

              border: "none",

              color: "white",

              padding: "10px 16px",

              borderRadius: "12px",

              fontWeight: 700,

              fontSize: "13px",

              cursor: "pointer",

              boxShadow: "0 8px 20px rgba(37,99,235,.35)",
            }}
          >
            💾 Guardar cambios
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        message="¿Deseas guardar los cambios seleccionados?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleSave}
      />
    </>
  );
};
