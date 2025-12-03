import { useEffect, useRef, useState } from "react";
// Audio
import BubblePop from "/audio/bubble-pop.mp3";
import WrongBubblePop from "/audio/wrong-bubble-pop.mp3";
import LuckyBubblePop from "/audio/lucky-bubble-pop.mp3";
import TimeTicking from "/audio/time-ticking.mp3";
// Utils
import getRandomNumber from "./utils/functions/getRandomNumber";
import getBubbleType from "./utils/functions/getBubbleType";
import SettingsModal from "./components/Modal/SettingsModal";
import PauseModal from "./components/Modal/PauseModal";
import BubbleSetting from "./data/BubbleSetting";
import { type BubbleType, type BubbleVariant } from "./type/Bubble";
import Bubble from "./components/Fragments/Bubble";
import BoardGame from "./components/Fragments/BoardGame";
import SettingButton from "./components/Fragments/SettingButton";

export default function App() {
  const [bubbles, setBubbles] = useState<BubbleType[]>([]);
  const [score, setScore] = useState(0);
  const [spawnRate, setSpawnRate] = useState(650);
  const [time, setTime] = useState<number | null>(105);
  const [speedRate, setSpeedRate] = useState(1);
  const [isSetting, setIsSetting] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const timeRef = useRef<number | null>(105);

  useEffect(() => {
    if (isSetting) {
      timeRef.current = time;
    }
  });

  const bubbleSettings = BubbleSetting(speedRate);
  const handlePopBubble = (
    id: string | number,
    variant: BubbleVariant,
    isPopped: boolean
  ) => {
    if (isPopped) return;
    const score = bubbleSettings[variant].score;
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
        if (variant === "danger") wrongPopSound.play();
        if (variant === "lucky") luckyPopSound.play();

        return bubble.id === id ? { ...bubble, isPopped: true } : bubble;
      })
    );

    setTimeout(() => {
      setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
    }, 200);
  };

  const handleRestartGame = () => {
    setTime(105);
    setScore(0);
    setIsSetting(true);
    setIsPaused(false);
    setBubbles([]);
    setTime(timeRef.current);
  };

  // Generate Bubble
  useEffect(() => {
    if (isPaused || isSetting) return;
    const interval = setInterval(() => {
      const bubbleType = getBubbleType();
      const generateX = getRandomNumber(10, 90);

      const newBubble: BubbleType = {
        id: Date.now(),
        variant: bubbleType,
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
      if (time == 4) {
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
        {/* Setting Button */}
        <SettingButton
          onClick={(e) => {
            e.stopPropagation();
            setIsPaused(true);
          }}
        />

        {/* Board Game */}
        <BoardGame score={score} time={time} />

        {/* Spawn Bubbles */}
        {bubbles.map((bubble) => (
          <Bubble key={bubble.id} bubble={bubble} onPop={handlePopBubble} />
        ))}
      </main>

      {/* Setting Modal */}
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

      {/* Paused Modal */}
      {isPaused && (
        <PauseModal
          setIsPaused={setIsPaused}
          setIsSetting={setIsSetting}
          setBubbles={setBubbles}
          score={score}
          time={time}
          onRestart={handleRestartGame}
        />
      )}
    </>
  );
}
