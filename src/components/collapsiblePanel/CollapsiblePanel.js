import './collapsiblePanel.css'

export default class CollapsiblePanel
{
    constructor(title, ...contents)
    {
        this.section = document.createElement('section')

        const heading = document.createElement('h1');
        heading.innerHTML = title;

        this.section.appendChild(heading)

        for(let i = 0; i < contents.length; i++)
        {
            this.section.appendChild(contents[i])
        }

        return this.section;
    }

    expand()
    {
        
    }

    collapse()
    {

    }
}