/**
 * Player Utility Functions
 */

/**
 * Format seconds into mm:ss format.
 * @param {number} secs - Time in seconds
 * @returns {string} Formatted timestamp string, e.g. "04:32"
 */
export const formatTime = (secs) => {
  if (!secs || isNaN(secs)) return "00:00";
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
