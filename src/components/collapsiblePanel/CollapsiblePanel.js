import './collapsiblePanel.css'

export default class CollapsiblePanel
{
    constructor(title, ...contents)
    {
        this.s = document.createElement('section')
        this.s.classList.add('collapsible-panel')

        const heading = document.createElement('h1');
        heading.innerHTML = title;

        this.s.appendChild(heading)

        for(let i = 0; i < contents.length; i++)
        {
            this.s.appendChild(contents[i])
        }

        return this.s;
    }

    expand()
    {
        
    }

    collapse()
    {

    }
}