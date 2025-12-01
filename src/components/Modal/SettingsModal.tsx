import Modal from "./Modal";
import difficultyStyle, { type DifficultyType } from "../../data/difficulty";
import { useState } from "react";

const difficultySettings = {
  Hard: {
    spawnRate: 475,
    time: 70,
    speedRate: 1.15,
  },
  Normal: {
    spawnRate: 650,
    time: 105,
    speedRate: 1,
  },
  Easy: {
    spawnRate: 825,
    time: 145,
    speedRate: 0.85,
  },
};

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

  return (
    <Modal onClose={() => setIsSetting(false)} title="Game Settings">
      <main className="p-4 md:p-5">
        <div className="flex flex-col gap-y-1 mb-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-900">
              Difficulty
            </label>
            <div className="flex justify-between font-semibold">
              {(Object.keys(difficultyStyle) as DifficultyType[]).map(
                (item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDifficulty(item);
                      if (item !== "Custom") {
                        setSpawnRate(difficultySettings[item].spawnRate);
                        setTime(difficultySettings[item].time);
                        setSpeedRate(difficultySettings[item].speedRate);
                        return;
                      }
                      setIsDropdown(true);
                    }}
                    className={`px-5 py-2 rounded-full cursor-pointer ${
                      difficultyStyle[item].style
                    } ${
                      difficulty === item
                        ? difficultyStyle[item].active
                        : difficultyStyle[item].normal
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="self-end">
            <img
              src="/src/assets/icons/dropdown.svg"
              className={`opacity-80 cursor-pointer transition duration-400 p-2 ${
                isDropdown ? "-rotate-180" : ""
              }`}
              alt="Dropdown"
              onClick={() => setIsDropdown(!isDropdown)}
            />
          </div>
          <div
            className={`transition duration-400 flex justify-around ${
              isDropdown
                ? "opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-4"
            }`}
          >
            {/* Spawn Rate */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Spawn Rate
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  value={spawnRate}
                  min={300}
                  max={1000}
                  onChange={(e) => setSpawnRate(Number(e.currentTarget.value))}
                />
                <span className="text-sm">{spawnRate}</span>
              </div>
            </div>
            {/* Time */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Time
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  value={time || 300}
                  min={30}
                  max={180}
                  onChange={(e) => setTime(Number(e.currentTarget.value))}
                />
                <span className="text-sm">{time || "∞"}</span>
                <button
                  onClick={() => setTime(null)}
                  className="font-semibold cursor-pointer flex justify-center items-center border border-slate-300 w-6 h-6 rounded bg-slate-200 hover:bg-slate-300"
                >
                  ∞
                </button>
              </div>
            </div>
            {/* Bubble Speed */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Speed Rate
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  step="0.1"
                  value={speedRate}
                  min="0.7"
                  max="1.3"
                  onChange={(e) => setSpeedRate(Number(e.currentTarget.value))}
                />
                <span className="text-sm">{speedRate.toFixed(1)}</span>
              </div>
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
