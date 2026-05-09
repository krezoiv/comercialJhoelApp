import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MoneyInput } from "../../shared/components/MoneyInput";
import { expenseFormStyles } from "../styles/expenseform.style";
import { customerService } from "../../customers/customers.service";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
}

interface Props {
  onSubmit: (data: {
    customerId: string;
    expenseDescription: string;
    expenseAmount: number;
    expenseType: string;
  }) => void;
}

export const ExpenseForm = ({ onSubmit }: Props) => {
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loadingClients, setLoadingClients] = useState(false);

  const [expenseType, setExpenseType] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const expenseTypes = ["libreria", "tienda", "copias", "impresiones"];

  /* 🔍 BUSCAR CLIENTES */
  useEffect(() => {
    const fetchClients = async () => {
      if (!search.trim()) {
        setClients([]);
        return;
      }

      try {
        setLoadingClients(true);
        const data = await customerService.searchCustomers(search);

        setClients(
          data.map((c) => ({
            id: c.id,
            firstName: c.firstName,
            lastName: c.lastName,
          })),
        );
      } catch (error) {
        console.error("Error buscando clientes:", error);
        setClients([]);
      } finally {
        setLoadingClients(false);
      }
    };

    const delay = setTimeout(fetchClients, 300);
    return () => clearTimeout(delay);
  }, [search]);

  /* 💾 SUBMIT */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClient) return alert("Selecciona un cliente");
    if (!expenseType) return alert("Selecciona un tipo");
    if (!expenseDescription.trim()) return alert("Escribe descripción");
    if (!expenseAmount || Number(expenseAmount) <= 0)
      return alert("Monto inválido");

    onSubmit({
      customerId: selectedClient.id,
      expenseDescription,
      expenseAmount: Number(expenseAmount),
      expenseType,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <form style={expenseFormStyles.form}>
        {/* 🔍 BUSCAR CLIENTE */}
        <div style={{ position: "relative", minWidth: "220px" }}>
          <input
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedClient(null);
            }}
            style={expenseFormStyles.input}
          />

          {loadingClients && (
            <div style={expenseFormStyles.dropdown}>
              <div style={expenseFormStyles.dropdownItem}>Buscando...</div>
            </div>
          )}

          {clients.length > 0 && !selectedClient && (
            <div style={expenseFormStyles.dropdown}>
              {clients.map((c) => (
                <div
                  key={c.id}
                  style={expenseFormStyles.dropdownItem}
                  onClick={() => {
                    setSelectedClient(c);
                    setSearch(`${c.firstName} ${c.lastName}`);
                    setClients([]);
                  }}
                >
                  {c.firstName} {c.lastName}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🧩 TIPO */}
        <select
          value={expenseType}
          onChange={(e) => setExpenseType(e.target.value)}
          style={expenseFormStyles.input}
        >
          <option value="">Seleccionar tipo</option>
          {expenseTypes.map((type) => (
            <option key={type} value={type}>
              {type.toUpperCase()}
            </option>
          ))}
        </select>

        {/* 🧾 DESCRIPCIÓN */}
        <input
          placeholder="Descripción del gasto"
          value={expenseDescription}
          onChange={(e) => setExpenseDescription(e.target.value)}
          style={{ ...expenseFormStyles.input, flex: 2 }}
        />

        {/* 💰 MONTO */}
        <MoneyInput
          value={expenseAmount}
          numericValue={Number(expenseAmount || 0)}
          isEditing={true}
          onChange={setExpenseAmount}
        />

        {/* 💾 BOTÓN */}
        <button
          type="button"
          disabled={
            !selectedClient ||
            !expenseType ||
            !expenseDescription ||
            Number(expenseAmount) <= 0
          }
          style={{
            padding: "10px 18px",
            borderRadius: "12px",
            border: "none",
            background:
              !selectedClient ||
              !expenseType ||
              !expenseDescription ||
              Number(expenseAmount) <= 0
                ? "#555"
                : "linear-gradient(135deg, #00c853, #00e676)",
            color: "#fff",
            fontWeight: "bold",
            cursor:
              !selectedClient ||
              !expenseType ||
              !expenseDescription ||
              Number(expenseAmount) <= 0
                ? "not-allowed"
                : "pointer",
            boxShadow:
              !selectedClient ||
              !expenseType ||
              !expenseDescription ||
              Number(expenseAmount) <= 0
                ? "none"
                : "0 8px 20px rgba(0, 200, 83, 0.5)",
          }}
          onClick={() => setShowConfirm(true)}
        >
          💾 Guardar
        </button>
      </form>

      {/* 💎 MODAL */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            padding: "24px",

            background: "rgba(2,6,23,.35)",
            backdropFilter: "blur(18px) saturate(180%)",
            WebkitBackdropFilter: "blur(18px) saturate(180%)",

            zIndex: 999999,

            animation: "fadeInBackdrop .25s ease",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              maxHeight: "90vh",
              overflowY: "auto",

              background: "linear-gradient(180deg,#0f172a 0%, #020617 100%)",

              borderRadius: "24px",

              padding: "28px",

              border: "1px solid rgba(255,255,255,.06)",

              boxShadow: `
          0 40px 120px rgba(0,0,0,.92),
          0 0 50px rgba(34,197,94,.12)
        `,

              color: "white",

              animation: "iosModalIn .28s cubic-bezier(.16,1,.3,1)",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                marginBottom: "18px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: 800,
                }}
              >
                Confirmar gasto
              </h2>

              <p
                style={{
                  marginTop: "8px",
                  opacity: 0.72,
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                Verifica la información antes de guardar.
              </p>
            </div>

            {/* INFO */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",

                background: "rgba(255,255,255,.03)",

                borderRadius: "18px",

                padding: "18px",

                border: "1px solid rgba(255,255,255,.04)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    opacity: 0.55,
                    marginBottom: "4px",
                  }}
                >
                  CLIENTE
                </div>

                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  {selectedClient?.firstName} {selectedClient?.lastName}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "12px",
                    opacity: 0.55,
                    marginBottom: "4px",
                  }}
                >
                  TIPO
                </div>

                <div
                  style={{
                    color: "#38bdf8",
                    fontWeight: 700,
                    textTransform: "capitalize",
                  }}
                >
                  {expenseType}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "12px",
                    opacity: 0.55,
                    marginBottom: "4px",
                  }}
                >
                  MONTO
                </div>

                <div
                  style={{
                    color: "#22c55e",
                    fontWeight: 800,
                    fontSize: "28px",
                  }}
                >
                  Q {Number(expenseAmount).toFixed(2)}
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div
              style={{
                display: "flex",
                gap: "12px",

                marginTop: "28px",

                position: "sticky",
                bottom: 0,

                background: "linear-gradient(180deg,transparent,#020617)",

                paddingTop: "18px",
              }}
            >
              <button
                style={{
                  flex: 1,

                  padding: "14px",

                  borderRadius: "14px",

                  border: "1px solid rgba(255,255,255,.06)",

                  background: "rgba(255,255,255,.06)",

                  color: "white",

                  cursor: "pointer",

                  fontWeight: 700,

                  transition: "all .25s ease",
                }}
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>

              <button
                style={{
                  flex: 1,

                  padding: "14px",

                  borderRadius: "14px",

                  border: "none",

                  background: "linear-gradient(135deg,#00c853,#00e676)",

                  color: "white",

                  fontWeight: 800,

                  cursor: "pointer",

                  boxShadow: "0 0 24px rgba(0,200,83,.45)",

                  transition: "all .25s ease",
                }}
                onClick={() => {
                  setShowConfirm(false);

                  handleSubmit({
                    preventDefault: () => {},
                  } as React.FormEvent);
                }}
              >
                💾 Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirm &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              background: "rgba(2,6,23,.45)",

              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",

              zIndex: 999999999,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "420px",

                background: "linear-gradient(180deg,#0f172a,#020617)",

                borderRadius: "26px",

                padding: "28px",

                border: "1px solid rgba(255,255,255,.06)",

                boxShadow: `
              0 50px 140px rgba(0,0,0,.95),
              0 0 60px rgba(34,197,94,.10)
            `,

                color: "white",

                animation: "iosModalIn .28s cubic-bezier(.16,1,.3,1)",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  fontSize: "28px",
                  fontWeight: 800,
                }}
              >
                Confirmar gasto
              </h2>

              <p
                style={{
                  opacity: 0.72,
                  marginBottom: "24px",
                }}
              >
                Verifica la información antes de guardar.
              </p>

              <div
                style={{
                  background: "rgba(255,255,255,.03)",

                  borderRadius: "18px",

                  padding: "18px",

                  marginBottom: "24px",

                  border: "1px solid rgba(255,255,255,.04)",
                }}
              >
                <div style={{ marginBottom: "14px" }}>
                  <div
                    style={{
                      opacity: 0.5,
                      fontSize: "12px",
                    }}
                  >
                    CLIENTE
                  </div>

                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    {selectedClient?.firstName} {selectedClient?.lastName}
                  </div>
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <div
                    style={{
                      opacity: 0.5,
                      fontSize: "12px",
                    }}
                  >
                    TIPO
                  </div>

                  <div
                    style={{
                      color: "#38bdf8",
                      fontWeight: 700,
                    }}
                  >
                    {expenseType}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      opacity: 0.5,
                      fontSize: "12px",
                    }}
                  >
                    MONTO
                  </div>

                  <div
                    style={{
                      color: "#22c55e",
                      fontWeight: 800,
                      fontSize: "34px",
                    }}
                  >
                    Q {Number(expenseAmount).toFixed(2)}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <button
                  style={{
                    flex: 1,

                    padding: "14px",

                    borderRadius: "14px",

                    border: "1px solid rgba(255,255,255,.06)",

                    background: "rgba(255,255,255,.05)",

                    color: "white",

                    fontWeight: 700,

                    cursor: "pointer",
                  }}
                  onClick={() => setShowConfirm(false)}
                >
                  Cancelar
                </button>

                <button
                  style={{
                    flex: 1,

                    padding: "14px",

                    borderRadius: "14px",

                    border: "none",

                    background: "linear-gradient(135deg,#00c853,#00e676)",

                    color: "white",

                    fontWeight: 800,

                    cursor: "pointer",

                    boxShadow: "0 0 30px rgba(0,200,83,.45)",
                  }}
                  onClick={() => {
                    setShowConfirm(false);

                    handleSubmit({
                      preventDefault: () => {},
                    } as React.FormEvent);
                  }}
                >
                  💾 Confirmar
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* 🔥 TOAST */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            top: "30px",
            right: "30px",
            background: "linear-gradient(135deg, #00c853, #00e676)",
            color: "#fff",
            padding: "14px 20px",
            borderRadius: "14px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            fontSize: "14px",
            fontWeight: "600",
            zIndex: 999999, // 🔥 IMPORTANTE
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "toastIn 0.30s ease",
          }}
        >
          <span style={{ fontSize: "18px" }}>✅</span>
          Gasto guardado exitosamente
        </div>
      )}
    </>
  );
};
