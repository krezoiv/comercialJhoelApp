import { useState } from "react";
import { useBankAgents } from "../hooks/useBankAgents";
import { bankAgentService } from "../services/bank-agent.service";
import { expensesPageStyles } from "../../expenses/styles/expensesPage.style";
import { BankAgentsTable } from "../components/AgentTable";
import { BankAgentForm } from "../components/AgentsForms";
import type { BankAgentDetailResponse } from "../interfaces/bank-agent-detail-response";
import { ConfirmModal } from "../../shared/utils/ConfirmModal";
import { useRef, useEffect } from "react";
import { formatMoney } from "../../shared/utils/money.util";
import { validateDecimalInput } from "../../shared/utils/numberInput.util";
import type { DetailItem } from "../interfaces/detail-item.interface";
import { bankAgentPageStyles } from "../styles/bankPage.style";

export const BankAgentsPage = () => {
  const { data, loading, refetch } = useBankAgents();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [detailData, setDetailData] = useState<DetailItem[]>([]);

  const [saving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // 👈 CIERRA
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div style={expensesPageStyles.inner}>
        <h1 style={expensesPageStyles.title}>🏦 Agentes Bancarios</h1>

        {/* 🔴 ERROR */}
        {errorMessage && (
          <div style={bankAgentPageStyles.errorMessage}>{errorMessage}</div>
        )}

        {/* 🔵 SUCCESS */}
        {successMessage && (
          <div style={bankAgentPageStyles.successMessage}>{successMessage}</div>
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
          <div ref={dropdownRef}>
            <div style={{ marginTop: "25px" }}>
              <h2 style={bankAgentPageStyles.isDropdownOpen}>
                📄 Detalle del Cliente
              </h2>

              {/* 🔥 BOTÓN CONFIRMAR */}
              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={saving}
                style={{
                  ...bankAgentPageStyles.confirmButton,
                  ...(saving ? bankAgentPageStyles.confirmButtonDisabled : {}),
                }}
              >
                {saving ? "Procesando..." : "✅ Confirmar"}
              </button>

              {detailData.map((item) => (
                <div key={item.id} style={bankAgentPageStyles.detailData}>
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
                    value={
                      editingId === item.id
                        ? item.amount
                        : formatMoney(Number(item.amount))
                    }
                    disabled={editingId !== item.id}
                    onChange={(e) => {
                      const validated = validateDecimalInput(
                        e.target.value,
                        item.amount.toString(),
                      );

                      if (validated === null) return;

                      setDetailData((prev) =>
                        prev.map((x) =>
                          x.id === item.id ? { ...x, amount: validated } : x,
                        ),
                      );
                    }}
                    onBlur={() => {
                      setDetailData((prev) =>
                        prev.map((x) =>
                          x.id === item.id
                            ? {
                                ...x,
                                amount: Number(x.amount),
                              }
                            : x,
                        ),
                      );
                    }}
                    style={{
                      ...bankAgentPageStyles.amountInput,

                      ...(editingId === item.id
                        ? bankAgentPageStyles.amountInputEditing
                        : bankAgentPageStyles.amountInputDisabled),
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
                      onClick={() => {
                        if (editingId === item.id) {
                          setEditingId(null);
                        } else {
                          setEditingId(item.id);
                        }
                      }}
                      style={{
                        ...bankAgentPageStyles.saveButton,

                        ...(editingId === item.id
                          ? bankAgentPageStyles.saveButtonEditing
                          : bankAgentPageStyles.saveButtonDefault),
                      }}
                    >
                      {editingId === item.id ? "💾 Guardar" : "✏️ Editar"}
                    </button>
                    <label style={bankAgentPageStyles.checkboxContainer}>
                      Pagar{" "}
                      <input
                        type="checkbox"
                        checked={item.checked}
                        style={{
                          ...bankAgentPageStyles.checkbox,

                          ...(item.checked
                            ? bankAgentPageStyles.checkboxChecked
                            : bankAgentPageStyles.checkboxUnchecked),
                        }}
                        onClick={(e) => e.preventDefault()}
                        onDoubleClick={() => {
                          setDetailData((prev) =>
                            prev.map((x) =>
                              x.id === item.id
                                ? { ...x, checked: !x.checked }
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

                  <p
                    style={{
                      fontSize: "12px",
                      opacity: 0.5,
                      marginTop: "10px",
                    }}
                  >
                    creado por: {item.userName.toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
