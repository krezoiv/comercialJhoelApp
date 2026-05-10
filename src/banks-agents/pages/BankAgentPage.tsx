import { useBankAgents } from "../hooks/useBankAgents";
import { AgentTable } from "../components/AgentTable";
import { AgentsForms } from "../components/AgentsForms";
import { bankAgentPageStyles } from "../styles/bankAgentPage.style";
import { bankAgentService } from "../services/bank-agent.service";

export const BankAgentPage = () => {
  const { data, loading, refetch } = useBankAgents();

  const handleCreate = async (data: {
    customerId: string;
    amount: number;
    bankId: string;
    description: string;
    userId: string;
    paymentDate: string;
  }) => {
    try {
      await bankAgentService.createBankAgent(data);

      refetch();
    } catch (error) {
      console.error("🔥 Error creando agente:", error);
    }
  };

  if (loading) {
    return <p style={{ color: "white" }}>Cargando...</p>;
  }

  const fadeInKeyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(24px) scale(.96);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0px) scale(1);
      filter: blur(0px);
    }
  }
`;

  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div style={bankAgentPageStyles.inner}>
        <h1 style={bankAgentPageStyles.title}>🏦 Agentes Bancarios</h1>
        <div
          style={{
            ...bankAgentPageStyles.card,
            ...bankAgentPageStyles.fadeInUp,
            animationDelay: "0.05s",
          }}
        >
          <AgentsForms onSubmit={handleCreate} onSuccess={refetch} />
        </div>
        <div
          style={{
            ...bankAgentPageStyles.card,
            ...bankAgentPageStyles.fadeInUp,
            animationDelay: "0.12s",
          }}
        >
          <AgentTable data={data} onRefresh={refetch} />
        </div>
      </div>
    </>
  );
};
