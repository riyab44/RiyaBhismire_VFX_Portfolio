// VFX Portfolio Script

// Scramble Text Animation
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

function scrambleText(element, finalText, duration = 1500, delay = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const length = finalText.length;
            let iterations = 0;
            const maxIterations = length * 3;
            const intervalTime = duration / maxIterations;

            element.textContent = '';

            const interval = setInterval(() => {
                let displayText = '';

                for (let i = 0; i < length; i++) {
                    // Calculate when this character should be "locked"
                    const lockAt = (i / length) * maxIterations;

                    if (iterations >= lockAt) {
                        // Character is locked to final value
                        displayText += finalText[i];
                    } else {
                        // Still scrambling
                        displayText += chars[Math.floor(Math.random() * chars.length)];
                    }
                }

                element.textContent = displayText;
                iterations++;

                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    element.textContent = finalText;
                    resolve();
                }
            }, intervalTime);
        }, delay);
    });
}

// Initialize text animation on load
window.addEventListener('DOMContentLoaded', async () => {
    const titleElement = document.querySelector('.main-title');
    const subtitleElement = document.querySelector('.subtitle');

    if (titleElement && subtitleElement) {
        const titleText = 'PORTFOLIO';
        const subtitleText = 'RIYA BHISMIRE | VISUAL EFFECTS ARTIST';

        // Hide initially
        titleElement.textContent = '';
        subtitleElement.textContent = '';

        // Animate PORTFOLIO first (after 500ms delay for page load)
        await scrambleText(titleElement, titleText, 1200, 500);

        // Then animate subtitle
        await scrambleText(subtitleElement, subtitleText, 1800, 200);
    }
});

const projectData = {
    project1: {
        title: "Paint Prep showreel",
        video: "https://res.cloudinary.com/du3n5n16d/video/upload/v1768656097/Paint_Prep_Showreel_bewe7o.mp4",
        software: "Nuke, Photoshop",
        desc: "This video features projection cleanplate work, face cleanup, 2D tracking cleanup, wire removal, and the removal of tracker markers."
    },
    project2: {
        title: "Roto_Showreel",
        video: "https://res.cloudinary.com/du3n5n16d/video/upload/v1768656972/Roto_Showreel_dmzser.mp4",
        software: "silhouette, Nuke",
        desc: ""
    },
    project3: {
        title: "Vfx_Comp1",
        video: "https://res.cloudinary.com/du3n5n16d/video/upload/v1768656973/Vfx_Comp1_i5nfov.mp4",
        software: "Photoshop, Nuke",
        desc: ""
    },
    project4: {
        title: "Vfx_Comp2",
        video: "https://res.cloudinary.com/du3n5n16d/video/upload/v1768656972/Vfx_Comp2_c9br8a.mp4",
        software: "Nuke",
        desc: ""
    },
    project5: {
        title: "Vfx_Comp3",
        video: "https://res.cloudinary.com/du3n5n16d/video/upload/v1768656969/Vfx_Comp3_labmnm.mp4",
        software: "Nuke",
        desc: ""
    }
};

function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalVideo = document.getElementById('modalVideo');
    const modalSoftware = document.getElementById('modalSoftware');
    const modalDesc = document.getElementById('modalDesc');

    const data = projectData[projectId];

    if (data) {
        modalTitle.textContent = data.title;
        modalVideo.src = data.video;
        modalSoftware.textContent = data.software;
        modalDesc.textContent = data.desc;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        modalVideo.play().catch(error => {
            console.log("Auto-play was prevented:", error);
        });
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    const modalVideo = document.getElementById('modalVideo');

    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = "";
    document.body.style.overflow = 'auto';
}

window.onclick = function (event) {
    const modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeModal();
    }
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 15, 25, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 15, 25, 0.7)';
    }
});

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-base').forEach(el => {
    observer.observe(el);
});

// Mobile Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Parallax Effect for Hero Section
const hero = document.getElementById('hero');
const parallaxBg = document.querySelector('.parallax-bg');
const parallaxMid = document.querySelector('.parallax-mid');
const parallaxFg = document.querySelector('.parallax-fg');

if (hero && parallaxBg && parallaxMid) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate offset from center (-1 to 1)
        const offsetX = (e.clientX - rect.left - centerX) / centerX;
        const offsetY = (e.clientY - rect.top - centerY) / centerY;

        // Apply different movement speeds for depth effect
        // Background moves most (creates strong depth)
        const bgMoveX = offsetX * 50;
        const bgMoveY = offsetY * 40;

        // Midground moves medium speed
        const midMoveX = offsetX * 30;
        const midMoveY = offsetY * 25;

        // Apply transforms with smooth transition
        parallaxBg.style.transform = `translateZ(-200px) scale(1.2) translate(${bgMoveX}px, ${bgMoveY}px)`;
        parallaxMid.style.transform = `translateZ(-100px) scale(1.1) translate(${midMoveX}px, ${midMoveY}px)`;
    });

    // Reset on mouse leave
    hero.addEventListener('mouseleave', () => {
        parallaxBg.style.transform = 'translateZ(-200px) scale(1.2) translate(0, 0)';
        parallaxMid.style.transform = 'translateZ(-100px) scale(1.1) translate(0, 0)';
    });
}
