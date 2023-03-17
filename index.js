function rain() {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particleArray = [];
  const numberOfParticles = 2000;

  const mouse = {
    x: null,
    y: null,
  };

  setInterval(function () {
    mouse.x = undefined;
    mouse.y = undefined;
  }, 200);

  class Particle {
    constructor(x, y, size, color, weight) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.weight = weight * 2;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    update() {
      this.size -= 0.05;
      if (this.size < 0) {
        this.x = mouse.x + (Math.random() * 20 - 10);
        this.y = mouse.y + (Math.random() * 20 - 10);
        this.size = Math.random() * 10 + 2;
        this.weight = Math.random() * 10 + 2;
      }
      this.y += this.weight;
      this.weight += 0.3;

      if (this.y > canvas.height - this.size) {
        this.weight *= Math.random() * -0.8 - 0.2; //this.weight *= -0.8 OG
      }
    }
  }

  function init() {
    particleArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let size = Math.random() * 8 + 3;
      let color = "rgba(255, 255, 255, 1)";
      let weight = 8;
      particleArray.push(new Particle(x, y, size, color, weight));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].update();
      particleArray[i].draw();
    }
    requestAnimationFrame(animate);
  }

  init();
  animate();
}

let fall = document.querySelector("#button");
fall.addEventListener("click", rain);
