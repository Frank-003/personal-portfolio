// Responsive Navbar Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
});

// Smooth Scrolling
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header height
                behavior: "smooth",
            });
        }

        // Close the menu after clicking a link (for mobile)
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
    });
});

// Back-to-Top Button
const backToTop = document.createElement("div");
backToTop.innerHTML = "&#8679;";
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Submit Contact Form
document.querySelector('#contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        subject: document.querySelector('#subject').value,
        message: document.querySelector('#message').value
    };

    fetch('http://127.0.0.1:5000/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                alert('Message sent successfully!');
            }
        })
        .catch(error => console.error('Error:', error));
});
// Fetch Projects
function loadProjects() {
    fetch('http://127.0.0.1:5000/projects')
        .then(response => response.json())
        .then(projects => {
            const projectContainer = document.querySelector('#project-container');
            projectContainer.innerHTML = ''; // Clear previous content

            projects.forEach(project => {
                const projectCard = `
                    <div class="project-card">
                        <h3>${project.title}</h3>
                        <p>${project.description || 'No description available'}</p>
                        <a href="${project.link}" target="_blank">View Project</a>
                    </div>
                `;
                projectContainer.innerHTML += projectCard;
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', loadProjects);