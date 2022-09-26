import './portfolioLink.css'

export default class PortfolioLink
{
    constructor(title, link, img, desc)
    {
        this.a = document.createElement('article')

        // Add title
        const aTitle = document.createElement('h2')
        aTitle.innerHTML = title;

        // Add link
        const aLink = document.createElement('a')
        aLink.href = `http://${link}`;
        aLink.innerText = link;
        aLink.target = 'blank';

        // Add img
        const aImage = document.createElement('img')
        aImage.src = img;

        // Add desc
        const aDesc = document.createElement('p')
        aDesc.innerText = desc;

        this.a.appendChild(aImage)
        this.a.appendChild(aTitle)
        this.a.appendChild(aLink)
        this.a.appendChild(aDesc)

        return this.a;
    }
}