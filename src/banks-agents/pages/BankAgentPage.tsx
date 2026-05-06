import { useState } from "react";
import { useBankAgents } from "../hooks/useBankAgents";
import { bankAgentService } from "../services/bank-agent.service";
import { expensesPageStyles } from "../../expenses/styles/expensesPage.style";
import { BankAgentsTable } from "../components/AgentTable";
import { BankAgentForm } from "../components/AgentsForms";
import type { BankAgentDetailResponse } from "../interfaces/bank-agent-detail-response";
import { ConfirmModal } from "../../shared/utils/ConfirmModal";

// 🔥 tipo para detalle
interface DetailItem {
  id: string;
  amount: number;
  createdAt: string;
  checked: boolean;
  bankName: string;
  firstName: string;
  lastName: string;
  paymentDate: string;
  userName: string;
}

export const BankAgentsPage = () => {
  const { data, loading, refetch } = useBankAgents();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [detailData, setDetailData] = useState<DetailItem[]>([]);

  const [saving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // =========================
  // 🔵 CREATE
  // =========================
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

      setSuccessMessage("💳 Transacción guardada");
      refetch();

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      setErrorMessage(
        err?.response?.data?.message || err?.message || "Error inesperado",
      );
    }
  };

  // =========================
  // 👁 VER DETALLE
  // =========================
  const handleView = async (customerId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/bankAgents/customer/${customerId}`,
      );

      const data = await res.json();

      const formatted: DetailItem[] = data.data.map(
        (item: BankAgentDetailResponse) => ({
          id: item.id,
          amount: Number(item.amount),
          createdAt: item.createdAt,
          checked: false,
          bankName: item.bankName,
          firstName: item.firstName,
          lastName: item.lastName,
          paymentDate: item.paymentDate,
          userName: item.userName,
        }),
      );

      setDetailData(formatted);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error cargando detalle");
    }
  };

  // =========================
  // ✅ CONFIRMAR (UPDATE + DELETE)
  // =========================
  const handleConfirm = async () => {
    try {
      setShowConfirmModal(false); // cerrar modal
      setIsDropdownOpen(false); // 🔥 cerrar dropdown

      setErrorMessage(null);
      setSuccessMessage(null);

      const res = await bankAgentService.processBankAgents(detailData);

      if (!res.success) throw new Error(res.message);

      setSuccessMessage("✅ Procesado correctamente");
      refetch();

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch {
      setErrorMessage("❌ Error procesando datos");
    }
  };
  // =========================
  // 🔄 LOADING
  // =========================
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
            zIndex: 9999,
          }}
        >
          {successMessage}
        </div>
      )}

      {/* FORM */}
      <div style={expensesPageStyles.card}>
        <BankAgentForm onSubmit={handleCreate} />
      </div>

      {/* TABLE */}
      <div style={expensesPageStyles.card}>
        <BankAgentsTable data={data} onView={handleView} />
      </div>

      {/* ========================= */}
      {/* 📦 DETALLE */}
      {/* ========================= */}
      {isDropdownOpen && (
        <div style={{ marginTop: "25px" }}>
          <h2
            style={{
              color: "white",
              marginBottom: "20px",
              fontSize: "22px",
              fontWeight: "600",
            }}
          >
            📄 Detalle del Cliente
          </h2>

          {/* 🔥 BOTÓN CONFIRMAR */}
          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={saving}
            style={{
              marginBottom: "20px",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              padding: "12px 20px",
              borderRadius: "10px",
              color: "white",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? "Procesando..." : "✅ Confirmar"}
          </button>

          {detailData.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#020617",
                padding: "20px",
                borderRadius: "14px",
                marginBottom: "15px",
                color: "white",
                border: "1px solid #1e293b",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                {item.firstName} {item.lastName}
              </h3>

              <p style={{ color: "#38bdf8" }}>🏦 {item.bankName}</p>

              <p style={{ fontSize: "13px", opacity: 0.7 }}>
                📅 {new Date(item.createdAt).toLocaleString()}
              </p>

              <p style={{ fontSize: "13px", opacity: 0.7 }}>
                💳 {new Date(item.paymentDate).toLocaleDateString()}
              </p>

              {/* MONTO */}
              <input
                value={item.amount}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  setDetailData((prev) =>
                    prev.map((x) =>
                      x.id === item.id ? { ...x, amount: value } : x,
                    ),
                  );
                }}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "10px",
                  background: "#1e293b",
                  color: "white",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
              />

              {/* ACCIONES */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <button
                  style={{
                    background: "#3b82f6",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    color: "white",
                    border: "none",
                  }}
                >
                  ✏️ Editar
                </button>

                <label>
                  Pagar{" "}
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) => {
                      setDetailData((prev) =>
                        prev.map((x) =>
                          x.id === item.id
                            ? { ...x, checked: e.target.checked }
                            : x,
                        ),
                      );
                    }}
                  />
                </label>
              </div>
              {/* ========================= */}
              {/* 🧠 MODAL */}
              {/* ========================= */}
              <ConfirmModal
                isOpen={showConfirmModal}
                message="¿Seguro que deseas procesar estos pagos?"
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={handleConfirm}
              />

              <p style={{ fontSize: "12px", opacity: 0.5, marginTop: "10px" }}>
                creado por: {item.userName.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
