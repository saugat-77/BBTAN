import React, { useRef, useEffect } from "react";

export default function Game() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const width = 400;
  const height = 600;
  const EPS = 0.5;
  const currentRowValue = useRef(1);
  const totalBalls = useRef(1); 

  const ROWS = 8;
  const COLS = 8;
  const blockWidth = width / COLS;
  const blockHeight = height/9; 
  const blocks = useRef([]); // store rows + columns


  const ball = useRef([]);
  const returnX = useRef(null);
  const turnEnded = useRef(false);
  const score = useRef(0);


  // Setup canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext("2d");
  }, []);

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
  
    ball.current = [];
  
    for (let i = 0; i < totalBalls.current; i++) {
      ball.current.push(
        createBall(
          startX,
          height - 20,
          dirX * 10,
          dirY * 10
        )
      );
    }
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
        if (returnX.current === null) {
          returnX.current = b.x;
        }
        returnX.current = b.x;
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
    for (let r = 0; r < ROWS; r++) {
      const row = blocks.current[r];
      if (row.some(b => b && b.exists && !b.isPickup)) {
        score.current = Math.max(...row.map(b => b?.value || 0));
        break;
      }
    }

    if (bottomRow.some(b => b && b.exists)) {
      console.log("Game Over");
      // window.location.reload();
    }
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
              blocks.current[r][c] = false;  // remove pickup
            } else {
              // Normal block
              block.value -= 1;
              if (block.value <= 0) blocks.current[r][c] = false;
            }
          
            return;
          }
      }
    }
  };

  // Game loop
  useEffect(() => {
    generateBlocks();
    let frameId;

    const loop = () => {
      
      update();
      draw();
      frameId = requestAnimationFrame(loop);
    };

    loop(); // start the game loop

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
    {/* Display Score */}
    <div style={{ color: "white", textAlign: "center", marginBottom: 10 }}>
      Score: {score.current}
    </div>
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick} 
      style={{
        background: "#111",
        display: "block",
        margin: "20px auto",
        border: "2px solid #333"
      }}
    />
    </div>
    
  );
}
