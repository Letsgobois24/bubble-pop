import { useEffect, useState } from "react";
// Audio
import BubblePop from "./assets/audio/bubble-pop.mp3";
import WrongBubblePop from "./assets/audio/wrong-bubble-pop.mp3";
import LuckyBubblePop from "./assets/audio/lucky-bubble-pop.mp3";
import TimeTicking from "./assets/audio/time-ticking.mp3";
// Utils
import getRandomNumber from "./utils/functions/getRandomNumber";
import getBubbleType from "./utils/functions/getBubbleType";
import formatSigned from "./utils/functions/formatSigned";
import BubblesSetting from "./data/BubblesSetting";
import SettingsModal from "./components/Modal/SettingsModal";
import PauseModal from "./components/Modal/PauseModal";

type BubbleType = "ordinary" | "danger" | "lucky";

export type Bubble = {
  id: number;
  x: number;
  xRef: number;
  y: number;
  isPopped: boolean;
  type: BubbleType;
  settings: ReturnType<typeof BubblesSetting>["ordinary"];
};

export default function App() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [spawnRate, setSpawnRate] = useState(650);
  const [time, setTime] = useState<number | null>(105);
  const [speedRate, setSpeedRate] = useState(1);
  const [isSetting, setIsSetting] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const bubbleSettings = BubblesSetting(speedRate);
  const popBubble = (id: number, type: BubbleType, isPopped: boolean) => {
    if (isPopped) return;
    const score = bubbleSettings[type].score;
    const popSound = new Audio(BubblePop);
    const wrongPopSound = new Audio(WrongBubblePop);
    const luckyPopSound = new Audio(LuckyBubblePop);

    popSound.play();
    setScore((prev) => {
      if (prev < 2 && score < 0) {
        return prev;
      }
      return prev + score;
    });
    setBubbles((prev) =>
      prev.map((bubble) => {
        if (type === "danger") wrongPopSound.play();
        if (type === "lucky") luckyPopSound.play();

        return bubble.id === id ? { ...bubble, isPopped: true } : bubble;
      })
    );

    setTimeout(() => {
      setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
    }, 200);
  };

  const handleRestartGame = () => {
    setTime(105);
    setIsSetting(true);
    setIsPaused(false);
    setBubbles([]);
  };

  // Generate Bubble
  useEffect(() => {
    if (isPaused || isSetting) return;
    const interval = setInterval(() => {
      const bubbleType = getBubbleType();
      const generateX = getRandomNumber(10, 90);

      const newBubble: Bubble = {
        id: Date.now(),
        type: bubbleType,
        x: generateX,
        xRef: generateX,
        y: -10,
        isPopped: false,
        settings: bubbleSettings[bubbleType],
      };

      setBubbles((prev) => [...prev, newBubble]);
    }, spawnRate);

    return () => clearInterval(interval);
  }, [spawnRate, isPaused, isSetting]);

  // Timer
  useEffect(() => {
    if (isSetting || isPaused || time === null) return;
    const TimeTickingSound = new Audio(TimeTicking);

    const interval = setInterval(() => {
      if (time <= 5) {
        TimeTickingSound.play();
      }

      if (time <= 1) {
        setIsPaused(true);
      }

      setTime(time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, isPaused, isSetting]);

  // Aturan pada Bubble
  useEffect(() => {
    if (isSetting || isPaused) return;
    const interval = setInterval(() => {
      setBubbles((prev) => {
        const updated = prev
          .filter((bubble) => {
            if (bubble.y > 100) {
              setScore((score) => {
                if (score > 0) return score - bubble.settings.penalty;
                return score;
              });
              return false;
            }
            return true;
          })
          .map((bubble) => {
            let xSpeed = bubble.settings.vibration.speed;
            if (
              bubble.x > bubble.xRef + bubble.settings.vibration.xMax ||
              bubble.x < bubble.xRef - bubble.settings.vibration.xMax
            ) {
              xSpeed *= -1;
            }
            return {
              ...bubble,
              settings: {
                ...bubble.settings,
                vibration: { ...bubble.settings.vibration, speed: xSpeed },
              },
              x: bubble.x + xSpeed,
              y: bubble.y + bubble.settings.speed,
            };
          });

        return updated;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isSetting, isPaused]);

  return (
    <>
      <main>
        {/* Settings */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPaused(true);
          }}
          className="absolute top-3 left-3 border-2 border-lime-300 bg-lime-200 rounded-full group cursor-pointer"
        >
          <img
            src="/src/assets/icons/setting.svg"
            alt="Settings"
            className="w-11 h-11 group-hover:rotate-180 transition duration-600"
          />
          <div className="absolute border-t-2 border-r-2 border-b-2 border-lime-300 -z-1 rounded-r-full top-0.5 bottom-0.5 pl-7 pr-4 bg-lime-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition duration-600 flex items-center font-semibold">
            Settings
          </div>
        </button>

        <div className="absolute top-3 right-3 flex gap-2">
          {/* Timer */}
          <div
            className={`${
              time !== null && time <= 10
                ? "animate-pulse bg-red-600/90"
                : "bg-white/70"
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
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`absolute flex justify-center items-center bottom-0 animate-rise bg-blue-300 rounded-full cursor-pointer transition`}
            onClick={() => popBubble(bubble.id, bubble.type, bubble.isPopped)}
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
        ))}
      </main>
      {isSetting && (
        <SettingsModal
          spawnRate={spawnRate}
          setSpawnRate={setSpawnRate}
          time={time}
          setTime={setTime}
          speedRate={speedRate}
          setSpeedRate={setSpeedRate}
          onClose={() => setIsSetting(false)}
          setIsSetting={setIsSetting}
        />
      )}
      {isPaused && (
        <PauseModal
          setIsPaused={setIsPaused}
          setIsSetting={setIsSetting}
          setBubbles={setBubbles}
          score={score}
          time={time as number}
          onRestart={handleRestartGame}
        />
      )}
    </>
  );
}
