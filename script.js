



    // Game Constants
    const scale = 20;
    const rows = 25;
    const cols = 25;
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = cols * scale;
    canvas.height = rows * scale;

    // Snake variables
    let snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
    ];
    let snakeLength = 3;
    let direction = 'RIGHT';
    let food = { x: 10, y: 10, type: 0 };
    let score = 0;
    let level = 1;
    let coins = 0;
    let gameInterval;

    // Random food types
    const foodTypes = ['apple', 'banana', 'cherry', 'grape'];

    // Function to generate food at a random position
    function generateFood() {
        const randomX = Math.floor(Math.random() * cols);
        const randomY = Math.floor(Math.random() * rows);
        food.type = Math.floor(Math.random() * foodTypes.length);
        food = { x: randomX, y: randomY, type: food.type };
    }

    // Draw Snake
    function drawSnake() {
        snake.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? 'green' : 'lime';
            ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
        });
    }

    // Draw Food
    function drawFood() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(food.x * scale + scale / 2, food.y * scale + scale / 2, scale / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.fillText(foodTypes[food.type], food.x * scale, food.y * scale - 5);
    }

    // Update score and level
    function drawScore() {
        document.getElementById('score').textContent = `Score: ${score} | Level: ${level} | Coins: ${coins}`;
    }

    // Snake movement
    function moveSnake() {
        const head = { ...snake[0] };

        if (direction === 'RIGHT') head.x += 1;
        if (direction === 'LEFT') head.x -= 1;
        if (direction === 'UP') head.y -= 1;
        if (direction === 'DOWN') head.y += 1;

        snake.unshift(head);

        // Check if snake eats food
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            snakeLength++;
            generateFood();

            // Check level progression
            if (score >= 10 * level) {
                level++;
                clearInterval(gameInterval);
                gameInterval = setInterval(gameLoop, 100 - (level - 1) * 10); // Increase speed at each level
            }

            // Add coins
            coins += 100;  // Coins awarded after each food is eaten
        } else {
            snake.pop();
        }
    }

    // Check for collisions
    function checkGameOver() {
        const head = snake[0];

        // Check if snake collides with itself
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                clearInterval(gameInterval);
                alert("Game Over!");
                resetGame();
            }
        }

        // Check for wall collisions
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
            clearInterval(gameInterval);
            alert("Game Over! You hit the wall.");
            resetGame();
        }
    }

    // Reset game state
    function resetGame() {
        snake = [
            { x: 5, y: 5 },
            { x: 4, y: 5 },
            { x: 3, y: 5 }
        ];
        snakeLength = 3;
        direction = 'RIGHT';
        score = 0;
        level = 1;
        coins = 0;
        generateFood();
        startGame();
    }

    // Start the game
    function startGame() {
        generateFood();
        gameInterval = setInterval(gameLoop, 100);
    }

    // Game loop
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveSnake();
        drawSnake();
        drawFood();
        drawScore();
        checkGameOver();
    }

    // Key event listeners for controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
        if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
        if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
        if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    });

    // Button controls
    document.getElementById('upBtn').addEventListener('click', () => {
        if (direction !== 'DOWN') direction = 'UP';
    });
    document.getElementById('downBtn').addEventListener('click', () => {
        if (direction !== 'UP') direction = 'DOWN';
    });
    document.getElementById('leftBtn').addEventListener('click', () => {
        if (direction !== 'RIGHT') direction = 'LEFT';
    });
    document.getElementById('rightBtn').addEventListener('click', () => {
        if (direction !== 'LEFT') direction = 'RIGHT';
    });

    startGame();



