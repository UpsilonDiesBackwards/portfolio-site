const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let w, h, particles;
let particleDistance = 42;
let mouse = {
    x: undefined,
    y: undefined,
    radius: 75,
};

let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

function init() {
    resizeReset();
    animationLoop();
}

function resizeReset() {
    w = (canvas.width = window.innerWidth);
    h = (canvas.height = window.innerHeight);

    particles = [];
    for (let y = 0; y < h + particleDistance; y += particleDistance) {
        for (let x = 0; x < w + particleDistance; x += particleDistance) {
            particles.push(new Particle(x, y));
        }
    }
}

function animationLoop() {
    ctx.clearRect(0, 0, w, h);
    drawScene();
    requestAnimationFrame(animationLoop);
}

function drawScene() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    drawLine();
}

function drawLine() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < particleDistance * 1.5) {
                opacity = 1 - distance / (particleDistance * 1.5);
                let color = isDarkMode ? "rgba(255, 255, 255, " + opacity + ")" : "rgba(0, 0, 0, " + opacity + ")";
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function mousemove(e) {
    mouse.x = e.x;
    mouse.y = e.y;

    const contentBox = document.getElementById("content");
    const contentBoxRect = contentBox.getBoundingClientRect();
    if (
        mouse.x >= contentBoxRect.left &&
        mouse.x <= contentBoxRect.right &&
        mouse.y >= contentBoxRect.top &&
        mouse.y <= contentBoxRect.bottom
    ) {
        mouse.radius = 25;
    } else {
        mouse.radius = 75;
    }
}

function mouseout() {
    mouse.x = undefined;
    mouse.y = undefined;
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 4;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speed = Math.random() * 25 + 5;
        this.time = Math.random() * Math.PI * 2;
        this.isMoving = false;
    }

    draw() {
        const brightness = this.isMoving ? 1.5 : 0.5 + 0.5 * Math.sin(this.time);
        let color = isDarkMode 
            ? `rgba(255, 255, 255, ${brightness * 0.65})` 
            : `rgba(0, 0, 0, ${brightness * 0.65})`;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        this.time += 0.05;
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let directionX = forceDirectionX * force * this.speed;
        let directionY = forceDirectionY * force * this.speed;

        if (distance < mouse.radius) {
            this.isMoving = true;
            this.x -= directionX;
            this.y -= directionY;
        } else {
            this.isMoving = false;
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

init();
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);
