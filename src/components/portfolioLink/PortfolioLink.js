import "../../../src/style.css";
import "./portfolioLink.css";

export default class PortfolioLink {
    constructor(title, link, img, desc) {
        this.a = document.createElement("article");
        this.a.classList.add("portfolio-item");
        // Make entire article a two-part flexbox between image and content
        // Make content a flexbox

        const aSection = document.createElement("section");

        // Add title
        const aTitle = document.createElement("h2");
        aTitle.innerHTML = title;

        // Add link
        const aLink = document.createElement("a");
        aLink.href = `http://${link}`;
        aLink.innerText = link;
        aLink.target = "_blank";
        // Make link a certain size

        // Add img
        const aImage = document.createElement("img");
        aImage.src = img;
        aImage.classList.add("portfolio-img");

        // Add desc
        const aDesc = document.createElement("p");
        aDesc.innerText = desc;

        this.a.appendChild(aImage);
        this.a.appendChild(aSection);
        aSection.appendChild(aTitle);
        aSection.appendChild(aLink);
        aSection.appendChild(aDesc);

        this.createLink(aTitle, link);
        this.createLink(aImage, link);

        return this.a;
    }

    createLink(element, link) {
        element.addEventListener("click", () => {
            window.open(`http://${link}`, "_blank");
        });
    }
}
