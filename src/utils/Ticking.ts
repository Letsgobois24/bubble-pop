import { useEffect, useRef } from "react";
import TimeTicking from "/audio/time-ticking.mp3";

export default function Ticking(seconds: number) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(TimeTicking);
    audioRef.current = audio;

    const startTime = Date.now();

    const handleEnded = () => {
      const elapsed = (Date.now() - startTime) / 1000;

      if (elapsed < seconds) {
        audio.play();
      }
    };

    audio.addEventListener("ended", handleEnded);
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("ended", handleEnded);
    };
  });
}
