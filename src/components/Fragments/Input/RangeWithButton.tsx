import Label from "../../Elements/Label";

type PropsType = {
  label: string;
  value: number | null;
  min: number;
  max: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  step?: number;
  onClick?: () => void;
};

const RangeWithButton = ({
  label,
  value,
  min,
  max,
  onChange,
  onClick,
  isDisabled,
  step = 1,
}: PropsType) => {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center space-x-2">
        <input
          type="range"
          value={value || max}
          step={step}
          min={min}
          max={max}
          onChange={onChange}
          disabled={isDisabled}
          className="disabled:cursor-not-allowed disabled:opacity-40"
        />
        <span className="text-sm">{value || "∞"}</span>
        <button
          disabled={isDisabled}
          onClick={onClick}
          className="font-semibold cursor-pointer disabled:cursor-not-allowed flex justify-center items-center border border-slate-300 w-6 h-6 rounded bg-slate-200 hover:bg-slate-300"
        >
          ∞
        </button>
      </div>
    </div>
  );
};

export default RangeWithButton;
