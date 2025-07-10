// Toggle mobile menu
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// Optional: Particle.js background
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.6,
      width: 1.5
    },
    move: {
      enable: true,
      speed: 8,
      direction: 'none',
      out_mode: 'out'
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 1 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});
const roles = ["Arbaz Khan.","Front-end Developer.", "Back-end Developer.","Full-Stack Developer.","Web Developer.", "Freelancer."];
let index = 0;
const roleText = document.getElementById("role-text");

function switchRole() {
  index = (index + 1) % roles.length;
  roleText.style.opacity = 0;

  setTimeout(() => {
    roleText.textContent = roles[index];
    roleText.style.opacity = 1;
  }, 500);
}

setInterval(switchRole, 2200);
