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
      value={isEditing ? value : `Q ${formatMoney(numericValue || 0)}`}
      disabled={!isEditing}
      onFocus={(e) => {
        e.target.select();
      }}
      onChange={(e) => {
        const raw = e.target.value;

        const clean = validateDecimalInput(raw, value);

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
