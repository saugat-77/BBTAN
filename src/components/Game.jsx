import React, { useRef, useEffect } from "react";

export default function Game() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const width = 400;
  const height = 600;
  const EPS = 0.5;

  const ROWS = 6;
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
    speed: 5,
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
    }
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
        if (!blocks.current[r][c]) continue;
    
        const x = c * blockWidth;
        const y = r * blockHeight;
    
        ctx.fillStyle = "cyan";
        ctx.fillRect(x + 2, y + 2, blockWidth - 4, blockHeight - 4);
        }
    }
  
  };

  //Generate the blocks
  const generateBlocks = () => {
    const newBlocks = [];
  
    for (let row = 0; row < ROWS; row++) {
      // Top and bottom row empty
      if (row === 0|| row === ROWS - 1) {
        newBlocks.push(Array(COLS).fill(false));
        continue;
      }
  
      // Fill row with false (empty)
      const rowData = Array(COLS).fill(false);
  
      // Random number of blocks 3–6
      const numBlocks = Math.floor(Math.random() * 4) + 3; // 3,4,5,6
  
      // Available middle columns (1–6)
      const availableCols = [1,2,3,4,5,6];
  
      // Shuffle available columns
      for (let i = availableCols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableCols[i], availableCols[j]] = [availableCols[j], availableCols[i]];
      }
  
      // Place blocks in the first numBlocks shuffled columns
      for (let i = 0; i < numBlocks; i++) {
        const c = availableCols[i];
        rowData[c] = true; // block exists
      }
  
      newBlocks.push(rowData);
    }
  
    blocks.current = newBlocks;
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
