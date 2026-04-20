import { useEffect, useMemo, useState, useCallback, useRef } from "react";
//import confetti from "canvas-confetti";
import { Navbar } from "../../dashboard/components/Navbar";
import { Sidebar } from "../../dashboard/components/Sidebar";
import { bankPageStyles } from "../styles/banks.styles";
import { useBanks } from "../hooks/useBanks";
import type { BankGroup } from "../interfaces/bank.interface";
import { bankService } from "../services/bank.service";

type Account = BankGroup["accounts"][number];

export const BanksPage = () => {
  const [search, setSearch] = useState("");
  //const { banks, loading } = useBanks();
  const { banks, loading, refetch } = useBanks();

  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [savedValues, setSavedValues] = useState<Record<string, number>>({});
  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

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
      setSaving(true);
      setSaved(false);

      const payload = Object.keys(editedValues).map((key) => ({
        accountNumber: key,
        finalBalance: editedValues[key] === "" ? 0 : Number(editedValues[key]),
      }));

      if (payload.length === 0) {
        setSaving(false);
        console.warn("⚠️ No hay cambios para guardar");
        return;
      }

      await bankService.updateFinalBalances(payload);

      // 🔥 REFRESH DATA (CLAVE)
      await bankService.updateFinalBalances(payload);

      // 🔥 REFRESH CORRECTO
      await refetch();

      setSaved(true);
      setShowToast(true);

      setEditedValues({});
      setHasChanges(false);

      setTimeout(() => setSaved(false), 2000);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("❌ Error guardando:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={bankPageStyles.layout}>
      <Sidebar />

      <div style={bankPageStyles.main}>
        <Navbar />
        <div style={bankPageStyles.header}>
          <h1 style={bankPageStyles.title}>🏦 Cuentas Bancarias</h1>

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

                    const isEdited = editedValues[acc.number] !== undefined;

                    const displayValue = isEdited
                      ? editedValues[acc.number]
                      : acc.final !== null && acc.final !== undefined
                        ? Number(acc.final).toLocaleString("es-GT", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "0.00";

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
                            style={{
                              padding: "6px",
                              borderRadius: "6px",
                              border:
                                editedValues[acc.number] !== undefined
                                  ? "2px solid #22c55e"
                                  : "1px solid #334155",
                              background:
                                editedValues[acc.number] !== undefined
                                  ? "#022c22"
                                  : "#020617",
                              color: "white",
                              width: "110px",
                              textAlign: "right",
                              outline: "none",
                              transition: "all 0.2s ease",
                            }}
                            onChange={(e) => {
                              let raw = e.target.value;

                              // 🔥 limpiar comas para poder editar bien
                              raw = raw.replace(/,/g, "");

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
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px) scale(1)";
          }}
          style={{
            ...bankPageStyles.floatingButton,

            // 🔥 estado scroll (modo glass)
            background: isScrolling
              ? "rgba(15,23,42,0.6)" // modo glass
              : saving
                ? "#f59e0b" // 🔶 NARANJA (guardando)
                : saved
                  ? "#f59e0b"
                  : "#22c55e", // verde normal
            transform: saving ? "scale(0.97)" : "scale(1)",
            cursor: saving ? "not-allowed" : "pointer",
            // 🔥 TEXTO dinámico
            color: isScrolling ? "#22c55e" : "white",

            // 🔥 BORDE dinámico
            border: isScrolling
              ? "1px solid rgba(34,197,94,0.6)"
              : "1px solid rgba(255,255,255,0.1)",

            // 🔥 SOMBRA
            boxShadow: isScrolling
              ? "0 4px 20px rgba(34,197,94,0.15)"
              : saving
                ? "0 6px 20px rgba(245,158,11,0.3)"
                : saved
                  ? "0 6px 20px rgba(22,163,74,0.3)"
                  : "0 6px 20px rgba(34,197,94,0.25)",

            // 🔥 OPACITY casi 100 pero suave
            opacity: isScrolling ? 0.85 : 1,

            // 🔥 EFECTO GLASS
            backdropFilter: isScrolling ? "blur(10px)" : "blur(6px)",

            transition: "all 0.3s ease",
          }}
          onClick={handleSaveAll}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: "12px", opacity: 0.8 }}>
              {saving
                ? "⏳ Guardando saldos..."
                : saved
                  ? "✅ Guardado"
                  : "💾 Guardar saldos"}
            </span>

            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              Q{" "}
              {total.toLocaleString("es-GT", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </button>
        {showToast && (
          <div style={bankPageStyles.toast}>
            ✅ Saldos guardados correctamente
          </div>
        )}
      </div>
    </div>
  );
};
