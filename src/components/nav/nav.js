import '../../../src/style.css'
import './nav.css'

import html from './nav.html'
import navMenuButtonStack from './menuListStack.svg?raw'
import navMenuButtonWheelX from './menuListWheelX.svg?raw'

export default function nav()
{
    const nav = {}
    
    const header = document.querySelector('header')
    header.innerHTML = html

    const body = document.querySelector('body')
    const navList = document.getElementById('nav-list')
    const navMenuButton = document.getElementById('nav-list-button')

    navMenuButton.innerHTML = navMenuButtonStack;

    function expandMenu()
    {
        navList.classList.add('nav-list-expand');
        navList.classList.remove('nav-list-collapse', 'nav-list-overlay')
    }

    function collapseMenu()
    {
        navList.classList.add('nav-list-collapse')
        navList.classList.remove('nav-list-overlay', 'nav-list-expand')
        body.style.overflow = 'auto'
        navMenuButton.innerHTML = navMenuButtonStack;
    }

    function overlayMenu()
    {
        navList.classList.add('nav-list-overlay')
        navList.classList.remove('nav-list-collapse', 'nav-list-expand')
        body.style.overflow = 'hidden'
        navMenuButton.innerHTML = navMenuButtonWheelX;
    }

    function toggleMenuOverlay()
    {
        if(navList.classList.contains('nav-list-collapse'))
        {
            overlayMenu();
        }
        else
        {
            collapseMenu();
        }
    }

    // Resize function to toggle top menu
    nav.resize = () =>
    {
        if(window.innerWidth >= 768)
        {
            expandMenu()
        }
        else
        {
            collapseMenu()
        }
    }
    nav.resize();

    navMenuButton.addEventListener('click', toggleMenuOverlay)

    return nav;
}

