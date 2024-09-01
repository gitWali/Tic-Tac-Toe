let currentPlayer = 'X';
let gameWon = false;
let board = [];
let aiMode = false;

for (let i = 1; i <= 9; i++) 
{
    board.push(document.getElementById(`cell-${i}`));
}

const aiModeCheckbox = document.getElementById('ai-mode');
aiModeCheckbox.addEventListener('click', () => 
{
    if (!gameWon) 
    {
        aiMode = aiModeCheckbox.checked;
        aiModeCheckbox.disabled = gameWon ? false : true;
        console.log(`AI mode checkbox ${aiModeCheckbox.disabled ? 'disabled' : 'enabled'}`);
        if (aiMode)
        {
            board.forEach(cell => cell.textContent = '');
            currentPlayer = 'X';
            gameWon = false;
        }
        aiModeCheckbox.disabled = true;
    }
});

board.forEach(cell => 
{
    cell.addEventListener('click', () => 
    {
        if (!gameWon && cell.textContent === '') 
        {
            cell.textContent = currentPlayer;
            checkWin();
            if (aiMode) {
                console.log('AI mode is enabled');
                aiMakeMove();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

function playerMakeMove(cell)
{
    createCross(cell);
}

document.getElementById('restart').addEventListener('click', () => 
{
    board.forEach(cell => 
    {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    document.getElementById('winner').textContent = '';
    gameWon = false;
    aiModeCheckbox.checked = false;
    aiMode = false;
    aiModeCheckbox.disabled = false;
});



function checkWin()
{
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) 
    {
        const combination = winningCombinations[i];
        if (board[combination[0]].textContent === board[combination[1]].textContent && board[combination[1]].textContent === board[combination[2]].textContent && board[combination[0]].textContent !== '') 
        {
            document.getElementById('winner').textContent = `Player ${board[combination[0]].textContent} wins!`;
            gameWon = true;
        }
    }
}

function aiMakeMove() 
{
    if (aiMode && !gameWon) 
    {
        setTimeout(() => 
        {
            const availableCells = board.filter(cell => cell.textContent === '');
            const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
            randomCell.textContent = 'O';
            checkWin();
        }, 500);
    }
}

