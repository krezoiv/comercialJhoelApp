import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Navbar } from "../../dashboard/components/Navbar";
import { Sidebar } from "../../dashboard/components/Sidebar";
import { bankPageStyles } from "../styles/banks.styles";
import { useBanks } from "../hooks/useBanks";
import type { BankGroup } from "../interfaces/bank.interface";
import { bankService } from "../services/bank.service";

type Account = BankGroup["accounts"][number];

export const BanksPage = () => {
  const [search, setSearch] = useState("");
  const { banks, loading } = useBanks();

  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [savedValues, setSavedValues] = useState<Record<string, number>>({});
  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // 🔥 VALIDADOR
  const validateDecimalInput = (value: string) => {
    if (value === "") return "";
    if (!/^\d*\.?\d*$/.test(value)) return null;

    const parts = value.split(".");
    if (parts.length > 2) return null;
    if (parts[1] && parts[1].length > 2) return null;

    return value;
  };

  // 🔥 TOTAL
  const total = useMemo(() => {
    return banks
      .flatMap((b) => b.accounts)
      .reduce((acc, item: Account) => {
        const edited = editedValues[item.number];
        const saved = savedValues[item.number];

        const val =
          saved !== undefined
            ? saved
            : edited !== undefined
              ? Number(edited)
              : 0;

        return acc + val;
      }, 0);
  }, [banks, editedValues, savedValues]);

  // ✏️ EDITAR
  const handleEdit = (acc: Account) => {
    setEditingRows((prev) => ({
      ...prev,
      [acc.number]: true,
    }));

    setTimeout(() => {
      const input = inputRefs.current[acc.number];
      if (input) input.select();
    }, 0);
  };

  // 💾 GUARDAR
  const handleSaveRow = (acc: Account) => {
    const raw = editedValues[acc.number];
    const value = raw === "" || raw === undefined ? 0 : Number(raw);

    setSavedValues((prev) => ({
      ...prev,
      [acc.number]: value,
    }));

    setEditingRows((prev) => ({
      ...prev,
      [acc.number]: false,
    }));

    setEditedValues((prev) => {
      const updated = { ...prev };
      delete updated[acc.number];
      return updated;
    });

    setHasChanges(false);
  };

  // 🔥 AUTOSAVE
  const handleAutoSave = useCallback(() => {
    if (Object.keys(editedValues).length === 0) return;

    const converted: Record<string, number> = {};

    Object.keys(editedValues).forEach((key) => {
      const raw = editedValues[key];
      converted[key] = raw === "" ? 0 : Number(raw);
    });

    setSavedValues((prev) => ({
      ...prev,
      ...converted,
    }));

    setEditingRows((prev) => {
      const updated = { ...prev };
      Object.keys(editedValues).forEach((key) => {
        updated[key] = false;
      });
      return updated;
    });

    setEditedValues({});
    setHasChanges(false);

    setAutoSaved(true);
    setTimeout(() => setAutoSaved(false), 2000);
  }, [editedValues]);

  useEffect(() => {
    if (!hasChanges) return;

    const timer = setTimeout(() => {
      handleAutoSave();
    }, 15000);

    return () => clearTimeout(timer);
  }, [editedValues, hasChanges, handleAutoSave]);

  if (loading) return <div>Loading...</div>;

  const handleSaveAll = async () => {
    try {
      // 🔥 recorrer TODOS los bancos y cuentas
      const payload = banks.flatMap((bank) =>
        bank.accounts.map((acc) => {
          const rawValue =
            editedValues[acc.number] ??
            savedValues[acc.number] ??
            acc.final ??
            0;

          return {
            accountNumber: acc.number,
            finalBalance: rawValue === "" ? 0 : Number(rawValue),
          };
        }),
      );

      console.log("📦 Payload FINAL:", payload);

      await bankService.updateFinalBalances(payload);

      console.log("✅ Guardado en BD");

      // 🔥 limpiar cambios
      setEditedValues({});
      setHasChanges(false);
    } catch (error) {
      console.error("❌ Error guardando:", error);
    }
  };

  return (
    <div style={bankPageStyles.layout}>
      <Sidebar />

      <div style={bankPageStyles.main}>
        <Navbar />

        <div style={bankPageStyles.header}>
          <h1 style={bankPageStyles.title}>🏦 Cuentas Bancarias</h1>

          <div style={bankPageStyles.total}>
            💰 Saldo Total: Q{" "}
            {total.toLocaleString("es-GT", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>

          {hasChanges && (
            <div style={{ color: "#facc15", fontWeight: "bold" }}>
              ⚠️ Cambios sin guardar...
            </div>
          )}

          {autoSaved && (
            <div style={{ color: "#22c55e", fontWeight: "bold" }}>
              ✅ Guardado automático
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
                    const isEditing = editingRows[acc.number] || false;

                    const displayValue =
                      editedValues[acc.number] ??
                      savedValues[acc.number]?.toString() ??
                      "0";

                    return (
                      <tr key={i}>
                        <td style={{ textAlign: "left", padding: "10px" }}>
                          <strong>{acc.name}</strong>
                          <br />
                          <span style={{ fontSize: 12, color: "#94a3b8" }}>
                            {acc.accountTypeName}
                          </span>
                        </td>

                        <td style={bankPageStyles.td}>
                          {acc.bankAccountNumber}
                        </td>

                        <td style={bankPageStyles.td}>
                          Q {acc.inicial.toFixed(2)}
                        </td>

                        <td style={bankPageStyles.td}>
                          <input
                            ref={(el) => {
                              inputRefs.current[acc.number] = el;
                            }}
                            type="text"
                            value={displayValue}
                            disabled={!isEditing}
                            style={{
                              padding: "6px",
                              borderRadius: "6px",
                              border: isEditing
                                ? "2px solid #22c55e"
                                : "1px solid #334155",
                              background: isEditing ? "#020617" : "#02061788",
                              color: "white",
                              width: "100px",
                              textAlign: "center",
                            }}
                            onChange={(e) => {
                              const raw = e.target.value;
                              const valid = validateDecimalInput(raw);
                              if (valid === null) return;

                              setEditedValues((prev) => ({
                                ...prev,
                                [acc.number]: valid,
                              }));

                              setHasChanges(true);
                            }}
                          />
                        </td>

                        <td style={bankPageStyles.td}>
                          {isEditing ? (
                            <button
                              style={{
                                ...bankPageStyles.button,
                                background: "#22c55e",
                              }}
                              onClick={() => handleSaveRow(acc)}
                            >
                              💾 Guardar
                            </button>
                          ) : (
                            <button
                              style={bankPageStyles.editButton}
                              onClick={() => handleEdit(acc)}
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

        {/* 🔥 BOTÓN FLOTANTE CENTRADO */}
        <button
          style={bankPageStyles.floatingButton}
          onClick={handleSaveAll}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
          }}
        >
          💾 Guardar saldos
        </button>
      </div>
    </div>
  );
};
