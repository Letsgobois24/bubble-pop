import InputRange from "./Input/InputRange";

const RangeInputs = () => {
  return (
    <div
      className={`transition duration-400 flex justify-around ${
        isDropdown
          ? "opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-4"
      }`}
    >
      {/* Spawn Rate */}
      <InputRange
        label="Spawn Rate"
        value={spawnRate}
        min={300}
        max={1000}
        step={25}
        onChange={(e) => setSpawnRate(Number(e.currentTarget.value))}
        isDisabled={isDisabled}
      />
      {/* Time */}
      <RangeWithButton
        label="Time"
        value={time}
        min={30}
        max={180}
        step={15}
        onClick={() => setTime(null)}
        onChange={(e) => setTime(Number(e.currentTarget.value))}
        isDisabled={isDisabled}
      />

      {/* Bubble Speed */}
      <div>
        <InputRange
          label="Speed Rate"
          value={speedRate.toFixed(2)}
          min={0.7}
          max={1.3}
          step={0.05}
          onChange={(e) => setSpeedRate(Number(e.currentTarget.value))}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
};
