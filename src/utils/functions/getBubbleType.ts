const getBubbleType = () => {
  const random = Math.random();
  if (random < 0.5) {
    return "ordinary";
  } else if (random < 0.8) {
    return "danger";
  } else {
    return "lucky";
  }
};

export default getBubbleType;
