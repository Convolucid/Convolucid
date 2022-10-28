import "./style.css";
import html from "./index.html";
import Experience from "./components/webgl/Experience.js";

import navComponent from "./components/nav/nav.js";
import CollapsiblePanel from "./components/collapsiblePanel/CollapsiblePanel.js";
import PortfolioLink from "./components/portfolioLink/PortfolioLink.js";

import ResumeCategory from "./components/resumeCategory/resumeCategory.js";
import resumePDF from "./assets/2022.09_Resume.pdf";
import resumeCourseraCertPDF from "./assets/2022.10_HTML-CSS-JS-forWebDevelopers.pdf";
import resumeHeadingHTML from "./components/resumeCategory/resumeCategories/resumeHeading.html";
import resumeWorkExperience from "./components/resumeCategory/resumeCategories/workExperience.html";
import resumeRecentProjects from "./components/resumeCategory/resumeCategories/recentProjects.html";
import resumePortfolio from "./components/resumeCategory/resumeCategories/portfolio.html";
import resumeEducation from "./components/resumeCategory/resumeCategories/education.html";
import resumeSkills from "./components/resumeCategory/resumeCategories/skills.html";

import martialPathImg from "./assets/martialpath.jpg";
import trainingWheelsImg from "./assets/trainingwheels.jpg";
import oneironomiconImg from "./assets/oneironomicon.jpg";
import ironPhoenixImg from "./assets/ironphoenix.jpg";
import oceanImg from "./assets/ocean.jpg";

function component(htmlStructure) {
    const element = document.createElement("div");
    element.classList.add("container");
    element.innerHTML = htmlStructure;

    return element;
}

const bodyHTML = component(html);
document.body.appendChild(bodyHTML);

const r = document.querySelector(":root");

const nav = navComponent();
const main = document.querySelector("main");
const canvas = document.querySelector("canvas.webgl");

const navLogo = document.getElementById("nav-logo");
const navTitle = document.getElementById("nav-title");
const portfolioLink = document.getElementById("link-portfolio");
const resumeLink = document.getElementById("link-resume");
const webglControlToggle = document.getElementById("toggle-webgl-controls");
const darkModeToggle = document.getElementById("toggle-dark-mode");

const portfolioPage = document.createElement("div");
const resumePage = document.createElement("div");
portfolioPage.classList.add("container");
resumePage.classList.add("container");

main.appendChild(portfolioPage);
main.appendChild(resumePage);

/**
 * Portfolio Page
 */
const portfolioIntro = new ResumeCategory(
    `<h1>Welcome to my portfolio.</h1>My name is Stephen Roberts.  I am a front-end developer and artist working in the field of creative coding.`
);

portfolioIntro.classList.replace("resume-category", "hero-section");
portfolioPage.appendChild(portfolioIntro);

const largeAppPanel = new CollapsiblePanel(
    "Apps and Websites",
    new PortfolioLink(
        "Martial Path",
        "martial.convolucid.com",
        martialPathImg,
        `A digital version of a kung fu rank curriculum, in which students complete challenges to earn new techniques, lessons, and sets.  The app demonstrates mobile-first responsive design with HTML, CSS, and Javascript.  Direct SVG manipulation, GSAP animation, and CSS transitions are utilized in menus and backgrounds. All artwork was created in Adobe Photoshop, Illustrator, and Indesign using original illustrations and stock images.`
    ),
    new PortfolioLink(
        "Iron Phoenix",
        "ironphoenix.net",
        ironPhoenixImg,
        `A website created for a local martial arts school.  The site was built with MODX, an open source CMS similar to Wordpress.  Some of the more notable features include an auto-scrolling gallery and parallax image movement.`
    ),
    new PortfolioLink(
        "Oneironomicon",
        "poetics.convolucid.com",
        oneironomiconImg,
        `A project site experimenting with WebGL and canvas manipulation.  The Oneironomicon is a playground for Three.js, Blender, and GLSL practice.  The site features custom 3D models and shaders with Javascript-triggered GSAP animations.  It includes scroll-triggered events and creative uses of the HTML Canvas 2D context.`
    )
);

