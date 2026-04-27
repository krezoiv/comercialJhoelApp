import { useState } from "react";
import { useBankAgents } from "../hooks/useBankAgents";
import { bankAgentService } from "../services/bank-agent.service";
import { expensesPageStyles } from "../../expenses/styles/expensesPage.style";
import { BankAgentsTable } from "../components/AgentTable";
import { BankAgentForm } from "../components/AgentsForms";

export const BankAgentsPage = () => {
  const { data, loading, refetch } = useBankAgents();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreate = async (data: {
    customerId: string;
    bankId: string;
    userId: string;
    amount: number;
    description: string;
    paymentDate: string;
  }) => {
    try {
      setErrorMessage(null);
      setSuccessMessage(null);

      await bankAgentService.createBankAgent(data);

      // ✅ éxito real
      setSuccessMessage("💳 Transacción guardada");
      refetch();

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      const message =
        err?.response?.data?.message || err?.message || "Error inesperado";

      setErrorMessage(message);

      throw error; // 🔥🔥🔥 ESTA LÍNEA ES LA CLAVE
    }
  };

  if (loading) {
    return <p style={expensesPageStyles.loading}>Cargando...</p>;
  }

  return (
    <div style={expensesPageStyles.inner}>
      <h1 style={expensesPageStyles.title}>🏦 Agentes Bancarios</h1>

      {/* 🔴 ERROR */}
      {errorMessage && (
        <div
          style={{
            background: "#ff4d4f",
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "15px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* 🔵 SUCCESS */}
      {successMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#1677ff",
            color: "white",
            padding: "14px 20px",
            borderRadius: "10px",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        >
          {successMessage}
        </div>
      )}

      <div style={expensesPageStyles.card}>
        <BankAgentForm onSubmit={handleCreate} />
      </div>

      <div style={expensesPageStyles.card}>
        <BankAgentsTable data={data} />
      </div>
    </div>
  );
};
