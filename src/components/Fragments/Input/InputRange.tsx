import Label from "../../Elements/Label";

type PropsType = {
  label: string;
  value: number | string;
  min: number;
  max: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  step?: number;
};

const InputRange = ({
  label,
  value,
  min,
  max,
  onChange,
  isDisabled,
  step = 1,
}: PropsType) => {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center space-x-2">
        <input
          type="range"
          step={step}
          value={value}
          min={min}
          max={max}
          disabled={isDisabled}
          onChange={onChange}
          className="disabled:cursor-not-allowed disabled:opacity-40"
        />
        <span className="text-sm">{value}</span>
      </div>
    </div>
  );
};

export default InputRange;
