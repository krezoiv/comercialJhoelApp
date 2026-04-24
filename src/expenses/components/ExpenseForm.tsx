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

export const ExpenseForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [applyDate, setApplyDate] = useState("");

  // 📅 fecha actual automática
  const today = new Date().toISOString().split("T")[0];

  // 🔍 simular búsqueda (aquí conectas tu API)
  useEffect(() => {
    const fetchClients = async () => {
      if (!search) return;

      // 👉 reemplaza esto por tu API real
      const fake = [
        { id: "1", firstName: "Samira", lastName: "Icute" },
        { id: "2", firstName: "Juan", lastName: "Perez" },
      ];

      const filtered = fake.filter((c) =>
        `${c.firstName} ${c.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      );

      setClients(filtered);
    };

    fetchClients();
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
