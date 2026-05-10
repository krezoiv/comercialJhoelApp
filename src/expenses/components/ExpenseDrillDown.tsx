import { useState } from "react";

import { useExpenseDetail } from "../hooks/useExpenseDetail";

import { ExpenseDetailCard } from "./ExpenseDetailCard";

import { expenseService } from "../services/expense.service";

import { ConfirmModal } from "../../shared/utils/ConfirmModal";

interface Props {
  customerId: string;
  onRefresh: () => void;
}

interface ExpenseChange {
  id: string;
  amount: number;
  createdAt: string;
  checked: boolean;
}

export const ExpenseDrillDown = ({ customerId, onRefresh }: Props) => {
  const { data, loading, refetch } = useExpenseDetail(customerId, true);
  const [changes, setChanges] = useState<ExpenseChange[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (change: ExpenseChange) => {
    setChanges((prev) => {
      const exists = prev.find((x) => x.id === change.id);

      if (exists) {
        return prev.map((x) => (x.id === change.id ? change : x));
      }

      return [...prev, change];
    });
  };

  const handleSelectAll = () => {
    const newValue = !selectAll;

    setSelectAll(newValue);

    const allChanges = data.map((item) => ({
      id: item.id,

      amount: Number(item.amount),

      createdAt: new Date(item.createdAt).toISOString(),

      checked: newValue,
    }));

    setChanges(allChanges);
  };

  const handleSaveAll = () => {
    if (!changes.length) {
      return;
    }

    setShowConfirm(true);
  };

  const confirmSave = async () => {
    try {
      await expenseService.processExpenses({
        data: changes,
      });

      setChanges([]);

      setSelectAll(false);

      refetch();

      onRefresh();

      setShowConfirm(false);

      setShowSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "30px",

          color: "white",
        }}
      >
        Cargando movimientos...
      </div>
    );
  }

  return (
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

          {selectAll && (
            <span
              style={{
                fontSize: "10px",
                color: "#22c55e",
                fontWeight: 700,
              }}
            >
              {data.length} seleccionados
            </span>
          )}
        </div>
      </div>

      {/* BODY */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          maxHeight: "720px",
          overflowY: "auto",
          paddingRight: "6px",
        }}
      >
        {data.map((item) => (
          <ExpenseDetailCard
            key={item.id}
            item={item}
            onSaved={refetch}
            onChange={handleChange}
            globalChecked={selectAll}
          />
        ))}
      </div>

      {/* FOOTER */}
      <div
        style={{
          marginTop: "24px",

          display: "flex",

          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={handleSaveAll}
          disabled={!changes.length}
          style={{
            padding: "16px 28px",
            borderRadius: "16px",
            border: "none",
            background: !changes.length
              ? "#334155"
              : "linear-gradient(135deg,#00c853,#00e676)",
            color: "white",
            fontWeight: 800,
            fontSize: "15px",
            cursor: !changes.length ? "not-allowed" : "pointer",
            boxShadow: !changes.length
              ? "none"
              : "0 10px 30px rgba(0,200,83,.35)",
            transition: "all .25s ease",
          }}
        >
          💾 Guardar cambios
        </button>
      </div>

      {/* MODAL CONFIRM */}
      <ConfirmModal
        isOpen={showConfirm}
        message="¿Deseas guardar los cambios seleccionados?"
        onConfirm={confirmSave}
        onCancel={() => setShowConfirm(false)}
      />

      {/* MODAL SUCCESS */}
      <ConfirmModal
        isOpen={showSuccess}
        message="Cambios guardados correctamente"
        onConfirm={() => setShowSuccess(false)}
        onCancel={() => setShowSuccess(false)}
      />
    </div>
  );
};
