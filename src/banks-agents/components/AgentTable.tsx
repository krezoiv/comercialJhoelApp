import { useState, Fragment } from "react";
import { bankAgentTableStyles } from "../styles/bankAgentTable.style";
import type { BankAgent } from "../interfaces/bank-agent.interface";

import { AgentDrillDown } from "./AgentDrillDown";

interface Props {
  data: BankAgent[];

  onRefresh: () => void;
}

export const AgentTable = ({ data, onRefresh }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <table style={bankAgentTableStyles.table}>
      <thead style={bankAgentTableStyles.thead}>
        <tr>
          <th style={bankAgentTableStyles.th}>Cliente</th>

          <th style={bankAgentTableStyles.th}>Transacciones</th>

          <th style={bankAgentTableStyles.th}>Monto total</th>

          <th style={bankAgentTableStyles.th}>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {data.map((c) => {
          console.log(c);

          return (
            <Fragment key={c.customerId}>
              <tr style={bankAgentTableStyles.row}>
                <td style={bankAgentTableStyles.td}>
                  {c.firstName} {c.lastName}
                </td>

                <td style={bankAgentTableStyles.td}>{c.totalTransactions}</td>

                <td
                  style={{
                    ...bankAgentTableStyles.td,
                    color: "#22c55e",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  Q {Number(c.totalAmount).toFixed(2)}
                </td>

                <td style={bankAgentTableStyles.td}>
                  <div style={bankAgentTableStyles.actions}>
                    <button
                      style={bankAgentTableStyles.viewButton}
                      onClick={() =>
                        setExpandedId(
                          expandedId === c.customerId ? null : c.customerId,
                        )
                      }
                    >
                      👁 Ver
                    </button>

                    <button style={bankAgentTableStyles.editButton}>
                      ✏️ Editar
                    </button>
                  </div>
                </td>
              </tr>
              {expandedId === c.customerId && (
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      padding: "30px 0",
                      background: "transparent",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <AgentDrillDown
                        customerId={c.customerId}
                        onRefresh={onRefresh}
                      />
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};
