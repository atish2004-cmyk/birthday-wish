// Play Background Music on User Interaction
document.addEventListener("DOMContentLoaded", function() {
    let audio = document.getElementById("bg-music");
    audio.volume = 0.5; // Adjust volume if needed
    document.body.addEventListener("click", function() {
        audio.play();
    }, { once: true });
});

// Floating Hearts Animation
setInterval(() => {
    let heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.classList.add("heart");
    document.querySelector(".hearts-container").appendChild(heart);

    let size = Math.random() * 20 + 10 + "px";
    let left = Math.random() * 100 + "vw";
    let duration = Math.random() * 2 + 3 + "s";

    heart.style.left = left;
    heart.style.fontSize = size;
    heart.style.animationDuration = duration;

    setTimeout(() => {
        heart.remove();
    }, 4000);
}, 300);

// Fireworks Animation
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: this.x,
                y: this.y,
                speed: Math.random() * 5 + 1,
                angle: Math.random() * Math.PI * 2,
                life: 100
            });
        }
    }

    update() {
        this.particles.forEach(p => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life--;
        });
        this.particles = this.particles.filter(p => p.life > 0);
    }

    draw() {
        this.particles.forEach(p => {
            ctx.fillStyle = `rgba(255, ${Math.random() * 255}, 0, ${p.life / 100})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.particles.length === 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animateFireworks);
}

window.addEventListener("click", (e) => {
    fireworks.push(new Firework(e.clientX, e.clientY));
});

animateFireworks();

// Image Slideshow
let slideIndex = 0;
const slides = document.querySelectorAll(".slideshow");

function showSlides() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[slideIndex].classList.add("active");
    slideIndex = (slideIndex + 1) % slides.length;
    setTimeout(showSlides, 3000);
}

showSlides();