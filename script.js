        document.addEventListener('DOMContentLoaded', function() {
            // --- AOS (Animate On Scroll) Initialization ---
            AOS.init({
                duration: 1000, // Animation duration in milliseconds (0 to 3000, step 50ms)
                easing: 'ease-out-quad', // Easing function for the animation
                once: true, // Whether animation should happen only once - while scrolling down
                mirror: false, // Whether elements should animate out while scrolling past them
                anchorPlacement: 'top-bottom', // Defines which position of the element should trigger the animation
            });

            // --- Smooth Scroll for Internal Navigation Links ---
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault(); // Prevent default anchor click behavior

                    const targetId = this.getAttribute('href');
                    // Check if the target exists before trying to scroll
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const navbarHeight = document.querySelector('.navbar').offsetHeight;
                        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth' // Smooth scroll to the target section
                        });

                        // Close mobile menu if open after clicking a link
                        const navList = document.querySelector('.nav-links');
                        const mobileMenu = document.getElementById('mobile-menu');
                        if (navList.classList.contains('active')) {
                            navList.classList.remove('active');
                            mobileMenu.classList.remove('active'); // Also toggle the hamburger icon state
                        }
                    }
                });
            });

            // --- Mobile Menu Toggle ---
            const mobileMenu = document.getElementById('mobile-menu');
            const navList = document.querySelector('.nav-links');

            if (mobileMenu && navList) { // Ensure elements exist before adding listeners
                mobileMenu.addEventListener('click', () => {
                    navList.classList.toggle('active');
                    mobileMenu.classList.toggle('active'); // Toggle class on button for hamburger animation
                });
            }

            // --- Dynamic Role Text Switching ---
            const roles = ["Web Developer.", "Front-end Developer.", "Back-end Developer.", "Full-Stack Developer.", "Freelancer."];
            let index = 0;
            const roleText = document.getElementById("role-text");

            function switchRole() {
                if (!roleText) return; // Exit if element not found

                roleText.style.opacity = 0; // Fade out

                setTimeout(() => {
                    index = (index + 1) % roles.length;
                    roleText.textContent = roles[index];
                    roleText.style.opacity = 1; // Fade in
                }, 400); // Duration of fade-out before changing text (slightly faster)
            }

            if (roleText) { // Only start if the element exists
                // Initial call to set the first role and start the interval
                setTimeout(() => {
                    switchRole(); // Call once to set initial text and start the loop
                    setInterval(switchRole, 2500); // Interval for switching roles (adjusted for new animation)
                }, 1000); // Initial delay before starting the loop
            }

            // --- particles.js background initialization ---
            // Make sure particlesJS is loaded before calling it
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 80, density: { enable: true, value_area: 800 } },
                        color: { value: '#ffffff' }, // Particles are white
                        shape: { type: 'circle' },
                        opacity: { value: 0.5, random: true },
                        size: { value: 3, random: true },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#ffffff', // Lines are white
                            opacity: 0.6,
                            width: 1.5
                        },
                        move: {
                            enable: true,
                            speed: 8, // Adjust speed as desired
                            direction: 'none',
                            random: false, // Set to true for more chaotic movement
                            straight: false,
                            out_mode: 'out',
                            bounce: false,
                            attract: { enable: false, rotateX: 600, rotateY: 1200 }
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
                            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                            repulse: { distance: 200, duration: 0.4 },
                            push: { particles_nb: 4 },
                            remove: { particles_nb: 2 }
                        }
                    },
                    retina_detect: true
                });
            } else {
                console.warn("particles.js library not loaded. Particle background will not appear.");
            }

            // --- Gemini API Integration: Project Description Enhancer ---
            const enhanceButtons = document.querySelectorAll('.enhance-btn');
            const modal = document.getElementById('customModal');
            const modalMessage = document.getElementById('modalMessage');
            const closeButton = document.querySelector('.close-button');

            // Function to show custom modal
            function showModal(message) {
                modalMessage.textContent = message;
                modal.style.display = 'flex'; // Use flex to center content
            }

            // Function to hide custom modal
            function hideModal() {
                modal.style.display = 'none';
            }

            // Close modal when close button is clicked
            closeButton.addEventListener('click', hideModal);

            // Close modal when clicking outside of the modal content
            window.addEventListener('click', (event) => {
                if (event.target == modal) {
                    hideModal();
                }
            });

            enhanceButtons.forEach(button => {
                button.addEventListener('click', async () => {
                    const projectTitle = button.dataset.projectTitle;
                    const originalDescription = button.dataset.originalDescription;
                    const projectCard = button.closest('.project-card');
                    const enhancedDescriptionElement = projectCard.querySelector('.enhanced-description');
                    const loadingIndicator = projectCard.querySelector('.loading-indicator');

                    // Hide previous enhanced description and show loading
                    enhancedDescriptionElement.classList.remove('visible');
                    enhancedDescriptionElement.textContent = ''; // Clear previous text
                    loadingIndicator.classList.add('visible');

                    const prompt = `Given the project title '${projectTitle}' and its current description '${originalDescription}', generate a slightly more detailed or alternative description (around 2-3 sentences) focusing on its key features or impact. Make it engaging for a portfolio. Do not include the project title in the generated description.`;

                    let chatHistory = [];
                    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                    const payload = { contents: chatHistory };
                    const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                    try {
                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        const result = await response.json();

                        if (result.candidates && result.candidates.length > 0 &&
                            result.candidates[0].content && result.candidates[0].content.parts &&
                            result.candidates[0].content.parts.length > 0) {
                            const text = result.candidates[0].content.parts[0].text;
                            enhancedDescriptionElement.textContent = text;
                            enhancedDescriptionElement.classList.add('visible');
                        } else {
                            showModal("Failed to generate enhanced description. Please try again.");
                            console.error('Gemini API response structure unexpected:', result);
                        }
                    } catch (error) {
                        showModal("An error occurred while fetching the enhanced description. Please check your network connection.");
                        console.error('Error calling Gemini API:', error);
                    } finally {
                        loadingIndicator.classList.remove('visible');
                    }
                });
                AOS.init({
    duration: 1000,
    easing: 'ease-out-quad',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',
});

            });
        });
