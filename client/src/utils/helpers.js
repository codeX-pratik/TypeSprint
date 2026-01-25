import words from './words.json';

export const getParagraph = (difficulty = 'medium') => {
  const list = words[difficulty] || words['medium'];
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

export const calculateWPM = (correctChars, timeInSeconds) => {
   // standard formula: (chars / 5) / (time / 60)
   // avoiding division by zero
   if (timeInSeconds <= 0) return 0;
   const words = correctChars / 5;
   const minutes = timeInSeconds / 60;
   return Math.round(words / minutes);
};

export const calculateAccuracy = (totalChars, mistakes) => {
    if (totalChars === 0) return 100;
    const correct = totalChars - mistakes;
    const accuracy = (correct / totalChars) * 100;
    return Math.max(0, Math.round(accuracy)); // Ensure non-negative
};

export const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
};
