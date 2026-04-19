import { useState, useEffect, useCallback, useRef } from "react";
import { Navbar } from "../../dashboard/components/Navbar";
import { Sidebar } from "../../dashboard/components/Sidebar";
import { bankPageStyles } from "../styles/banks.styles";
import { useBanks } from "../hooks/useBanks";
import { validateDecimalInput } from "../../shared/utils/numberInput.util";

export const BanksPage = () => {
  const [search, setSearch] = useState("");
  const { banks, loading } = useBanks();

  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [savedValues, setSavedValues] = useState<Record<string, number>>({});
  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // 🔥 AUTOSAVE (SOLO UI)
  const handleAutoSave = useCallback(() => {
    const converted: Record<string, number> = {};

    Object.keys(editedValues).forEach((key) => {
      const raw = editedValues[key];
      converted[key] = raw === "" ? 0 : Number(raw);
    });

    setSavedValues((prev) => ({
      ...prev,
      ...converted,
    }));

    setEditedValues({});
    setHasChanges(false);

    console.log("✅ Auto guardado UI");
  }, [editedValues]);

  useEffect(() => {
    if (!hasChanges) return;

    const timer = setTimeout(() => {
      handleAutoSave();
    }, 15000);

    return () => clearTimeout(timer);
  }, [editedValues, hasChanges, handleAutoSave]);

  // ✏️ EDITAR
  const handleEditRow = (accNumber: string) => {
    setEditingRows((prev) => ({
      ...prev,
      [accNumber]: true,
    }));

    // focus + select
    setTimeout(() => {
      const input = inputRefs.current[accNumber];
      if (input) {
        input.focus();
        input.select();
      }
    }, 0);
  };

  // 💾 GUARDAR (solo UI)
  const handleSaveRow = (accNumber: string) => {
    const rawValue =
      editedValues[accNumber] ?? savedValues[accNumber]?.toString() ?? "0";

    const numericValue = rawValue === "" ? 0 : Number(rawValue);

    setSavedValues((prev) => ({
      ...prev,
      [accNumber]: numericValue,
    }));

    setEditingRows((prev) => ({
      ...prev,
      [accNumber]: false,
    }));

    setEditedValues((prev) => {
      const copy = { ...prev };
      delete copy[accNumber];
      return copy;
    });

    setHasChanges(false);
  };

  // 💰 TOTAL DINÁMICO
  const total = banks
    .flatMap((b) => b.accounts)
    .reduce((acc, item) => {
      const value =
        Number(editedValues[item.number]) || savedValues[item.number] || 0;

      return acc + value;
    }, 0);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={bankPageStyles.layout}>
      <Sidebar />

      <div style={bankPageStyles.main}>
        <Navbar />

        <div style={bankPageStyles.header}>
          <h1 style={bankPageStyles.title}>🏦 Cuentas Bancarias</h1>

          <div style={bankPageStyles.total}>
            💰 Saldo Total: Q {total.toFixed(2)}
          </div>

          {hasChanges && (
            <div style={{ color: "#facc15", fontWeight: "bold" }}>
              ⚠️ Cambios sin guardar...
            </div>
          )}

          <input
            placeholder="🔍 Buscar cuenta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={bankPageStyles.search}
          />
        </div>

        <div style={bankPageStyles.tableContainer}>
          <table style={bankPageStyles.table}>
            <thead>
              <tr>
                <th style={bankPageStyles.th}>Cuenta</th>
                <th style={bankPageStyles.th}>Número</th>
                <th style={bankPageStyles.th}>Inicial</th>
                <th style={bankPageStyles.th}>Final</th>
                <th style={bankPageStyles.th}>Acciones</th>
              </tr>
            </thead>

            {banks.map((bank, index) => (
              <tbody key={index}>
                <tr style={bankPageStyles.bankHeader}>
                  <td colSpan={5}>🏦 {bank.bank}</td>
                </tr>

                {bank.accounts
                  .filter((acc) =>
                    acc.number.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((acc, i) => {
                    const isEditing = editingRows[acc.number];

                    const displayValue = isEditing
                      ? (editedValues[acc.number] ??
                        (savedValues[acc.number] ?? 0).toString())
                      : (savedValues[acc.number] ?? 0).toString();

                    return (
                      <tr key={i}>
                        <td>{acc.name}</td>
                        <td>{acc.number}</td>
                        <td>Q {acc.inicial.toFixed(2)}</td>

                        <td>
                          <input
                            ref={(el) => {
                              inputRefs.current[acc.number] = el;
                            }}
                            type="text"
                            value={displayValue}
                            disabled={!isEditing}
                            onChange={(e) => {
                              const rawValue = e.target.value;

                              const validValue = validateDecimalInput(
                                rawValue,
                                editedValues[acc.number] ?? "",
                              );

                              setEditedValues((prev) => ({
                                ...prev,
                                [acc.number]: validValue,
                              }));

                              setHasChanges(true);
                            }}
                            onKeyDown={(e) => {
                              if (["e", "E", "+", "-"].includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            onPaste={(e) => {
                              const paste = e.clipboardData.getData("text");
                              if (!/^\d*\.?\d{0,2}$/.test(paste)) {
                                e.preventDefault();
                              }
                            }}
                            style={{
                              ...bankPageStyles.inputBalance,
                              border: isEditing
                                ? "1px solid #22c55e"
                                : "1px solid #334155",
                            }}
                          />
                        </td>

                        <td>
                          {isEditing ? (
                            <button
                              onClick={() => handleSaveRow(acc.number)}
                              style={bankPageStyles.btnSave}
                            >
                              💾 Guardar
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditRow(acc.number)}
                              style={bankPageStyles.btnEdit}
                            >
                              ✏️ Editar
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
