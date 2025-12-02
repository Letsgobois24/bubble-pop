import difficultyStyle, {
  type DifficultyType,
} from "../../data/Difficulty/DifficultyStyle";
import Button from "../Elements/Button";

type PropsType = {
  onClick: (item: DifficultyType) => void;
  difficulty: DifficultyType;
};

const DifficultyRows = ({ onClick, difficulty }: PropsType) => {
  return (
    <div className="flex justify-between font-semibold">
      {(Object.keys(difficultyStyle) as DifficultyType[]).map((item, idx) => (
        <Button
          key={idx}
          onClick={() => onClick(item)}
          className={`${difficultyStyle[item].style} ${
            difficulty === item
              ? difficultyStyle[item].active
              : difficultyStyle[item].normal
          }`}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default DifficultyRows;
