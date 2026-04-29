import { useState } from "react";
import { CustomerForm } from "../components/CustomerForm";
import { CustomerTable } from "../components/CustomerTable";

export const CustomersPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <div>
      <h1 style={{ color: "white", fontSize: "32px", marginBottom: "16px" }}>
        👤 Clientes
      </h1>
      <CustomerForm onSuccess={handleRefresh} />
      <CustomerTable refreshKey={refreshKey} />
    </div>
  );
};
