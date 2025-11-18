import React, { useRef, useEffect } from "react";

export default function Game() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const width = 400;
  const height = 600;
  const EPS = 0.5;


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
    

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const b = ball.current;

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
    b.y -= b.dy;

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
        b.y = height - b.radius;
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
  };

  // Game loop
  useEffect(() => {
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
  );
}
