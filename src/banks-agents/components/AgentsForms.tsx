import { useEffect, useState } from "react";
import { MoneyInput } from "../../shared/components/MoneyInput";
import { expenseFormStyles } from "../../expenses/styles/expenseform.style";
import { customerService } from "../../customers/customers.service";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
}

interface Props {
  onSubmit: (data: {
    customerId: string;
    amount: number;
    bank: string;
    date: string;
  }) => void;
}

export const BankAgentForm = ({ onSubmit }: Props) => {
  const [amount, setAmount] = useState("");

  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loadingClients, setLoadingClients] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [bank, setBank] = useState("");

  // 📅 FECHA
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const max = new Date();
  max.setDate(today.getDate() + 5);
  const maxDate = max.toISOString().split("T")[0];

  const [date, setDate] = useState(minDate);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const banks = ["Banrural", "G&T", "BI", "BAC", "Promerica"];

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
  const handleSubmit = () => {
    if (!selectedClient) return alert("Selecciona un cliente");
    if (!bank) return alert("Selecciona un banco");
    if (!amount || Number(amount) <= 0) return alert("Monto inválido");
    if (!date) return alert("Selecciona una fecha");

    // 🔥 VALIDACIÓN DE RANGO
    const today = new Date();
    const max = new Date();
    max.setDate(today.getDate() + 5);

    const selected = new Date(date + "T00:00:00");

    if (selected < today || selected > max) {
      setErrorMessage("Fecha fuera de rango permitido");
      setShowErrorToast(true);

      setTimeout(() => setShowErrorToast(false), 3000);

      return;
    }

    onSubmit({
      customerId: selectedClient.id,
      amount: Number(amount),
      bank,
      date,
    });

    // 🔥 TOAST
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // 🔄 RESET
    setAmount("");
    setBank("");
    setSearch("");
    setSelectedClient(null);
    setDate(minDate);
  };

  return (
    <>
      <form style={expenseFormStyles.form}>
        {/* 🔍 CLIENTE */}
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

        {/* 🏦 BANCO */}
        <select
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          style={expenseFormStyles.input}
        >
          <option value="">Seleccionar banco</option>
          {banks.map((b) => (
            <option key={b} value={b}>
              {b.toUpperCase()}
            </option>
          ))}
        </select>

        {/* 💰 MONTO */}
        <MoneyInput
          value={amount}
          numericValue={Number(amount || 0)}
          isEditing={true}
          onChange={setAmount}
        />

        {/* 📅 FECHA */}
        <input
          type="date"
          value={date}
          min={minDate}
          max={maxDate}
          onChange={(e) => setDate(e.target.value)}
          style={{
            ...expenseFormStyles.input,
            minWidth: "160px",
            colorScheme: "dark",
            cursor: "pointer",
          }}
        />

        {/* 💾 BOTÓN */}
        <button
          type="button"
          disabled={!selectedClient || !bank || Number(amount) <= 0 || !date}
          style={{
            padding: "10px 18px",
            borderRadius: "12px",
            border: "none",
            background:
              !selectedClient || !bank || Number(amount) <= 0 || !date
                ? "#555"
                : "linear-gradient(135deg, #2563eb, #3b82f6)",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => setShowConfirm(true)}
        >
          💳 Guardar
        </button>
      </form>

      {/* 🔥 MODAL */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            animation: "fadeInBackdrop 0.3s ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#0b1220",
              padding: "25px",
              borderRadius: "20px",
              width: "350px",
              color: "#fff",
              textAlign: "center",
              animation: "iosModalIn 0.3s ease",
            }}
          >
            <h3>Confirmar transacción</h3>

            <p>¿Deseas guardar este movimiento?</p>

            <div style={{ marginTop: "10px" }}>
              {selectedClient?.firstName} {selectedClient?.lastName}
            </div>

            <div style={{ marginTop: "10px" }}>Banco: {bank}</div>

            <div style={{ marginTop: "10px" }}>Monto: Q {amount}</div>

            <div style={{ marginTop: "10px" }}>Fecha: {date}</div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={() => setShowConfirm(false)}>Cancelar</button>

              <button
                onClick={() => {
                  setShowConfirm(false);
                  handleSubmit();
                }}
                style={{
                  background: "#3b82f6",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "10px",
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 TOAST */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            top: "30px",
            right: "30px",
            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
            color: "#fff",
            padding: "14px 20px",
            borderRadius: "14px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            fontWeight: "600",
            zIndex: 999999,
            animation: "toastIn 0.3s ease",
          }}
        >
          💳 Transacción guardada
        </div>
      )}
      {showErrorToast && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "#ef4444",
            color: "#fff",
            padding: "14px 20px",
            borderRadius: "14px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            fontWeight: "600",
            zIndex: 999999,
          }}
        >
          ❌ {errorMessage}
        </div>
      )}
    </>
  );
};
