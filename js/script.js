// VFX Portfolio Script

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
