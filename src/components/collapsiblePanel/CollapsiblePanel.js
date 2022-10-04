import "./collapsiblePanel.css";

export default class CollapsiblePanel {
    constructor(title, ...contents) {
        this.s = document.createElement("section");
        this.s.classList.add("collapsible-panel");

        this.heading = document.createElement("h1");
        this.heading.innerHTML = title;

        this.s.appendChild(this.heading);

        this.container = document.createElement("div");

        this.s.appendChild(this.container);

        for (let i = 0; i < contents.length; i++) {
            this.container.appendChild(contents[i]);
        }

        this.heading.addEventListener("click", () => this.togglePanel());
        return this.s;
    }

    togglePanel() {
        // const articles = this.s.querySelectorAll('article')
        // // console.log(articles)

        // for(let i = 0; i < articles.length; i++)
        // {
        //     if(articles[i].classList.contains('panel-collapse'))
        //     {
        //         articles[i].classList.add('panel-expand')
        //         articles[i].classList.remove('panel-collapse')
        //     }
        //     else
        //     {
        //         articles[i].classList.add('panel-collapse')
        //         articles[i].classList.remove('panel-expand')
        //     }
        // }

        if (this.container.classList.contains("panel-collapse")) {
            this.container.classList.add("panel-expand");
            this.container.classList.remove("panel-collapse");
        } else {
            this.container.classList.add("panel-collapse");
            this.container.classList.remove("panel-expand");
        }
    }
}
