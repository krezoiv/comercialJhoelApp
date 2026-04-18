import { useEffect, useState, useCallback } from "react";
import { Navbar } from "../../dashboard/components/Navbar";
import { Sidebar } from "../../dashboard/components/Sidebar";
import { bankPageStyles } from "../styles/banks.styles";
import { useBanks } from "../hooks/useBanks";

export const BanksPage = () => {
  const [search, setSearch] = useState("");
  const { banks, loading } = useBanks();

  // 🔥 estados
  const [editedValues, setEditedValues] = useState<Record<string, number>>({});
  const [savedValues, setSavedValues] = useState<Record<string, number>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // 🔥 TOTAL DINÁMICO
  const total = banks
    .flatMap((b) => b.accounts)
    .reduce((acc, item) => {
      return acc + (editedValues[item.number] ?? savedValues[item.number] ?? 0);
    }, 0);

  // 🔥 AUTO SAVE MEMORIZADO (SOLUCION WARNING)
  const handleAutoSave = useCallback(() => {
    const payload = Object.entries(editedValues).map(([number, final]) => ({
      accountNumber: number,
      finalBalance: final,
    }));

    console.log("🔥 AUTO SAVE:", payload);

    // 👉 aquí conectas backend
    // await bankService.updateBalances(payload);

    setSavedValues((prev) => ({
      ...prev,
      ...editedValues,
    }));

    setHasChanges(false);
  }, [editedValues]);

  // 🔥 AUTO SAVE CON DELAY (DEBOUNCE)
  useEffect(() => {
    if (!hasChanges) return;

    const timer = setTimeout(() => {
      handleAutoSave();
    }, 150000);

    return () => clearTimeout(timer);
  }, [editedValues, hasChanges, handleAutoSave]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={bankPageStyles.layout}>
      <Sidebar />

      <div style={bankPageStyles.main}>
        <Navbar />

        {/* HEADER */}
        <div style={bankPageStyles.header}>
          <h1 style={bankPageStyles.title}>🏦 Cuentas Bancarias</h1>

          <div style={bankPageStyles.total}>
            💰 Saldo Total: Q {total.toFixed(2)}
          </div>

          {/* 🔥 INDICADOR CAMBIOS */}
          {hasChanges && (
            <div
              style={{
                background: "#f59e0b",
                padding: "10px",
                borderRadius: "8px",
                color: "black",
                fontWeight: "bold",
              }}
            >
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

        {/* TABLA */}
        <div style={bankPageStyles.tableContainer}>
          <table style={bankPageStyles.table}>
            <thead>
              <tr>
                <th style={bankPageStyles.th}>Cuenta</th>
                <th style={bankPageStyles.th}>Número de Cuenta</th>
                <th style={bankPageStyles.th}>Saldo Inicial</th>
                <th style={bankPageStyles.th}>Saldo Final</th>
              </tr>
            </thead>

            {banks.map((bank, index) => (
              <tbody key={index}>
                {/* 🏦 HEADER BANCO */}
                <tr style={bankPageStyles.bankHeader}>
                  <td colSpan={4}>🏦 {bank.bank}</td>
                </tr>

                {bank.accounts
                  .filter((acc) =>
                    acc.number.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((acc, i) => {
                    const value =
                      editedValues[acc.number] ?? savedValues[acc.number] ?? 0;

                    return (
                      <tr key={i}>
                        {/* CUENTA */}
                        <td
                          style={{
                            ...bankPageStyles.td,
                            textAlign: "left",
                          }}
                        >
                          <strong>{acc.name}</strong>
                          <br />
                          <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                            {acc.accountTypeName}
                          </span>
                        </td>

                        {/* NUMERO */}
                        <td
                          style={{ ...bankPageStyles.td, textAlign: "center" }}
                        >
                          {acc.bankAccountNumber}
                        </td>

                        {/* INICIAL */}
                        <td style={bankPageStyles.amount}>
                          Q {acc.inicial.toFixed(2)}
                        </td>

                        {/* 🔥 FINAL EDITABLE */}
                        <td style={bankPageStyles.amount}>
                          <input
                            type="number"
                            value={value}
                            onChange={(e) => {
                              const newValue = Number(e.target.value);

                              setEditedValues((prev) => ({
                                ...prev,
                                [acc.number]: newValue,
                              }));

                              setHasChanges(true);
                            }}
                            style={{
                              width: "100px",
                              padding: "6px",
                              borderRadius: "6px",
                              border: "1px solid #334155",
                              textAlign: "right",
                              background: "#020617",
                              color: "white",
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            ))}
          </table>
        </div>

        {/* 🔥 BOTÓN FLOTANTE */}
        {hasChanges && (
          <button
            onClick={handleAutoSave}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              background: "#22c55e",
              color: "white",
              border: "none",
              padding: "15px 25px",
              borderRadius: "50px",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.4)",
              cursor: "pointer",
              zIndex: 999,
            }}
          >
            💾 Guardar cambios
          </button>
        )}
      </div>
    </div>
  );
};
