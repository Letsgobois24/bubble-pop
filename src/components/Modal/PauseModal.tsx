import type { Bubble } from "../../App";
import Modal from "./Modal";

type PropsType = {
  score: number;
  time: number;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSetting: React.Dispatch<React.SetStateAction<boolean>>;
  setBubbles: React.Dispatch<React.SetStateAction<Bubble[]>>;
  onRestart: () => void;
};

export default function PauseModal({
  score,
  time,
  setIsPaused,
  onRestart,
}: PropsType) {
  return (
    <Modal title="Game Paused" onClose={() => setIsPaused(false)}>
      <div className="p-4 md:p-5 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Your score: <span className="font-mono">{score}</span>
        </h2>
        <h3 className="mb-5 text-lg font-normal text-gray-600">
          Are you sure you want to restart a new game ?
        </h3>
        <div className="flex justify-around">
          {time >= 0 && (
            <button
              onClick={() => setIsPaused(false)}
              className="cursor-pointer px-6 py-2 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-400 active:scale-95 transition shadow-md"
            >
              Continue
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRestart();
            }}
            className="cursor-pointer px-6 py-2 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-400 active:scale-95 transition shadow-md"
          >
            Restart
          </button>
        </div>
      </div>
    </Modal>
  );
}
