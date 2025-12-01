import getRandomNumber from "../utils/functions/getRandomNumber";

const BubblesSetting = (speedRate: number) => {
  return {
    ordinary: {
      color:
        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.25) 20%, rgba(99,102,241,0.35) 70%),linear-gradient(180deg, rgba(99,102,241,0.12), rgba(59,130,246,0.08))",
      size: getRandomNumber(80 / speedRate, 120 / speedRate),
      speed: getRandomNumber(0.15 * speedRate, 0.5 * speedRate),
      score: +3,
      penalty: 1,
      vibration: {
        xMax: getRandomNumber(2 * speedRate, 2.5 * speedRate),
        speed: getRandomNumber(0.02 * speedRate, 0.09 * speedRate),
      },
    },
    danger: {
      color:
        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.25) 20%, rgba(239,68,68,0.35) 70%), linear-gradient(180deg, rgba(239,68,68,0.12), rgba(220,38,38,0.08))",
      size: getRandomNumber(90 * speedRate, 120 * speedRate),
      speed: getRandomNumber(0.1 / speedRate, 0.5 / speedRate),
      score: -2,
      penalty: 0,
      vibration: {
        xMax: getRandomNumber(3 * speedRate, 4 * speedRate),
        speed: getRandomNumber(0.1 / speedRate, 0.3 / speedRate),
      },
    },
    lucky: {
      color:
        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.25) 20%, rgba(245,158,11,0.35) 70%), linear-gradient(180deg, rgba(245,158,11,0.12), rgba(234,179,8,0.08))",
      size: getRandomNumber(50 / speedRate, 70 / speedRate),
      speed: getRandomNumber(0.6 * speedRate, 1 * speedRate),
      score: +9,
      penalty: 0,
      vibration: {
        xMax: getRandomNumber(6 * speedRate, 8 * speedRate),
        speed: getRandomNumber(0.1 * speedRate, 0.3 * speedRate),
      },
    },
  };
};

export default BubblesSetting;
