import './style.css'
import html from './index.html'
import Experience from './components/webgl/Experience.js'

import navComponent from './components/nav/nav.js'
import CollapsiblePanel from './components/collapsiblePanel/CollapsiblePanel'
import PortfolioLink from './components/portfolioLink/PortfolioLink'

import martialPathImg from './assets/martialpath.png'
import trainingWheelsImg from './assets/trainingwheels.png'
import oneironomiconImg from './assets/oneironomicon.png'
import ironPhoenixImg from './assets/ironphoenix.png'

function component(htmlStructure)
{
    const element = document.createElement('div')
    element.classList.add('container')
    element.innerHTML = htmlStructure

    return element;
}

const bodyHTML = component(html);
document.body.appendChild(bodyHTML);

const nav = navComponent();
const main = document.querySelector('main')
const experience = new Experience(
    document.querySelector('canvas.webgl'),
    main
)

const portfolioLink = document.getElementById('link-portfolio')
const resumeLink = document.getElementById('link-resume')

const portfolioPage = document.createElement('div')
const resumePage = document.createElement('div')
portfolioPage.classList.add('container')
resumePage.classList.add('container')

main.appendChild(portfolioPage)
main.appendChild(resumePage)




// Portfolio Page

const largeAppPanel = new CollapsiblePanel(
    'Apps and Websites',
    new PortfolioLink(
        'Martial Path', 'martial.convolucid.com', martialPathImg, 
        `A digital version of my kung fu school's rank curriculum, in which students complete challenges to earn new techniques, lessons, and sets.  The app demonstrates mobile-first responsive design with HTML, CSS, and Javascript.  Direct SVG manipulation, GSAP animation, and CSS transitions are utilized in menus and backgrounds. All artwork was created in Adobe Photoshop, Illustrator, and Indesign using original illustrations and stock images.`
    ),
    new PortfolioLink(
        'Training Wheels', 'wheels.convolucid.com', trainingWheelsImg, 
        `This site is a sort of rehearsal space for me to practice coding fundamentals, version control, and Webpack bundling.  After adding new features to the site I delete and rewrite it from scratch (using the old code as reference).  The most recent version has some light SVG animations on custom background illustrations.  The site's code is written in vanilla HTML, CSS, and Javascript, while the content is written in Markdown and imported with a Webpack plugin.`
    ),
    new PortfolioLink(
        'Oneironomicon', 'poetics.convolucid.com', oneironomiconImg, 
        `A showcase of WebGL and surrealist poetry.  The Oneironomicon is my playground for Three.js, Blender, and GLSL practice.  The site features custom 3D models and shaders with Javascript-triggered GSAP animations.  It also includes experiments with creative uses of HTML Canvas and the 2D API.`
    ),
    new PortfolioLink(
        'Iron Phoenix', 'ironphoenix.com', ironPhoenixImg, 
        `My first professional website, built for my kung fu school.  The site is built with MODX, an open source CMS similar to Wordpress.  Some of the more notable features include an auto-scrolling gallery and parallax image movement.`
    )
);

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




portfolioPage.appendChild(largeAppPanel)


const resumePanels = new CollapsiblePanel(
    'My Resume',
    new PortfolioLink(
        'Martial Path', 'martial.convolucid.com', martialPathImg, 
        `A digital version of my kung fu school's rank curriculum, in which students complete challenges to earn new techniques, lessons, and sets.  The app demonstrates mobile-first responsive design with HTML, CSS, and Javascript.  Direct SVG manipulation, GSAP animation, and CSS transitions are utilized in menus and backgrounds. All artwork was created in Adobe Photoshop, Illustrator, and Indesign using original illustrations and stock images.`
    )
)

resumePage.appendChild(resumePanels)



const mainPageArray = [
    portfolioPage,
    resumePage
]


// Resume Page
// const workHistoryPanel = new CollapsiblePanel()

// Display content functionality
function displayContent(content, contentArray)
{
    for(let i=0; i < contentArray.length; i++)
    {
        if(contentArray[i] == content)
        {
            contentArray[i].classList.remove('main-hidden')
        }
        else
        {
            contentArray[i].classList.add('main-hidden')
        }
    }
    resize();
}

displayContent(portfolioPage, mainPageArray)

portfolioLink.addEventListener('click', () => displayContent(portfolioPage, mainPageArray))
resumeLink.addEventListener('click', () => displayContent(resumePage, mainPageArray))



function resize()
{
    nav.resize()
    experience.resize()
}
window.addEventListener('resize', resize)

experience.update();