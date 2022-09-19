import './style.css'
import html from './index.html'

function component(htmlStructure)
{
    const element = document.createElement('div')
    element.classList.add('container')
    element.innerHTML = htmlStructure

    return element;
}

const bodyHTML = component(html);
document.body.appendChild(bodyHTML);