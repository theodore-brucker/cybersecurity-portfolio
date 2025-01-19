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
                        <p>During my bachelors degree I researched Information Privacy and presented my research at an IEEE conference in Hannover, Germany. I enjoy developing security tools and automating security operations. Most recently I passed my CISSP exam, and have been working full time as a tier one SOC where I have gained valuable experience such as automating tasks to drive efficiency and reduce burnout, and detecting and containing real live incidents.</p>
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
                    element.innerHTML = `<ul class="project-list">
                        <li>
                            [Private]MDR Deployment Project
                            <p>Deployed MDR solutions to dozens of clients in under 2 months, including cloud, hybrid, and on-prem topologies. This project was constrained to a strict deadline which I drove for my team to beat by encouraging cross team collaboration and being personally available to troubleshoot or advise on every step of the process.</p>
                        </li>
                        <li>
                            [Private]Logging Verification Tool
                            <p>Developed a tool to verify integrity of logging across 50 clients in under 30 seconds. The previous manual approach to this process took at least 20 hours a month and could not possibly be completed as thoroughly as an automated check. This allowed me to GUARANTEE a level of baseline level visibility into client networks that had never been achieved.</p>
                        </li>
                        <li>
                            <a href="https://github.com/theodore-brucker/CoveSecurity" target="_blank">[Public]</a>ML-Powered NIDS
                            <p>A full stack development project for a Network Intrusion Detection System powered by transformer based machine learning techniques to catch extremely complex anomalies at extremely competitive rates on common intrusion and anomaly detection datasets. This project was also an opportunity to practice my DevOps skills, implementing CI/CD strategies and containerization for flexible scaling of resource utilization</p>
                        </li>
                        <li>
                            <a href="https://github.com/theodore-brucker/zig-azure-keyvault-client" target="_blank">[Public]</a>Azure KeyVault Client
                            <p>Developed a custom Azure KeyVault client in a low level programming language. This was great exposure to the inner working of the Microsoft Azure API endpoints, and also allowed me to practice my system level coding practices to secure the credentials and authorization tokens used by the tool.</p>
                        </li>
                        <li>
                            <a href="https://github.com/theodore-brucker/scoutnet" target="_blank">[Public]</a>Scoutnet
                            <p>Developed and deployed a distributed Honeynet server/client infrastructure to collect data on threat actor campaigns targeting Azure hosted resources. This required extensive knowledge of Linux, low level programming, Azure, and cloud security concepts.</p>
                        </li>
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