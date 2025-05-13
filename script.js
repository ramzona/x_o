let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

const statusText = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell));
});

function handleCellClick(cell) {
  const index = cell.getAttribute('data-index');

  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Победил: ${currentPlayer}`;
    gameActive = false;
  } else if (board.every(cell => cell !== null)) {
    statusText.textContent = 'Ничья!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Ход: ${currentPlayer}`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // Горизонтали
    [0,3,6], [1,4,7], [2,5,8], // Вертикали
    [0,4,8], [2,4,6]           // Диагонали
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function restartGame() {
  currentPlayer = 'X';
  board = Array(9).fill(null);
  gameActive = true;
  statusText.textContent = 'Ход: X';
  cells.forEach(cell => cell.textContent = '');
}
