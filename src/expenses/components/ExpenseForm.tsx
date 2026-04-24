import { useState } from "react";
import { MoneyInput } from "../../shared/components/MoneyInput";
import type { ExpenseType } from "../interfaces/expense.interface";
import { expenseFormStyles } from "../styles/expenseform.style";

interface Props {
  onSubmit: (data: {
    name: string;
    client: string;
    amount: number;
    type: ExpenseType;
    entryDate: string;
    applyDate: string;
  }) => void;
}

export const ExpenseForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<ExpenseType>("debit");
  const [entryDate, setEntryDate] = useState("");
  const [applyDate, setApplyDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      name,
      client,
      amount: Number(amount || 0),
      type,
      entryDate,
      applyDate,
    });

    // reset
    setName("");
    setClient("");
    setAmount("");
    setEntryDate("");
    setApplyDate("");
    setType("debit");
  };

  return (
    <form onSubmit={handleSubmit} style={expenseFormStyles.form}>
      <input
        placeholder="Nombre del gasto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={expenseFormStyles.input}
      />

      <input
        placeholder="Cliente"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        style={expenseFormStyles.input}
      />

      <MoneyInput
        value={amount}
        numericValue={Number(amount || 0)}
        isEditing={true}
        onChange={setAmount}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value as ExpenseType)}
        style={expenseFormStyles.input}
      >
        <option value="debit">Débito</option>
        <option value="credit">Crédito</option>
      </select>

      <input
        type="date"
        value={entryDate}
        onChange={(e) => setEntryDate(e.target.value)}
        style={expenseFormStyles.input}
      />

      <input
        type="date"
        value={applyDate}
        onChange={(e) => setApplyDate(e.target.value)}
        style={expenseFormStyles.input}
      />

      <button type="submit" style={expenseFormStyles.button}>
        💾 Guardar
      </button>
    </form>
  );
};
