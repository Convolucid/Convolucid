import './style.css'
import html from './index.html'

import navComponent from './components/nav/nav.js'

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

function resize()
{
    nav.resize()
}
window.addEventListener('resize', resize)