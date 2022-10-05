import "./collapsiblePanel.css";

export default class CollapsiblePanel {
    constructor(title, ...contents) {
        this.s = document.createElement("section");
        this.s.classList.add("collapsible-panel");

        this.header = document.createElement('header');
        this.headerName = document.createElement("h1");
        this.headerName.innerHTML = title;

        this.s.appendChild(this.header);
        this.header.appendChild(this.headerName);

        this.container = document.createElement("div");

        this.s.appendChild(this.container);

        for (let i = 0; i < contents.length; i++) {
            this.container.appendChild(contents[i]);
        }

        this.headerName.addEventListener("click", () => this.togglePanel());
        return this.s;
    }

    togglePanel() {
        if (this.container.classList.contains("panel-collapse")) {
            this.container.classList.replace("panel-collapse", "panel-expand");
        } else if(this.container.classList.contains("panel-expand")) {
            this.container.classList.replace("panel-expand", "panel-collapse");
        } else {
            this.container.classList.add("panel-collapse")
        }
    }
}
