import React, { useRef, useEffect, useState } from "react";

export default function Game() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const width = 400;
  const height = 600;
  const EPS = 0.5;
  const currentRowValue = useRef(1);
  const totalBalls = useRef(1);

  // State management
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState(0);
  const [ballCount, setBallCount] = useState(1);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("bbtan_highscore");
    return saved ? JSON.parse(saved) : { score: 0, name: "N/A" };
  }); 

  const ROWS = 8;
  const COLS = 8;
  const blockWidth = width / COLS;
  const blockHeight = height/9; 
  const blocks = useRef([]); // store rows + columns


  const ball = useRef([]);
  const returnX = useRef(null);
  const turnEnded = useRef(false);


  // Setup canvas context
  useEffect(() => {
    if (!gameStarted) return;
    const canvas = canvasRef.current;
    if (canvas) {
      ctxRef.current = canvas.getContext("2d");
    }
  }, [gameStarted]);

  const createBall = (x, y, dx, dy) => ({
    x,
    y,
    radius: 10,
    dx,
    dy,
    speed: 10,
    moving: true
  });
  

  const handleClick = (e) => {
    if (!gameStarted) return;

    const rect = canvasRef.current.getBoundingClientRect();
    turnEnded.current = false;

    if (ball.current.some(b => b.moving)) return;


    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const startX = returnX.current ?? width / 2;


    let dirX = clickX - startX;
    let dirY = clickY - (height - 20);

    const len = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
    dirX /= len;
    dirY /= len;

    // Clear the array and shoot balls with delay
    ball.current = [];
    // Reset return position so first ball to land sets it
    returnX.current = null;
    shootBalls(startX, dirX, dirY);
  };
    

  // Update the ball's position
  const update = () => {
    let movingCount = 0;
  
    ball.current.forEach(b => {
      if (!b.moving) return;
  
      movingCount++;
  
      b.x += b.dx;
      b.y += b.dy;
  
      // walls
      if (b.x - b.radius < 0 || b.x + b.radius > width) {
        b.dx *= -1;
      }
  
      if (b.y - b.radius < 0) {
        b.dy *= -1;
      }
  
      // bottom
      if (b.y + b.radius >= height) {
        b.moving = false;
        b.y = height - 2 * b.radius;
        b.dx = 0;
        b.dy = 0;
        // Only set return position for the first ball that lands
        if (returnX.current === null) {
          returnX.current = b.x;
        }
      }
        
    
      checkBlockCollisions(b);
    });
  
    // when all balls stopped → shift rows
    if (
      ball.current.length > 0 &&
      movingCount === 0 &&
      !turnEnded.current
    ) {
      turnEnded.current = true;
    
      ball.current.forEach(b => {
        b.x = returnX.current;
        b.y = height - 20;
        b.moving = false;
      });
    
      // returnX.current = null;
      shiftRowsDown();
    }
    
  };
  

  // Draw everything on canvas
  const draw = () => {
    const ctx = ctxRef.current;
    // const b = ball.current;
    ctx.clearRect(0, 0, width, height);
    // Draw ball
    ball.current.forEach(b => {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    

// Draw blocks
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
    
        const block = blocks.current[r][c];
        if (!block || !block.exists) continue;
    
        const x = c * blockWidth;
        const y = r * blockHeight;
    
        if (block.isPickup) {
            ctx.fillStyle = "gold";  // pickup color
            ctx.fillRect(x + 2, y + 2, blockWidth - 4, blockHeight - 4);
          
            ctx.fillStyle = "black";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("+1", x + blockWidth / 2, y + blockHeight / 2);
          } else {
            ctx.fillStyle = "cyan"; 
            ctx.fillRect(x + 2, y + 2, blockWidth - 4, blockHeight - 4);
          
            ctx.fillStyle = "black";
            ctx.fillText(block.value, x + blockWidth / 2, y + blockHeight / 2);
          }
          
        }
    }
  };

  //create one row of blocks
  const generateRow = (value = 1, isEmpty = false) => {
    if (isEmpty) return Array(COLS).fill(false);
  
    const rowData = Array(COLS).fill(false);
  
    const numBlocks = Math.floor(Math.random() * 4) + 3; // 3–6 normal blocks
    const availableCols = [...Array(COLS).keys()];
  
    // shuffle
    for (let i = availableCols.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableCols[i], availableCols[j]] = [availableCols[j], availableCols[i]];
    }
  
    // Place normal blocks
    for (let i = 0; i < numBlocks; i++) {
      const c = availableCols[i];
      rowData[c] = { exists: true, value }; 
    }
  
    // Possibly add a pickup block in remaining columns
    const remainingCols = availableCols.slice(numBlocks);
    if (remainingCols.length > 0 && Math.random() < 0.8) {
      const pickupCol = remainingCols[0];
      rowData[pickupCol] = { exists: true, value: 0, isPickup: true };
    }
  
    return rowData;
  };
  
  //multiple balls because of delay
  const shootBalls = (startX, dirX, dirY) => {
    for (let i = 0; i < totalBalls.current; i++) {
      setTimeout(() => {
        ball.current.push(
          createBall(startX, height - 20, dirX * 10, dirY * 10)
        );
      }, i * 90); // 50ms delay between balls
    }
  };
  
  
  
  //Generate the blocks
  const generateBlocks = () => {
    const rows = [];
  
    rows.push(generateRow(1, true));     // row 0 empty
    rows.push(generateRow(1));           // row 1 random
  
    for (let i = 2; i < ROWS; i++) {
      rows.push(generateRow(1, true));   // remaining rows empty
    }
  
    blocks.current = rows;
  };
  
  
  const shiftRowsDown = () => {
    const rows = blocks.current;
    const bottomRow = blocks.current[ROWS - 1];
  
    // remove bottom row
    rows.pop();
  
    // increase difficulty
    currentRowValue.current += 1;
  
    // insert a new row at row 1
    rows.splice(1, 0, generateRow(currentRowValue.current));
  
    blocks.current = rows;

    // Check for game over
    if (bottomRow.some(b => b && b.exists)) {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    // Update high score if needed
    if (score > highScore.score) {
      const newHighScore = { score, name: playerName };
      setHighScore(newHighScore);
      localStorage.setItem("bbtan_highscore", JSON.stringify(newHighScore));
    }

    // Reset game
    setTimeout(() => {
      if (window.confirm(`Game Over! Score: ${score}\nPlay again?`)) {
        window.location.reload();
      }
    }, 100);
  };

  const checkBlockCollisions = (b) => {
  
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
  
        const block = blocks.current[r][c];
        if (!block || !block.exists) continue;
  
        const x = c * blockWidth;
        const y = r * blockHeight;
  
        // Rectangle boundary
        const left = x;
        const right = x + blockWidth;
        const top = y;
        const bottom = y + blockHeight;
  
        // Closest point on rectangle to ball
        const closestX = Math.max(left, Math.min(b.x, right));
        const closestY = Math.max(top, Math.min(b.y, bottom));
  
        const distX = b.x - closestX;
        const distY = b.y - closestY;
  
        // Collision check
        if (distX * distX + distY * distY <= b.radius * b.radius) {
  
            // Bounce
            const dxLeft = Math.abs(b.x - left);
            const dxRight = Math.abs(b.x - right);
            const dyTop = Math.abs(b.y - top);
            const dyBottom = Math.abs(b.y - bottom);

            if (Math.min(dxLeft, dxRight) < Math.min(dyTop, dyBottom)) {
              b.dx *= -1;
            } else {
              b.dy *= -1;
            }
          
            // Handle pickup
            if (block.isPickup) {
              totalBalls.current += 1;  // Increment balls
              setBallCount(prev => prev + 1); // Update state for UI
              blocks.current[r][c] = false;  // remove pickup
            } else {
              // Normal block
              block.value -= 1;
              if (block.value <= 0) {
                blocks.current[r][c] = false;
                setScore(prev => prev + 1); // Increment score when block is destroyed
              }
            }
          
            return;
          }
      }
    }
  };

  // Game loop
  useEffect(() => {
    if (!gameStarted) return;

    generateBlocks();

    // Reset return position and initialize ball at center
    returnX.current = width / 2;
    ball.current = [createBall(width / 2, height - 20, 0, 0)];
    ball.current[0].moving = false;

    let frameId;

    const loop = () => {
      update();
      draw();
      frameId = requestAnimationFrame(loop);
    };

    loop(); // start the game loop

    return () => cancelAnimationFrame(frameId);
  }, [gameStarted]);

  const handleStartGame = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      setGameStarted(true);
    } else {
      alert("Please enter your name!");
    }
  };

  // Player name input screen
  if (!gameStarted) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#111",
        color: "white"
      }}>
        <h1 style={{ marginBottom: 30, fontSize: "3em", color: "#4CAF50" }}>BBTAN</h1>

        <div style={{
          background: "#222",
          padding: "30px",
          borderRadius: "10px",
          border: "2px solid #444",
          minWidth: "300px"
        }}>
          <h2 style={{ marginBottom: 20, textAlign: "center" }}>High Score</h2>
          <div style={{
            textAlign: "center",
            fontSize: "1.2em",
            marginBottom: 30,
            color: "#FFD700"
          }}>
            <div>{highScore.score} pts</div>
            <div style={{ fontSize: "0.8em", color: "#aaa" }}>by {highScore.name}</div>
          </div>

          <form onSubmit={handleStartGame}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 10 }}>
                Enter Your Name:
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Player name"
                autoFocus
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1em",
                  borderRadius: "5px",
                  border: "1px solid #666",
                  background: "#333",
                  color: "white"
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "1.1em",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Start Game
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Game screen
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      background: "#111",
      paddingTop: 20
    }}>
      {/* Score display */}
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        width: "400px",
        color: "white",
        fontSize: "1.2em",
        marginBottom: 10,
        padding: "10px",
        background: "#222",
        borderRadius: "5px"
      }}>
        <div>
          <span style={{ color: "#aaa" }}>Player: </span>
          <span style={{ fontWeight: "bold" }}>{playerName}</span>
        </div>
        <div>
          <span style={{ color: "#aaa" }}>Balls: </span>
          <span style={{ fontWeight: "bold", color: "#FFD700" }}>×{ballCount}</span>
        </div>
        <div>
          <span style={{ color: "#aaa" }}>Score: </span>
          <span style={{ fontWeight: "bold", color: "#4CAF50" }}>{score}</span>
        </div>
      </div>

      {/* High score display */}
      <div style={{
        color: "#FFD700",
        fontSize: "0.9em",
        marginBottom: 10
      }}>
        High Score: {highScore.score} ({highScore.name})
      </div>

      {/* Game canvas */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleClick}
        style={{
          background: "#111",
          display: "block",
          border: "2px solid #333",
          cursor: "crosshair"
        }}
      />

      {/* Instructions */}
      <div style={{
        color: "#888",
        fontSize: "0.9em",
        marginTop: 10,
        textAlign: "center"
      }}>
        Click to aim and shoot • Destroy blocks to score • Collect gold +1 balls
      </div>
    </div>
  );
}