const smallAppPanel = new CollapsiblePanel(
    "Small Projects and Experiments",
    new PortfolioLink(
        "Ocean",
        "ocean.convolucid.com",
        oceanImg,
        `A Three.js scene using fragment and vertex shaders.  The uniforms are updated on an animation cycle to create a moving texture like a churning sea.`
    ),
    new PortfolioLink(
        "Training Wheels",
        "wheels.convolucid.com",
        trainingWheelsImg,
        `This site is a rehearsal space for me to practice coding fundamentals, version control, and Webpack bundling.  After adding new features to the site I delete and rewrite it from scratch (using the old code as reference).  The most recent version has some light SVG animations on custom background illustrations.  The site's code is written in vanilla HTML, CSS, and Javascript, while the content is written in Markdown and imported with a Webpack plugin.`
    )
);

portfolioPage.appendChild(largeAppPanel);
portfolioPage.appendChild(smallAppPanel);

/**
 * Resume Page
 */
const resumeHeading = new ResumeCategory(resumeHeadingHTML);

const workExperiencePanel = new CollapsiblePanel(
    "Work Experience",
    new ResumeCategory(resumeWorkExperience)
);
const recentProjectsPanel = new CollapsiblePanel(
    "Recent Projects",
    new ResumeCategory(resumeRecentProjects)
);
const resumePortfolioPanel = new CollapsiblePanel(
    "Portfolio",
    new ResumeCategory(resumePortfolio)
);
const resumeEducationPanel = new CollapsiblePanel(
    "Education",
    new ResumeCategory(resumeEducation)
);
const resumeSkillsPanel = new CollapsiblePanel(
    "Skills",
    new ResumeCategory(resumeSkills)
);

resumePage.appendChild(resumeHeading);
resumePage.appendChild(workExperiencePanel);
resumePage.appendChild(recentProjectsPanel);
resumePage.appendChild(resumePortfolioPanel);
resumePage.appendChild(resumeEducationPanel);
resumePage.appendChild(resumeSkillsPanel);

const resumeDownloadPDF = document.getElementById("resume-pdf");
const resumeDownloadCourseraCertPDF = document.getElementById("resume-coursera-cert-pdf");
resumeDownloadPDF.href = resumePDF;
resumeDownloadCourseraCertPDF.href = resumeCourseraCertPDF;

/**
 * Page Switching Functionality
 */
const mainPageArray = [portfolioPage, resumePage];

// Background Three.js experience
const experience = new Experience(canvas, canvas);

// Display content functionality, hides and displays the portfolio/resume pages
function displayContent(content, contentArray) {
    for (let i = 0; i < contentArray.length; i++) {
        if (contentArray[i] == content) {
            contentArray[i].classList.remove("main-hidden");
        } else {
            contentArray[i].classList.add("main-hidden");
        }
    }
    resize();
}

// Special function that adds a special focus style to the portfolio nav link when page is active, and activates on first load
function displayPortfolioPage() {
    displayContent(portfolioPage, mainPageArray);
    portfolioLink.classList.add("nav-list-focus");
    resumeLink.classList.remove("nav-list-focus");
}
displayPortfolioPage();

// Top nav click handlers
navLogo.addEventListener("click", () => {
    displayPortfolioPage();
});
navTitle.addEventListener("click", () => {
    displayPortfolioPage();
});
portfolioLink.addEventListener("click", () => {
    displayPortfolioPage();
});
resumeLink.addEventListener("click", () => {
    displayContent(resumePage, mainPageArray);
    resumeLink.classList.add("nav-list-focus");
    portfolioLink.classList.remove("nav-list-focus");
});

// Toggle functions for 3D control and dark mode.  Canvas is changed between back and front with css z-index variable.  When in the front, the Orbit Controls are accessible because there are no elements in front of the canvas.
function toggleWebGLControl() {
    const zIndex = getComputedStyle(canvas).getPropertyValue("--z-webgl");
    if (zIndex == -2) {
        canvas.style.setProperty("--z-webgl", 1);
        experience.debug.ui.show();
    } else {
        canvas.style.setProperty("--z-webgl", -2);
        experience.debug.ui.hide();
    }
}

