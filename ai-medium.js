// ai-medium.js

/**
 * Returns a smart move: tries to win or block opponent.
 * @param {string[]} board - Current game board state.
 * @returns {number|null} - Index of the move or null if no moves left.
 */
function getMediumMove(board) {
  const player = "O";
  const opponent = "X";

  // All winning combinations
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  // Try to win
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const values = [board[a], board[b], board[c]];
    if (values.filter(v => v === player).length === 2 &&
        values.includes("")) {
      return pattern[values.indexOf("")];
    }
  }

  // Try to block opponent
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const values = [board[a], board[b], board[c]];
    if (values.filter(v => v === opponent).length === 2 &&
        values.includes("")) {
      return pattern[values.indexOf("")];
    }
  }

  // Otherwise pick center if available
  if (board[4] === "") return 4;

  // Otherwise pick a corner
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => board[i] === "");
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Otherwise pick any available cell
  const available = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter((val) => val !== null);

  if (available.length === 0) return null;

  return available[Math.floor(Math.random() * available.length)];
}
