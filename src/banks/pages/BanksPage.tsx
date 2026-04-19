import { useState, useEffect, useCallback } from "react";
import { Navbar } from "../../dashboard/components/Navbar";
import { Sidebar } from "../../dashboard/components/Sidebar";
import { bankPageStyles } from "../styles/banks.styles";
import { useBanks } from "../hooks/useBanks";

export const BanksPage = () => {
  const [search, setSearch] = useState("");
  const { banks, loading } = useBanks();

  const [editedValues, setEditedValues] = useState<Record<string, number>>({});
  const [savedValues, setSavedValues] = useState<Record<string, number>>({});
  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // 🔥 AUTOSAVE SOLO UI
  const handleAutoSave = useCallback(() => {
    setSavedValues((prev) => ({
      ...prev,
      ...editedValues,
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
  };

  // 💾 GUARDAR (SOLO UI)
  const handleSaveRow = (accNumber: string) => {
    const value = editedValues[accNumber];

    if (value !== undefined) {
      setSavedValues((prev) => ({
        ...prev,
        [accNumber]: value,
      }));
    }

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

  // 💰 TOTAL
  const total = banks
    .flatMap((b) => b.accounts)
    .reduce((acc, item) => {
      const value =
        editedValues[item.number] ??
        savedValues[item.number] ??
        item.final ??
        0;

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

                {bank.accounts.map((acc, i) => (
                  <tr key={i}>
                    <td>{acc.name}</td>
                    <td>{acc.number}</td>
                    <td>Q {acc.inicial.toFixed(2)}</td>

                    <td>
                      <input
                        type="number"
                        value={
                          editedValues[acc.number] ??
                          savedValues[acc.number] ??
                          acc.final ??
                          0
                        }
                        disabled={!editingRows[acc.number]}
                        onChange={(e) => {
                          const value = Number(e.target.value);

                          setEditedValues((prev) => ({
                            ...prev,
                            [acc.number]: value,
                          }));

                          setHasChanges(true);
                        }}
                        style={{
                          ...bankPageStyles.inputBalance,
                          border: editingRows[acc.number]
                            ? "1px solid #22c55e"
                            : "1px solid #334155",
                        }}
                      />
                    </td>

                    <td>
                      {editingRows[acc.number] ? (
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
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