// This highlights the 3D controls nav element when active
webglControlToggle.addEventListener("click", () => {
    toggleWebGLControl();
    nav.toggleHighlight(webglControlToggle);
    nav.resize();
});

// Dark mode toggle accesses all CSS color variables and exchanges their values with their opposite.  It also accesses the renderer background for the canvas and changes it to a specified color, then the individual colored elements in the scene are changed.  Finally the nav link is highlighted like the 3D controls.
function toggleDarkMode() {
    // CSS color variables
    const rs = getComputedStyle(r);

    const colorNeutral = rs.getPropertyValue("--color-neutral");
    const colorNeutralContrast = rs.getPropertyValue(
        "--color-neutral-contrast"
    );
    const colorPrimary = rs.getPropertyValue("--color-primary");
    const colorPrimaryContrast = rs.getPropertyValue(
        "--color-primary-contrast"
    );
    const colorPrimaryAlpha = rs.getPropertyValue("--color-primary-alpha");
    const colorPrimaryContrastAlpha = rs.getPropertyValue(
        "--color-primary-contrast-alpha"
    );

    const colorSecondary = rs.getPropertyValue("--color-secondary");
    const colorSecondaryContrast = rs.getPropertyValue(
        "--color-secondary-contrast"
    );
    const colorAccent = rs.getPropertyValue("--color-accent");
    const colorAccentContrast = rs.getPropertyValue("--color-accent-contrast");
    const colorOverlayAlpha = rs.getPropertyValue("--color-overlay-alpha");
    const colorOverlayContrastAlpha = rs.getPropertyValue(
        "--color-overlay-contrast-alpha"
    );

    r.style.setProperty("--color-neutral", colorNeutralContrast);
    r.style.setProperty("--color-neutral-contrast", colorNeutral);
    r.style.setProperty("--color-primary", colorPrimaryContrast);
    r.style.setProperty("--color-primary-contrast", colorPrimary);
    r.style.setProperty("--color-primary-alpha", colorPrimaryContrastAlpha);
    r.style.setProperty("--color-primary-contrast-alpha", colorPrimaryAlpha);
    r.style.setProperty("--color-secondary", colorSecondaryContrast);
    r.style.setProperty("--color-secondary-contrast", colorSecondary);
    r.style.setProperty("--color-accent", colorAccentContrast);
    r.style.setProperty("--color-accent-contrast", colorAccent);
    r.style.setProperty("--color-overlay-alpha", colorOverlayContrastAlpha);
    r.style.setProperty("--color-overlay-contrast-alpha", colorOverlayAlpha);

    // Renderer background is changed to the updated neutral color
    const canvasColor =
        experience.renderer.convertColorString(colorNeutralContrast);

    experience.renderer.debugObject.clearColor = canvasColor;

    // Spheres and galaxy colors are changed based on Ambient Light intensity
    if (experience.world.ambientLight.intensity > 1) {
        experience.world.ambientLight.intensity = 0.01;
        experience.world.directionalLight.intensity = 0.25;
        experience.world.galaxyParameters.insideColor = "#222222";
        experience.world.galaxyParameters.outsideColor = "#203050";
        experience.world.generateGalaxy();
    } else {
        experience.world.ambientLight.intensity = 2.5;
        experience.world.directionalLight.intensity = 1.0;
        experience.world.galaxyParameters.insideColor = "#eeeeee";
        experience.world.galaxyParameters.outsideColor = "#575757";
        experience.world.generateGalaxy();
    }
}

// Dark Mode toggle is highlighted
darkModeToggle.addEventListener("click", () => {
    toggleDarkMode();
    nav.toggleHighlight(darkModeToggle);
    nav.resize();
});

// Resize function
function resize() {
    nav.resize();
    experience.resize();
}
window.addEventListener("resize", resize);

// Start getting animation frames
experience.update();
