import "./style.css";
import html from "./index.html";
import Experience from "./components/webgl/Experience.js";

import navComponent from "./components/nav/nav.js";
import CollapsiblePanel from "./components/collapsiblePanel/CollapsiblePanel.js";
import PortfolioLink from "./components/portfolioLink/PortfolioLink.js";

import ResumeCategory from "./components/resumeCategory/resumeCategory.js";
import resumePDF from './assets/2022.09_Resume.pdf'
import resumeHeadingHTML from './components/resumeCategory/resumeCategories/resumeHeading.html'
import resumeWorkExperience from "./components/resumeCategory/resumeCategories/workExperience.html";
import resumeRecentProjects from "./components/resumeCategory/resumeCategories/recentProjects.html";
import resumePortfolio from "./components/resumeCategory/resumeCategories/portfolio.html";
import resumeEducation from "./components/resumeCategory/resumeCategories/education.html";
import resumeSkills from "./components/resumeCategory/resumeCategories/skills.html";

import martialPathImg from "./assets/martialpath.png";
import trainingWheelsImg from "./assets/trainingwheels.png";
import oneironomiconImg from "./assets/oneironomicon.png";
import ironPhoenixImg from "./assets/ironphoenix.png";

function component(htmlStructure) {
    const element = document.createElement("div");
    element.classList.add("container");
    element.innerHTML = htmlStructure;

    return element;
}

const bodyHTML = component(html);
document.body.appendChild(bodyHTML);

const r = document.querySelector(':root');

const nav = navComponent();
const main = document.querySelector("main");
const canvas = document.querySelector("canvas.webgl")

const navLogo = document.getElementById("nav-logo");
const navTitle = document.getElementById("nav-title");
const portfolioLink = document.getElementById("link-portfolio");
const resumeLink = document.getElementById("link-resume");
const webglControlToggle = document.getElementById('toggle-webgl-controls')
const darkModeToggle = document.getElementById('toggle-dark-mode')

const portfolioPage = document.createElement("div");
const resumePage = document.createElement("div");
portfolioPage.classList.add("container");
resumePage.classList.add("container");

main.appendChild(portfolioPage);
main.appendChild(resumePage);

// Portfolio Page

const portFolioIntro = new ResumeCategory(
    `Hello!  I am Stephen Roberts, a front-end developer and artist working toward a career in creative coding.  I'm especially interested in 3D graphics, data visualization, user interfaces, and game development.  Welcome to my portfolio.`
);
portfolioPage.appendChild(portFolioIntro);

const largeAppPanel = new CollapsiblePanel(
    "Apps and Websites",
    new PortfolioLink(
        "Martial Path",
        "martial.convolucid.com",
        martialPathImg,
        `A digital version of my kung fu school's rank curriculum, in which students complete challenges to earn new techniques, lessons, and sets.  The app demonstrates mobile-first responsive design with HTML, CSS, and Javascript.  Direct SVG manipulation, GSAP animation, and CSS transitions are utilized in menus and backgrounds. All artwork was created in Adobe Photoshop, Illustrator, and Indesign using original illustrations and stock images.`
    ),
    new PortfolioLink(
        "Training Wheels",
        "wheels.convolucid.com",
        trainingWheelsImg,
        `This site is a sort of rehearsal space for me to practice coding fundamentals, version control, and Webpack bundling.  After adding new features to the site I delete and rewrite it from scratch (using the old code as reference).  The most recent version has some light SVG animations on custom background illustrations.  The site's code is written in vanilla HTML, CSS, and Javascript, while the content is written in Markdown and imported with a Webpack plugin.`
    ),
    new PortfolioLink(
        "Oneironomicon",
        "poetics.convolucid.com",
        oneironomiconImg,
        `A showcase of WebGL and surrealist poetry.  The Oneironomicon is my playground for Three.js, Blender, and GLSL practice.  The site features custom 3D models and shaders with Javascript-triggered GSAP animations.  It also includes experiments with creative uses of HTML Canvas and the 2D API.`
    ),
    new PortfolioLink(
        "Iron Phoenix",
        "ironphoenix.com",
        ironPhoenixImg,
        `My first professional website, built for my kung fu school.  The site is built with MODX, an open source CMS similar to Wordpress.  Some of the more notable features include an auto-scrolling gallery and parallax image movement.`
    )
);

