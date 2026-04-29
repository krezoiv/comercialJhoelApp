import { useEffect, useState } from "react";
import { customerService, type CustomerStats } from "../customers.service";
import { styles } from "../styles/customerTable.style";

type Props = {
  refreshKey: number;
};

export const CustomerTable = ({ refreshKey }: Props) => {
  const [customers, setCustomers] = useState<CustomerStats[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getCustomerStats();
      setCustomers(data);
    } catch (error) {
      console.error("Error cargando clientes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [refreshKey]); // 🔥 aquí está la magia

  // 🔥 DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("¿Eliminar cliente?");
    if (!confirmDelete) return;

    try {
      console.log("Eliminar:", id);
      // await customerService.deleteCustomer(id);
      // fetchCustomers(); // 🔥 refrescar tabla después
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 FIX AQUÍ (antes era Customer ❌)
  const handleEdit = (customer: CustomerStats) => {
    console.log("Editar:", customer);
    // luego lo conectamos con el form
  };

  const filteredCustomers = customers.filter((c) => {
    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();

    return (
      fullName.includes(search.toLowerCase()) ||
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📋 Lista de Clientes</h2>
      <input
        type="text"
        placeholder="🔍 Buscar cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "16px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #2e303a",
          background: "#0f172a",
          color: "white",
          width: "300px",
          outline: "none",
        }}
      />

      {loading ? (
        <p style={styles.loading}>Cargando...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Apellido</th>

              <th style={styles.th}># Gastos</th>
              <th style={styles.th}>Monto Gastos</th>

              <th style={styles.th}># Agentes</th>
              <th style={styles.th}>Monto Agentes</th>

              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={7}>No hay clientes</td>
              </tr>
            ) : filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={7}>No hay resultados</td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <tr key={c.customerId} style={styles.tr}>
                  <td style={styles.td}>{c.firstName}</td>
                  <td style={styles.td}>{c.lastName}</td>

                  {/* 🔥 GASTOS */}
                  <td style={styles.td}>{c.totalExpenses}</td>
                  <td style={styles.td}>
                    Q {Number(c.totalExpensesAmount).toLocaleString()}
                  </td>

                  {/* 🔥 AGENTES */}
                  <td style={styles.td}>{c.totalBankAgent}</td>
                  <td style={styles.td}>
                    Q {Number(c.totalBankAgentAmount).toLocaleString()}
                  </td>

                  {/* 🔥 ACCIONES */}
                  <td style={styles.actions}>
                    <button
                      style={styles.editBtn}
                      onClick={() => handleEdit(c)}
                    >
                      ✏️
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(c.customerId)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
