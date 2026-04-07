const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

// Load Images
const birdImg = new Image();
birdImg.src = "assets/bird.png";

const topBlockImg = new Image();
topBlockImg.src = "assets/top_block.png";

const bottomBlockImg = new Image();
bottomBlockImg.src = "assets/bottom_block.png";

// Bird properties
let bird = {
  x: 80,
  y: 200,
  width: 40,
  height: 40,
  gravity: 0.6,
  lift: -10,
  velocity: 0
};

// Pipes (blocks)
let pipes = [];
let frame = 0;
let gap = 150;

// Controls (tap / click)
document.addEventListener("click", () => {
  bird.velocity = bird.lift;
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird physics
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // Draw bird
  ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  // Create pipes
  if (frame % 100 === 0) {
    let topHeight = Math.random() * 250 + 50;
    pipes.push({
      x: canvas.width,
      topHeight: topHeight,
      bottomY: topHeight + gap,
      width: 60
    });
  }

  // Draw & move pipes
  for (let i = 0; i < pipes.length; i++) {
    let p = pipes[i];

    p.x -= 2;

    // Top block
    ctx.drawImage(topBlockImg, p.x, 0, p.width, p.topHeight);

    // Bottom block
    ctx.drawImage(
      bottomBlockImg,
      p.x,
      p.bottomY,
      p.width,
      canvas.height - p.bottomY
    );

    // Collision detection
    if (
      bird.x < p.x + p.width &&
      bird.x + bird.width > p.x &&
      (bird.y < p.topHeight || bird.y + bird.height > p.bottomY)
    ) {
      alert("Game Over!");
      document.location.reload();
    }
  }

  // Ground/ceiling collision
  if (bird.y > canvas.height || bird.y < 0) {
    alert("Game Over!");
    document.location.reload();
  }

  frame++;
  requestAnimationFrame(gameLoop);
}

gameLoop();