const smallAppPanel = new CollapsiblePanel(
    "Small Projects and Experiments",
    new PortfolioLink(
        "Ocean",
        "ocean.convolucid.com",
        martialPathImg,
        `A Three.js scene using fragment and vertex shaders.  The uniforms are updated on an animation cycle to create a moving texture like a churning sea.`
    ),
)
// const smallAppPanel = new CollapsiblePanel(
//     new PortfolioLink("TWWG"),
//     new PortfolioLink("Vertexture"),
//     new PortfolioLink("Mountain Maze"),
//     new PortfolioLink("Ocean")
// );

// const galleryPanel = new CollapsiblePanel(
//     new PortfolioImage("Martial Path"),
//     new PortfolioImage("Iron Phoenix Posters"),
//     new PortfolioImage("Sketchbook"),
//     new PortfolioImage("Green Mountains")
// )

portfolioPage.appendChild(largeAppPanel);
portfolioPage.appendChild(smallAppPanel);

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

const resumeDownloadPDF = document.getElementById('resume-pdf')
resumeDownloadPDF.href = resumePDF

const mainPageArray = [portfolioPage, resumePage];

const experience = new Experience(canvas, canvas);

// Display content functionality
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
displayContent(portfolioPage, mainPageArray);

navLogo.addEventListener("click", () =>
    displayContent(portfolioPage, mainPageArray)
);
navTitle.addEventListener("click", () =>
    displayContent(portfolioPage, mainPageArray)
);
portfolioLink.addEventListener("click", () =>
    displayContent(portfolioPage, mainPageArray)
);
resumeLink.addEventListener("click", () =>
    displayContent(resumePage, mainPageArray)
);

// Toggle functions for 3D control and dark mode
function toggleWebGLControl() {
    const zIndex = getComputedStyle(canvas).getPropertyValue('--z-webgl')
    if(zIndex == -2){
        canvas.style.setProperty('--z-webgl', 1)
    }
    else {
        canvas.style.setProperty('--z-webgl', -2)
    }
    console.log(zIndex)
}
webglControlToggle.addEventListener("click", () => {
    toggleWebGLControl();
    nav.toggleHighlight(webglControlToggle);
});

function toggleDarkMode() {
    const rs = getComputedStyle(r);

    const colorNeutral = rs.getPropertyValue('--color-neutral')
    const colorNeutralContrast = rs.getPropertyValue('--color-neutral-contrast')
    const colorPrimary = rs.getPropertyValue('--color-primary')
    const colorPrimaryContrast = rs.getPropertyValue('--color-primary-contrast')

    const colorSecondary = rs.getPropertyValue('--color-secondary')
    const colorSecondaryContrast = rs.getPropertyValue('--color-secondary-contrast')
    const colorNeutralAlpha = rs.getPropertyValue('--color-neutral-alpha')
    const colorOverlayAlpha = rs.getPropertyValue('--color-overlay-alpha')
    
    r.style.setProperty('--color-neutral', colorNeutralContrast)
    r.style.setProperty('--color-neutral-contrast', colorNeutral)
    r.style.setProperty('--color-primary', colorPrimaryContrast)
    r.style.setProperty('--color-primary-contrast', colorPrimary)
    r.style.setProperty('--color-secondary', colorSecondaryContrast)
    r.style.setProperty('--color-secondary-contrast', colorSecondary)

    const canvasColor = experience.renderer.convertColorString(colorNeutralContrast)

    experience.renderer.debugObject.clearColor = canvasColor;

}

darkModeToggle.addEventListener('click', () => {
    toggleDarkMode();
    nav.toggleHighlight(darkModeToggle);
})


function resize() {
    nav.resize();
    experience.resize();
}
window.addEventListener("resize", resize);

experience.update();
