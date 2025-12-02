import Modal from "./Modal";
import { type DifficultyType } from "../../data/Difficulty/DifficultyStyle";
import { useState } from "react";
import InputRange from "../Fragments/Input/InputRange";
import difficultySettings from "../../data/Difficulty/DifficultySettings";
import RangeWithButton from "../Fragments/Input/RangeWithButton";
import Dropdown from "../Fragments/Dropdown";
import Label from "../Elements/Label";
import DifficultyRows from "../Fragments/DifficultyRows";

type PropsType = {
  onClose: () => void;
  spawnRate: number;
  setSpawnRate: React.Dispatch<React.SetStateAction<number>>;
  time: number | null;
  setTime: React.Dispatch<React.SetStateAction<number | null>>;
  speedRate: number;
  setSpeedRate: React.Dispatch<React.SetStateAction<number>>;
  setIsSetting: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SettingsModal({
  spawnRate,
  setSpawnRate,
  time,
  setTime,
  speedRate,
  setSpeedRate,
  setIsSetting,
}: PropsType) {
  const [isDropdown, setIsDropdown] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyType>("Normal");
  const isDisabled = difficulty !== "Custom";

  const handleChangeDifficulty = (item: DifficultyType) => {
    setDifficulty(item);
    if (item !== "Custom") {
      setSpawnRate(difficultySettings[item].spawnRate);
      setTime(difficultySettings[item].time);
      setSpeedRate(difficultySettings[item].speedRate);
      return;
    }
    setIsDropdown(true);
  };

  return (
    <Modal size="max-w-xl" title="Game Settings">
      <main className="p-4 md:p-5">
        <div className="flex flex-col gap-y-1 mb-6">
          <div>
            <Label>Difficulty</Label>
            <DifficultyRows
              difficulty={difficulty}
              onClick={handleChangeDifficulty}
            />
          </div>

          {/* Dropdown */}
          <Dropdown
            className="self-end"
            isDropdown={isDropdown}
            onClick={() => setIsDropdown(!isDropdown)}
          />

          {/* Range Inputs */}
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
        </div>
        <button
          onClick={() => setIsSetting(false)}
          className="mx-auto block cursor-pointer px-14 py-3 rounded-2xl font-bold tracking-wide hover:scale-105 transition text-white bg-linear-to-br from-amber-400 to-orange-500 shadow-md"
        >
          Start
        </button>
      </main>
    </Modal>
  );
}
