import { useRef } from "react";
import { validateDecimalInput } from "../utils/numberInput.util";
import { formatMoney } from "../utils/money.util";

interface Props {
  value: string;
  numericValue: number;
  isEditing: boolean;
  onChange: (val: string) => void;
}

export const MoneyInput = ({
  value,
  numericValue,
  isEditing,
  onChange,
}: Props) => {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <input
      ref={ref}
      type="text"
      value={isEditing ? value : `Q ${formatMoney(Number(numericValue || 0))}`}
      disabled={!isEditing}
      onFocus={(e) => {
        e.target.select(); // 🔥 selecciona todo al editar
      }}
      onChange={(e) => {
        let raw = e.target.value;

        // 🔥 limpiar formato
        raw = raw.replace(/[Q,\s]/g, "");

        const clean = validateDecimalInput(raw, value);
        if (clean === null) return;

        onChange(clean);
      }}
      onKeyDown={(e) => {
        if (["e", "E", "+", "-"].includes(e.key)) {
          e.preventDefault();
        }
      }}
      style={{
        padding: "6px 10px",
        borderRadius: "6px",
        border: isEditing ? "1px solid #22c55e" : "1px solid #334155",
        background: isEditing ? "#020617" : "#0f172a",
        color: "white",
        width: "120px",
        textAlign: "right",
      }}
    />
  );
};
