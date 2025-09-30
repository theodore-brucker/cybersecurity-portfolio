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
                        <p>While studying for my BsC at UMaine, I researched Information Privacy focused on GDPR compliance for software developers. In my free time I enjoy tinkering with both state of the art and custom developed security tools. Most recently I passed my CISSP exam and accepted a position as a Cybersecurity Specialist at Fiber Materials Inc (FMI) in Biddeford, ME where I write policies and procedures, select and deploy of security tools (SIEM, EDR, AV), advise on secure networking practices, and act as the primary resource for CMMC 2.0 compliance.</p>
                    </div>
                `;
                break;
            case 'experience':
                element.innerHTML = 
                `<div class="experience-container">
                    <img src="images/fmi-logo.png" alt="Fiber Materials Inc" class="experience-image">
                    <p>
                       Cyber Security Specialist, June 2025 - Present<br>
                    </p>
                </div>
                <div class="experience-container">
                    <img src="images/se-logo.jpeg" alt="Systems Engineering logo" class="experience-image">
                    <p>
                       Security Analyst II, Jan 2025 - June 2025<br>
                       Security Analyst I, Jan 2023 - Jan 2025<br>
                       Network Engineering Intern, May 2022 - Dec 2022
                    </p>
                </div>`;
                break;
                case 'projects':
                    element.innerHTML = `<ul class="project-list">
                        <li>
                            <span class="project-title">CMMC 2.0 compliance</span>
                            <div class="project-tags">
                                <span class="project-tag">Governance, Risk, Compliance</span>
                                <span class="project-tag">Manufacturing</span>
                                <span class="project-tag">Project Management</span>
                                <span class="project-tag">Cybersecurity Operations</span>
                            </div>
                            <p>Organization wide lead on compliance with Cybersecurity Maturity Model Certification (CMMC) including policies and procedures, technical implementation of NIST 800-171 R2 controls, evidence collection, executive reporting and advising, and staying up to date on all CMMC 2.0 news and timelines.</p> 
                        </li>
                        <li>
                            <span class="project-title">Incident Response Playbook Development</span>
                            <div class="project-tags">
                                <span class="project-tag">Documentation</span>
                                <span class="project-tag">Incident Response</span>
                            </div>
                            <p>Developed and maintained a triage and response playbook for an active team of 10 SOC analysts, reducing time to respond and increasing consistency and effectiveness across the board. Follows various incident response standards and focuses specifically on detection, initial response, mitigation, and escalation+triage processes.</p> 
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
                    </ul>`;
                    break;
            case 'education':
                element.innerHTML =
                `<div class="education-container">
                    <img src="images/associate-of-isc2.png" alt="Theo Brucker ISC2 Associate" class="education-image">
                    <img src="images/umaine-logo.jpg" alt="University of Maine logo" class="experience-image">
                    <img src="images/sec-logo.png" alt="CompTIA Security+ logo" class="experience-image">
                    <p>
                        Associate CISSP, November 2024<br>
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