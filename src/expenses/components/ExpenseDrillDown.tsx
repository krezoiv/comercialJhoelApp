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
        width: "100%",

        maxWidth: "1400px",

        margin: "0 auto",

        background: `
          linear-gradient(
            180deg,
            rgba(15,23,42,.96),
            rgba(2,6,23,.98)
          )
        `,

        border: "1px solid rgba(255,255,255,.05)",

        borderRadius: "28px",

        padding: "30px",

        boxShadow: `
          0 30px 60px rgba(0,0,0,.45),
          inset 0 1px 0 rgba(255,255,255,.03)
        `,

        backdropFilter: "blur(18px)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: "flex-start",

          marginBottom: "22px",
        }}
      >
        <h2
          style={{
            color: "white",

            fontSize: "24px",

            fontWeight: 800,

            margin: 0,
          }}
        >
          Movimientos
        </h2>

        <div
          style={{
            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            gap: "10px",
          }}
        >
          <div
            style={{
              background: "rgba(34,197,94,.12)",

              color: "#22c55e",

              padding: "8px 14px",

              borderRadius: "999px",

              fontSize: "13px",

              fontWeight: 700,

              border: "1px solid rgba(34,197,94,.18)",
            }}
          >
            {data.length} registros
          </div>

          <div
            onDoubleClick={handleSelectAll}
            style={{
              display: "flex",

              alignItems: "center",

              gap: "10px",

              cursor: "pointer",

              userSelect: "none",
            }}
          >
            <input
              type="checkbox"
              checked={selectAll}
              readOnly
              style={{
                width: "22px",

                height: "22px",

                cursor: "pointer",
              }}
            />

            <span
              style={{
                color: "white",

                fontWeight: 700,

                fontSize: "16px",
              }}
            >
              {selectAll ? "Deseleccionar todos" : "Seleccionar todos"}
            </span>
          </div>

          {selectAll && (
            <span
              style={{
                color: "#00e676",

                fontWeight: 700,

                fontSize: "14px",
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
