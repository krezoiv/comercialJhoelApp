import { useEffect, useState } from "react";
import { MoneyInput } from "../../shared/components/MoneyInput";
import { expenseFormStyles } from "../../expenses/styles/expenseform.style";
import { customerService } from "../../customers/customers.service";
import type { Bank } from "../../banks/interfaces/bank.interface";
import { bankService } from "../../banks/services/bank.service";
import { useUser } from "../../users/hooks/useUser";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
}

interface Props {
  onSubmit: (data: {
    customerId: string;
    amount: number;
    bankId: string;
    description: string;
    userId: string;
    paymentDate: string;
  }) => void;

  errorMessage?: string | null; // ✅ AQUÍ SÍ VA
}

export const BankAgentForm = ({ onSubmit, errorMessage }: Props) => {
  const { userId } = useUser();
  const [amount, setAmount] = useState("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState("");

  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loadingClients, setLoadingClients] = useState(false);

  const [bank] = useState("");

  // 📅 FECHA
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const max = new Date();
  max.setDate(today.getDate() + 5);
  const maxDate = max.toISOString().split("T")[0];

  const [date, setDate] = useState(minDate);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast] = useState(false);
  const [description, setDescription] = useState("");

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
  const handleSubmit = async () => {
    if (!selectedClient) return alert("Selecciona un cliente");
    if (!selectedBank) return alert("Selecciona un banco");
    if (!amount || Number(amount) <= 0) return alert("Monto inválido");
    if (!date) return alert("Selecciona una fecha");

    // 🔥 VALIDACIÓN DE RANGO
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const max = new Date(today);
    max.setDate(max.getDate() + 5);

    const selected = new Date(date + "T00:00:00");
    selected.setHours(0, 0, 0, 0);

    // 🔥 SUBMIT CORRECTO
    try {
      await onSubmit({
        customerId: selectedClient.id,
        bankId: selectedBank,
        userId: userId,
        amount: Number(amount),
        description,
        paymentDate: date,
      });

      // ✅ SOLO SI TODO SALE BIEN

      // 🔄 RESET SOLO EN ÉXITO
      setAmount("");
      setSelectedBank("");
      setSearch("");
      setSelectedClient(null);
      setDate("");
      setDescription("");
    } catch (error) {
      console.error(error);
      // ❌ NO HAGAS NADA AQUÍ (el padre ya maneja el error)
    }
  };

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const data = await bankService.getBanks();
        setBanks(data);
      } catch (error) {
        console.error("Error cargando bancos:", error);
      }
    };

    fetchBanks();
  }, []);
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
          value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
          style={expenseFormStyles.input}
        >
          <option value="">Seleccionar banco</option>

          {banks.map((b) => (
            <option key={b.id} value={b.id}>
              {b.bankName}
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
        <input
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={expenseFormStyles.input}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            background: "#0b1220",
            border: "1px solid #1f2a44",
            borderRadius: "10px",
            padding: "0 12px",
            height: "42px",
            minWidth: "160px",
          }}
        >
          {/* ICONO */}
          <span
            style={{
              color: "#4facfe",
              fontSize: "16px",
              marginRight: "8px",
              pointerEvents: "none",
            }}
          >
            📅
          </span>

          {/* INPUT REAL (datepicker) */}
          <input
            type="date"
            value={date}
            min={minDate}
            max={maxDate}
            onChange={(e) => setDate(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              outline: "none",
              fontSize: "14px",
              width: "100%",
              cursor: "pointer",
            }}
          />

          {/* ESTILOS PARA ICONO NATIVO */}
          <style>
            {`
      input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(1);
        cursor: pointer;
      }
    `}
          </style>
        </div>

        {/* 💾 BOTÓN */}
        <button
          onClick={handleSubmit}
          style={{
            background: "linear-gradient(135deg, #4facfe, #00f2fe)",
            border: "none",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
          }}
        >
          💾 Guardar
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
          💳 Transacción guardada -----
        </div>
      )}
      {errorMessage && (
        <div
          style={{
            background: "#ff4d4f",
            color: "white",
            padding: "10px",
            borderRadius: "6px",
            marginTop: "10px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </div>
      )}
    </>
  );
};
