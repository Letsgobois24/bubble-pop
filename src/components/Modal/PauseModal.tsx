import type { BubbleType } from "../../type/Bubble";
import BoardHeading from "../Elements/BoardHeading";
import Button from "../Elements/Button";
import Modal from "./Modal";

type PropsType = {
  score: number;
  time: number | null;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSetting: React.Dispatch<React.SetStateAction<boolean>>;
  setBubbles: React.Dispatch<React.SetStateAction<BubbleType[]>>;
  onRestart: () => void;
};

export default function PauseModal({
  score,
  time,
  setIsPaused,
  onRestart,
}: PropsType) {
  const isDone = time && time >= 0;

  const handleRestart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onRestart();
  };

  return (
    <Modal
      size="max-w-md"
      title="Game Paused"
      onClose={isDone ? () => setIsPaused(false) : undefined}
    >
      <div className="p-4 md:p-5 text-center">
        {isDone === true && (
          <BoardHeading>Remaining Time: {time} s</BoardHeading>
        )}
        <BoardHeading>Your score: {score}</BoardHeading>
        <h4 className="mb-5 text-lg font-normal text-gray-600">
          Are you sure you want to restart a new game ?
        </h4>
        <div className="flex justify-around">
          {isDone === true && (
            <Button variant="green" onClick={() => setIsPaused(false)}>
              Continue
            </Button>
          )}
          <Button variant="amber" onClick={handleRestart}>
            Restart
          </Button>
        </div>
      </div>
    </Modal>
  );
}
