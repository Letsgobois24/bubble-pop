import type { BubbleType, BubbleVariant } from "../../type/Bubble";
import formatSigned from "../../utils/functions/formatSigned";

type PropsType = {
  bubble: BubbleType;
  onPop: (
    id: string | number,
    variant: BubbleVariant,
    isPopped: boolean
  ) => void;
};

const Bubble = ({ bubble, onPop }: PropsType) => {
  return (
    <div
      key={bubble.id}
      className={`absolute flex justify-center items-center bottom-0 animate-rise bg-blue-300 rounded-full cursor-pointer transition`}
      onClick={() => onPop(bubble.id, bubble.variant, bubble.isPopped)}
      style={{
        bottom: `${bubble.y}%`,
        left: `${bubble.x}%`,
        width: bubble.settings.size,
        height: bubble.settings.size,
        background: bubble.settings.color,
        animation: bubble.isPopped ? "var(--animate-pop)" : "",
      }}
    >
      {!bubble.isPopped && (
        <span className="text-xl font-semibold font-mono">
          {formatSigned(bubble.settings.score)}
        </span>
      )}
    </div>
  );
};

export default Bubble;
