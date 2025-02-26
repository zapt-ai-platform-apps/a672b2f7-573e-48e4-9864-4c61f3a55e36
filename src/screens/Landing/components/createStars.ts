const createStars = () => {
  return Array.from({ length: 70 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1, // Changed to number (without 'px')
    opacity: Math.random() * 0.7 + 0.3,
    duration: Math.random() * 5 + 3,
    pulse: Math.random() > 0.7 // 30% of stars will pulse
  }));
};

export default createStars;