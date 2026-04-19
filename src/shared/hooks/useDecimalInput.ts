import { validateDecimalInput } from "../utils/numberInput.util";

export const useDecimalInput = () => {
  const handleChange = (
    value: string,
    prevValue: string,
    setValue: (val: string) => void,
  ) => {
    const valid = validateDecimalInput(value, prevValue);
    setValue(valid);
  };

  return { handleChange };
};
