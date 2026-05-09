import { formatMoney } from "../../shared/utils/money.util";

import type { ExpenseDetail } from "../interfaces/expense-detail.interface";

interface Props {
  item: ExpenseDetail;
}

export const ExpenseDetailRow = ({ item }: Props) => {
  return (
    <tr
      style={{
        borderBottom: "1px solid rgba(255,255,255,.04)",
      }}
    >
      {/* DESCRIPCIÓN */}
      <td
        style={{
          padding: "16px",
          color: "white",
        }}
      >
        {item.description}
      </td>

      {/* MONTO */}
      <td
        style={{
          padding: "16px",
          color: "#22c55e",
          fontWeight: 700,
        }}
      >
        Q {formatMoney(Number(item.amount))}
      </td>

      {/* TIPO */}
      <td
        style={{
          padding: "16px",
          color: "#94a3b8",
          textTransform: "capitalize",
        }}
      >
        {item.expenseType}
      </td>

      {/* FECHA */}
      <td
        style={{
          padding: "16px",
          color: "#94a3b8",
        }}
      >
        {new Date(item.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
};
