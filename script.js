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
                        <p>I'm a cybersecurity professional focused on the defense industrial base, currently serving as Cyber Security Specialist / ISSM at Fiber Materials Inc. (FMI) in Biddeford, ME. Over the past year I built FMI's cybersecurity program from the ground up: sourcing and deploying EDR, SIEM, and ITDR tooling, standing up vulnerability management and security awareness programs, and leading the organization's NIST 800-171/CMMC Level 2 effort from gap assessment through control implementation and ongoing C3PAO assessor engagement. I also own accreditation and ongoing management of classified systems under DCSA and NIST 800-53 requirements. In June 2026 I earned my CISSP, adding to my CMMC Certified Professional (CCP) credential from March 2026. Before FMI, I spent time as a SOC analyst at an MSSP, handling incident response across roughly 100 client environments and building out detection and automation tooling. In my free time I enjoy tinkering with both state-of-the-art and custom-built security tools.</p>
                    </div>
                `;
                break;
            case 'experience':
                element.innerHTML = 
                `<div class="experience-container">
                    <img src="images/fmi-logo.png" alt="Fiber Materials Inc" class="experience-image">
                    <p>
                       <strong>Cyber Security Specialist / ISSM, July 2025 &#x2013; Present</strong><br>
                       ISSM for the organization, owning cybersecurity across classified and unclassified systems. Led the CMMC Level 2 effort from gap assessment through control implementation and C3PAO assessor engagement, aligned to NIST 800-171 and DFARS 252.204-7012/7021. Built, accredited, and maintain classified systems under DCSA and NIST 800-53 requirements. Sourced and deployed EDR, SIEM, ITDR, and MFA solutions; built vulnerability management and security awareness programs; report cybersecurity risk and compliance status directly to executive leadership.
                    </p>
                </div>
                <div class="experience-container">
                    <img src="images/se-logo.jpeg" alt="Systems Engineering logo" class="experience-image">
                    <p>
                       <strong>SOC Analyst II, February 2025 - June 2025</strong><br>
                       Shadowed incident response on active breaches (BEC, ransomware, insider threat). Created incident response playbook reducing triage times by 20%. SME on SIEM, SOAR, and XDR platforms.<br><br>
                       <strong>SOC Analyst I, August 2022 - February 2025</strong><br>
                       24/7 SOC operations for ~100 client environments. Developed automation tools, deployed security solutions, and drove cross-team collaboration.<br><br>
                       <strong>Network Engineering Intern, May 2022 - August 2022</strong>
                    </p>
                </div>`;
                break;
            case 'projects':
                element.innerHTML = `<ul class="project-list">
                    <li>
                        <span class="project-title">CMMC 2.0 Level 2 Program Build &#x2013; Gap Assessment to Assessor Engagement</span>
                        <div class="project-tags">
                            <span class="project-tag">CMMC 2.0</span>
                            <span class="project-tag">NIST 800-171</span>
                            <span class="project-tag">Governance, Risk, Compliance</span>
                            <span class="project-tag">Defense Industrial Base</span>
                            <span class="project-tag">Program Management</span>
                        </div>
                        <p>Organization-wide owner of CMMC 2.0 Level 2 readiness as ISSM, leading the effort from initial gap assessment through NIST 800-171 control implementation, policy and procedure development, evidence collection, executive reporting, and ongoing C3PAO assessor engagement. Manage relationships with third-party assessors and consultants while staying current on CMMC 2.0 rulemaking and DFARS 252.204-7012/7021 timelines.</p> 
                    </li>
                    <li>
                        <span class="project-title">Classified System Accreditation &amp; ISSM Program Ownership</span>
                        <div class="project-tags">
                            <span class="project-tag">NIST 800-53</span>
                            <span class="project-tag">DCSA</span>
                            <span class="project-tag">RMF</span>
                            <span class="project-tag">Classified Systems</span>
                        </div>
                        <p>Serving as ISSM, built and accredited classified systems under DCSA oversight and NIST 800-53 control requirements, and own their ongoing security management. Established the risk management processes, documentation, and continuous monitoring needed to maintain accreditation for a defense industrial base manufacturer.</p> 
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
                    <img src="images/cissp-logo.png" alt="Theo Brucker CISSP" class="education-image">
                    <img src="images/umaine-logo.jpg" alt="University of Maine logo" class="experience-image">
                    <img src="images/sec-logo.png" alt="CompTIA Security+ logo" class="experience-image">
                    <p>
                        CISSP, June 2026<br>
                        CMMC Certified Professional (CCP), March 2026<br>
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