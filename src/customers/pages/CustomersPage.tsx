import { CustomerForm } from "../components/CustomerForm";

export const CustomersPage = () => {
  return (
    <div>
      <h1 style={{ color: "white", fontSize: "32px", marginBottom: "16px" }}>
        👤 Clientes
      </h1>
      <CustomerForm />
    </div>
  );
};
