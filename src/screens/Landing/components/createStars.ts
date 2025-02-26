export default function createStars() {
  const starsCount = Math.floor(Math.random() * 50) + 100; // 100-150 stars
  const stars = [];

  for (let i = 0; i < starsCount; i++) {
    const size = Math.random() * 3 + 1; // 1-4px
    const top = `${Math.random() * 100}%`;
    const left = `${Math.random() * 100}%`;
    
    // Enhanced opacity and pulsing effect
    const opacity = Math.random() * 0.6 + 0.4; // 0.4-1.0
    const duration = Math.random() * 5 + 2; // 2-7s
    
    // Only some stars will pulse
    const pulse = Math.random() > 0.7;
    
    stars.push({
      id: i,
      top,
      left,
      size,
      opacity,
      duration,
      pulse
    });
  }

  return stars;
}