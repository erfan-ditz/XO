// ai-easy.js

/**
 * Returns a random available move from the board.
 * @param {string[]} board - Current game board state.
 * @returns {number|null} - Index of the move or null if no moves left.
 */
function getEasyMove(board) {
  const available = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter((val) => val !== null);

  if (available.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}
