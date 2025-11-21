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


  const ball = useRef({
    x: width / 2,
    y: height - 20,
    radius: 10,
    dx: 0,
    dy: 0,
    speed: 10,
    moving: false
  });
  

  // Setup canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext("2d");
  }, []);

  //shoot when users clicks
  const handleClick = (e) => {
    
    const rect = canvasRef.current.getBoundingClientRect();
    const b = ball.current;

    if (b.moving) return;

        // Only allow firing if the ball is at the bottom and not moving

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let dirX = clickX - b.x; // how far right (or left)
    let dirY = clickY - b.y; // how far down (or up)

    // normalize
    const len = Math.sqrt(dirX*dirX + dirY*dirY);
    dirX /= len;
    dirY /= len;

    // apply speed
    b.dx = dirX * b.speed;
    b.dy = dirY * b.speed;
    b.moving = true;


  };
  // Update the ball's position
  const update = () => {
    const b = ball.current;

    b.x += b.dx;
    b.y += b.dy;

    // Simple bouncing off walls (horizontal only for now)
    if (b.x - b.radius < 0 || b.x + b.radius > width) {
      b.dx *= -1;
    }

    // Simple bouncing off top 
    if (b.y - b.radius < 0) {
      b.dy *= -1;
    }else if (b.y -4* b.radius > height) {
      // Reset ball to top if it goes off bottom
      b.x = width / 2;
      b.y = 600-4*Math.PI * 2;
    }

      // Stop at bottom
    if (b.y + b.radius >= height) {
        b.moving = false;
        b.y = height - 2* b.radius;
        b.dx = 0;
        b.dy = 0;
        shiftRowsDown();
    }
    checkBlockCollisions();
  };

  // Draw everything on canvas
  const draw = () => {
    const ctx = ctxRef.current;
    const b = ball.current;
    ctx.clearRect(0, 0, width, height);
    // Draw ball
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();

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
  
    // remove bottom row
    rows.pop();
  
    // increase difficulty
    currentRowValue.current += 1;
  
    // insert a new row at row 1
    rows.splice(1, 0, generateRow(currentRowValue.current));
  
    blocks.current = rows;
  };

  const checkBlockCollisions = () => {
    const b = ball.current;
  
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
            const overlapX = b.x < left || b.x > right;
            const overlapY = b.y < top || b.y > bottom;
          
            if (overlapX) b.dx *= -1;
            if (overlapY) b.dy *= -1;
          
            // Handle pickup
            if (block.isPickup) {
              totalBalls.current += 1;  // Increment balls
              blocks.current[r][c] = false;  // remove pickup
            } else {
              // Normal block
              block.value -= 1;
              if (block.value <= 0) blocks.current[r][c] = false;
            }
          
            return; // stop after first collision
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
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
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
