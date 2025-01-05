import blogPosts from './blogPosts.js';

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Lazy loading for content sections
    const sections = ['intro', 'about', 'education', 'experience', 'projects', 'blog'];
    sections.forEach(sectionId => {
        const sectionElement = document.getElementById(`${sectionId}-content`);
        loadSectionContent(sectionId, sectionElement);
    });

    // Blog post expansion
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('read-more')) {
            const postId = parseInt(e.target.getAttribute('data-post-id'));
            showFullPost(postId);
        }
    });

    // Close full post
    const closePostButton = document.getElementById('close-post');
    closePostButton.addEventListener('click', closeFullPost);
});

function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function loadSectionContent(sectionId, element) {
    // Simulating content loading with setTimeout
    setTimeout(() => {
        switch(sectionId) {
            case 'intro':
                element.innerHTML = `<p></p>`;
                break;
            case 'about':
                element.innerHTML = `
                    <div class="about-container">
                        <img src="images/about-me.jpg" alt="Theo Brucker Portrait" class="about-image">
                        <p>During my bachelors degree I researched Information Privacy and presented my research at an IEEE conference in Hannover, Germany. I have experimented in Software Development developing security tools leveraging state of the art machine learning algorithms to detect network intrusions. Most recently I passed my CISSP exam, and have been working full time as a SOC I at a regional MSP in New England.</p>
                    </div>
                `;
                break;
            case 'education':
                element.innerHTML =
                `<div class="education-container">
                    <img src="images/associate-of-isc2.png" alt="Theo Brucker ISC2 Associate" class="education-image">
                    <img src="images/umaine-logo.jpg" alt="University of Maine logo" class="experience-image">
                    <img src="images/sec-logo.png" alt="CompTIA Security+ logo" class="experience-image">
                    <p>
                        ISC2 Associate, 2024 (granted by passing the CISSP exam)<br>
                        B.S. in Computer Science, University of Maine, 2024<br>
                        CompTIA Security+, 2023
                    </p>
                </div>`
                break;
            case 'experience':
                element.innerHTML = 
                `<div class="experience-container">
                    <img src="images/se-logo.jpeg" alt="Systems Engineering logo" class="experience-image">
                    <p>Security Analyst, Systems Engineering, 2023-Present<br>
                       Network Engineering Intern, Systems Engineering, 2022-2023
                    </p>
                </div>`;
                break;
            case 'projects':
                element.innerHTML = `<ul>
                    <li>Deployed MDR solutions to dozens of clients in under 2 months, including cloud, hybrid, and on-prem topologies. This project was constrained to a strict deadline which I drove for my team to beat by encouraging cross team collaboration and being personally available to troubleshoot or advise on every step of the process.</li>
                    <li>Developed a tool to verify integrity of logging across 50 clients in under 30 seconds. The previous manual approach to this process took at least 20 hours a month and could not possibly be completed as thoroughly as an automated check. This allowed me to GUARANTEE a level of baseline level visibility into client networks that had never been achieved.</li>
                    </ul>`;
                break;
            case 'blog':
                loadBlogPosts(element);
                break;
        }
        element.classList.add('fade-in');
    }, 500);
}

function loadBlogPosts(element) {
    const blogHTML = blogPosts.map(post => `
        <article>
            <h3>${post.title}</h3>
            <p>${post.preview}</p>
            <button class="read-more" data-post-id="${post.id}">Read More</button>
            <br></br>
        </article>
    `).join('');

    element.innerHTML = blogHTML;
}

function showFullPost(postId) {
    const fullPostElement = document.getElementById('full-post');
    const fullPostContent = document.getElementById('full-post-content');
    
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        fullPostContent.innerHTML = post.content;
        fullPostElement.classList.remove('hidden');
    }
}

function closeFullPost() {
    const fullPostElement = document.getElementById('full-post');
    fullPostElement.classList.add('hidden');
}