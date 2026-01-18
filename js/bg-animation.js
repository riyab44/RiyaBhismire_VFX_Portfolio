// Fog/Mist Background Animation
// Creates slow-moving atmospheric fog effect across sections

class FogEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.fogLayers = [];
        this.animationId = null;

        this.resize();
        this.createFogLayers();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;
    }

    createFogLayers() {
        // Create multiple fog layers for depth
        const layerCount = 5;

        for (let i = 0; i < layerCount; i++) {
            this.fogLayers.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: 300 + Math.random() * 400,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.25,
                opacity: 0.02 + Math.random() * 0.02,
                hue: 210 + Math.random() * 20 // Cool white/moonlight range
            });
        }
    }

    drawFog() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.fogLayers.forEach(layer => {
            // Update position
            layer.x += layer.speedX;
            layer.y += layer.speedY;

            // Wrap around edges
            if (layer.x < -layer.radius) layer.x = this.canvas.width + layer.radius;
            if (layer.x > this.canvas.width + layer.radius) layer.x = -layer.radius;
            if (layer.y < -layer.radius) layer.y = this.canvas.height + layer.radius;
            if (layer.y > this.canvas.height + layer.radius) layer.y = -layer.radius;

            // Draw fog blob
            const gradient = this.ctx.createRadialGradient(
                layer.x, layer.y, 0,
                layer.x, layer.y, layer.radius
            );

            gradient.addColorStop(0, `hsla(${layer.hue}, 60%, 50%, ${layer.opacity})`);
            gradient.addColorStop(0.5, `hsla(${layer.hue}, 50%, 30%, ${layer.opacity * 0.5})`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                layer.x - layer.radius,
                layer.y - layer.radius,
                layer.radius * 2,
                layer.radius * 2
            );
        });
    }

    animate() {
        this.drawFog();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize fog effects on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add fog to about section canvas
    const aboutFog = new FogEffect('about-canvas');

    // Add fog to contact section canvas
    const contactFog = new FogEffect('contact-canvas');

    // Add fog to projects section (create canvas if not exists)
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        let projectsCanvas = document.getElementById('projects-canvas');
        if (!projectsCanvas) {
            projectsCanvas = document.createElement('canvas');
            projectsCanvas.id = 'projects-canvas';
            projectsSection.insertBefore(projectsCanvas, projectsSection.firstChild);
        }
        const projectsFog = new FogEffect('projects-canvas');
    }

    // Waterfall Flow Animation
    const waterfallCanvas = document.getElementById('waterfall-canvas');
    if (waterfallCanvas) {
        const ctx = waterfallCanvas.getContext('2d');
        let particles = [];
        const particleCount = 60;

        function resizeWaterfall() {
            waterfallCanvas.width = window.innerWidth;
            waterfallCanvas.height = 400; // Height of the transition area
        }

        function createParticle() {
            return {
                x: (window.innerWidth / 2) + (Math.random() - 0.5) * 300,
                y: -10,
                speedY: 1.5 + Math.random() * 2,
                speedX: (Math.random() - 0.5) * 0.5,
                size: 1 + Math.random() * 2,
                opacity: 0.2 + Math.random() * 0.4,
                trail: []
            };
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const p = createParticle();
                p.y = Math.random() * waterfallCanvas.height;
                particles.push(p);
            }
        }

        function drawWaterfall() {
            ctx.clearRect(0, 0, waterfallCanvas.width, waterfallCanvas.height);

            particles.forEach((p, index) => {
                // Store trail position
                p.trail.push({ x: p.x, y: p.y });
                if (p.trail.length > 8) p.trail.shift();

                // Draw trail
                p.trail.forEach((t, i) => {
                    const trailOpacity = (i / p.trail.length) * p.opacity * 0.5;
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, p.size * 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(200, 220, 255, ${trailOpacity})`;
                    ctx.fill();
                });

                // Draw main droplet
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 235, 255, ${p.opacity})`;
                ctx.fill();

                // Add glow
                const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                glow.addColorStop(0, `rgba(200, 220, 255, ${p.opacity * 0.3})`);
                glow.addColorStop(1, 'transparent');
                ctx.fillStyle = glow;
                ctx.fillRect(p.x - p.size * 3, p.y - p.size * 3, p.size * 6, p.size * 6);

                // Update position
                p.y += p.speedY;
                p.x += p.speedX;

                // Reset if off screen
                if (p.y > waterfallCanvas.height + 20) {
                    particles[index] = createParticle();
                }
            });

            requestAnimationFrame(drawWaterfall);
        }

        resizeWaterfall();
        initParticles();
        drawWaterfall();

        window.addEventListener('resize', () => {
            resizeWaterfall();
            initParticles();
        });
    }
});
