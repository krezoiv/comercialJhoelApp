import { useBankAgents } from "../hooks/useBankAgents";

import { bankAgentService } from "../services/bank-agent.service";
import { expensesPageStyles } from "../../expenses/styles/expensesPage.style";
import { BankAgentsTable } from "../components/AgentTable";
import { BankAgentForm } from "../components/AgentsForms";

export const BankAgentsPage = () => {
  const { data, loading, refetch } = useBankAgents();

  const handleCreate = async (data: {
    customerId: string;
    amount: number;
    bank: string;
  }) => {
    try {
      await bankAgentService.createBankAgent(data);
      refetch();
    } catch (error) {
      console.error("🔥 Error creando agente:", error);
    }
  };

  if (loading) {
    return <p style={expensesPageStyles.loading}>Cargando...</p>;
  }

  return (
    <div style={expensesPageStyles.inner}>
      <h1 style={expensesPageStyles.title}>🏦 Agentes Bancarios</h1>

      <div style={expensesPageStyles.card}>
        <BankAgentForm onSubmit={handleCreate} />
      </div>

      <div style={expensesPageStyles.card}>
        <BankAgentsTable data={data} />
      </div>
    </div>
  );
};
