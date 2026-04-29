import { useState, type ChangeEvent } from "react";
import { useCustomers } from "../hooks/useClients";
import { customerFormStyles as styles } from "../styles/customerForm.style";
import { ConfirmModal } from "../../shared/utils/ConfirmModal";

export const CustomerForm = () => {
  const { createCustomer, loading } = useCustomers();
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });

  const [focused, setFocused] = useState<string | null>(null);
  const [hoverBtn, setHoverBtn] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createCustomer(form);

      setShowConfirm(false);

      // limpiar form
      setForm({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };
  const getInputStyle = (name: string) => ({
    ...styles.input,
    ...(focused === name ? styles.inputFocus : {}),
  });

  const handleConfirmSave = async () => {
    await handleSubmit(); // ejecutar tu submit real
    setShowConfirm(false); // cerrar modal
  };

  return (
    <div>
      <div style={styles.form}>
        <input
          style={getInputStyle("first_name")}
          name="first_name"
          placeholder="Nombre"
          value={form.first_name}
          onChange={handleChange}
          onFocus={() => setFocused("first_name")}
          onBlur={() => setFocused(null)}
        />

        <input
          style={getInputStyle("last_name")}
          name="last_name"
          placeholder="Apellido"
          value={form.last_name}
          onChange={handleChange}
          onFocus={() => setFocused("last_name")}
          onBlur={() => setFocused(null)}
        />

        <input
          style={getInputStyle("phone")}
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
          onFocus={() => setFocused("phone")}
          onBlur={() => setFocused(null)}
        />

        <input
          style={getInputStyle("email")}
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
        />
        <button
          style={{
            ...styles.button,
            ...(hoverBtn ? styles.buttonHover : {}),
            ...(loading ? styles.buttonLoading : {}),
          }}
          onMouseEnter={() => setHoverBtn(true)}
          onMouseLeave={() => setHoverBtn(false)}
          onClick={() => setShowConfirm(true)}
          disabled={loading || showConfirm}
        >
          {loading ? (
            <>
              <span style={styles.spinner}></span>
              <span style={{ marginLeft: "8px" }}>Guardando...</span>
            </>
          ) : (
            "💾 Guardar"
          )}
        </button>
      </div>
      <ConfirmModal
        isOpen={showConfirm}
        message="¿Deseas guardar este cliente?"
        onConfirm={handleConfirmSave}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};
