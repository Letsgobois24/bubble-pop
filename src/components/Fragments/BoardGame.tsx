type PropsType = {
  time: number | null;
  score: number;
};

const BoardGame = ({ time, score }: PropsType) => {
  return (
    <div className="absolute top-3 right-3 flex gap-2">
      {/* Timer */}
      <div
        className={`${
          time !== null && time <= 10
            ? "animate-pulse bg-red-600/90"
            : "bg-white/75"
        } px-4 py-2 w-full transition rounded-xl backdrop-blur-xl border border-white shadow-md text-gray-900 font-mono text-2xl font-bold`}
      >
        <span className="mr-1">Time:</span>
        {time != null ? time : "∞"}
      </div>

      {/* Score */}
      <div className="px-4 py-2 w-full rounded-xl bg-white/75 backdrop-blur-xl border border-white shadow-md text-gray-900 font-mono text-2xl font-bold">
        <span className="mr-1">Score:</span>
        {score}
      </div>
    </div>
  );
};

export default BoardGame;
