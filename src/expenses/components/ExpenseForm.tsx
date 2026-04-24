import { useEffect, useState } from "react";
import { MoneyInput } from "../../shared/components/MoneyInput";
import { expenseFormStyles } from "../styles/expenseform.style";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
}

interface Props {
  onSubmit: (data: {
    name: string;
    clientId: string;
    amount: number;
    entryDate: string;
    applyDate: string;
  }) => void;
}

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type CustomerFromApi = {
  personId: string;
  firstName: string;
  lastName: string;
};

export const ExpenseForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loadingClients, setLoadingClients] = useState(false);

  const [applyDate, setApplyDate] = useState("");

  // 📅 fecha actual automática
  const today = new Date().toISOString().split("T")[0];

  // 🔍 simular búsqueda (aquí conectas tu API)
  useEffect(() => {
    const fetchClients = async () => {
      if (!search.trim()) {
        setClients([]);
        return;
      }

      try {
        setLoadingClients(true);

        const url = `http://localhost:3000/customers/search?search=${search}`;

        const res = await fetch(url);

        // 🔥 AQUÍ VA
        if (!res.ok) {
          throw new Error("Error en la API");
        }

        const data: ApiResponse<CustomerFromApi[]> = await res.json();
        setClients(
          data.data.map((c) => ({
            id: c.personId,
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

    const delayDebounce = setTimeout(() => {
      fetchClients();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClient) return alert("Selecciona un cliente");

    onSubmit({
      name,
      clientId: selectedClient.id,
      amount: Number(amount || 0),
      entryDate: today,
      applyDate,
    });

    // reset
    setName("");
    setAmount("");
    setSearch("");
    setSelectedClient(null);
    setApplyDate("");
  };

  return (
    <form onSubmit={handleSubmit} style={expenseFormStyles.form}>
      {/* 🔍 AUTOCOMPLETE CLIENTE */}
      <div style={{ position: "relative", minWidth: "250px" }}>
        <input
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedClient(null);
          }}
          style={expenseFormStyles.input}
        />

        {/* 🔄 LOADING VA AQUÍ */}
        {loadingClients && (
          <div style={expenseFormStyles.dropdown}>
            <div style={expenseFormStyles.dropdownItem}>Buscando...</div>
          </div>
        )}

        {/* 📋 RESULTADOS */}
        {clients.length > 0 && !selectedClient && (
          <div style={expenseFormStyles.dropdown}>
            {clients.map((c) => (
              <div
                key={c.id}
                style={expenseFormStyles.dropdownItem}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#1e293b")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
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

      {/* 🧾 NOMBRE (más largo) */}
      <input
        placeholder="Nombre del gasto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ ...expenseFormStyles.input, flex: 2 }}
      />

      {/* 💰 MONTO */}
      <MoneyInput
        value={amount}
        numericValue={Number(amount || 0)}
        isEditing={true}
        onChange={setAmount}
      />

      {/* 📅 FECHA FIJA */}
      <input
        type="date"
        value={today}
        disabled
        style={expenseFormStyles.input}
      />

      {/* 📅 FECHA EDITABLE */}
      <input
        type="date"
        value={applyDate}
        onChange={(e) => setApplyDate(e.target.value)}
        style={expenseFormStyles.input}
      />

      <button type="submit" style={expenseFormStyles.button}>
        💾 Guardar
      </button>
    </form>
  );
};
