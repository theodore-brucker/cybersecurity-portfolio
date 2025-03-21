import blogPosts from './blogPosts.js';

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Lazy loading for content sections
    // Updated order to match the new section order
    const sections = ['intro', 'about', 'experience', 'projects', 'education', 'blog'];
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
                        <p>During my bachelors degree I researched Information Privacy and presented my research at an IEEE conference in Hannover, Germany. I enjoy developing security tools and automating security operations. Most recently I passed my CISSP exam, and have earned a promotion to a SOC Analyst II after only 6 months of full time work at a regional MSP in Maine. I spend my time prodiving guidance on security best practices, developing IR playbooks, and responding to security incidents for over 100 clients.</p>
                    </div>
                `;
                break;
            case 'experience':
                element.innerHTML = 
                `<div class="experience-container">
                    <img src="images/se-logo.jpeg" alt="Systems Engineering logo" class="experience-image">
                    <p>
                       Security Analyst II, Systems Engineering, Jan 2025 - Present<br>
                       Security Analyst I, Systems Engineering, Jan 2023 - Jan 2025<br>
                       Network Engineering Intern, Systems Engineering, May 2022 - Dec 2022
                    </p>
                </div>`;
                break;
                case 'projects':
                    element.innerHTML = `<ul class="project-list">
                        <li>
                            <span class="project-title">MDR Playbook</span>
                            <div class="project-tags">
                                <span class="project-tag">Documentation</span>
                                <span class="project-tag">Incident Response</span>
                            </div>
                            <p>Developed and maintained an initial triage and response playbook for an active team of 10 MDR analysts, reducing time to respond and increasing consistency and effectiveness across the board. Follows various incident response standards and focuses specifically on detection, initial response, mitigation, and escalation+triage processes.</p> 
                        </li>
                        <li>
                            <span class="project-title">MDR Deployments</span>
                            <div class="project-tags">
                                <span class="project-tag">Deployment</span>
                                <span class="project-tag">Team Leadership</span>
                            </div>
                            <p>Deployed MDR solutions to dozens of clients in under 2 months, including cloud, hybrid, and on-prem topologies. This project was constrained to a strict deadline which I drove for my team to beat by encouraging cross team collaboration and being personally available to troubleshoot or advise on every step of the process.</p>
                        </li>
                        <li>
                            <span class="project-title">Logging Verification Tool</span>
                            <div class="project-tags">
                                <span class="project-tag">Automation</span>
                                <span class="project-tag">Security Monitoring</span>
                            </div>
                            <p>Developed a tool to verify integrity of logging across 50 clients in under 30 seconds. The previous manual approach to this process took at least 20 hours a month and could not possibly be completed as thoroughly as an automated check. This allowed me to GUARANTEE a level of baseline level visibility into client networks that had never been achieved.</p>
                        </li>
                        <li>
                            <span class="project-title">
                                <a href="https://github.com/theodore-brucker/CoveSecurity" target="_blank" class="project-link">[Public] ML-Powered NIDS</a>
                            </span>
                            <div class="project-tags">
                                <span class="project-tag">Machine Learning</span>
                                <span class="project-tag">Network Security</span>
                                <span class="project-tag">DevOps</span>
                            </div>
                            <p>A full stack development project for a Network Intrusion Detection System powered by transformer based machine learning techniques to catch extremely complex anomalies at extremely competitive rates on common intrusion and anomaly detection datasets. This project was also an opportunity to practice my DevOps skills, implementing CI/CD strategies and containerization for flexible scaling of resource utilization.</p>
                        </li>
                        <li>
                            <span class="project-title">
                                <a href="https://github.com/theodore-brucker/zig-azure-keyvault-client" target="_blank" class="project-link">[Public] Azure KeyVault Client</a>
                            </span>
                            <div class="project-tags">
                                <span class="project-tag">API Integration</span>
                                <span class="project-tag">Security Development</span>
                            </div>
                            <p>Developed a custom Azure KeyVault client in a low level programming language. This was great exposure to the inner working of the Microsoft Azure API endpoints, and also allowed me to practice my system level coding practices to secure the credentials and authorization tokens used by the tool.</p>
                        </li>
                        <li>
                            <span class="project-title">
                                <a href="https://github.com/theodore-brucker/scoutnet" target="_blank" class="project-link">[Public] Scoutnet</a>
                            </span>
                            <div class="project-tags">
                                <span class="project-tag">Honeynet</span>
                                <span class="project-tag">Cloud Security</span>
                                <span class="project-tag">Threat Intelligence</span>
                            </div>
                            <p>Developed and deployed a distributed Honeynet server/client infrastructure to collect data on threat actor campaigns targeting Azure hosted resources. This required extensive knowledge of Linux, low level programming, Azure, and cloud security concepts.</p>
                        </li>
                    </ul>`;
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