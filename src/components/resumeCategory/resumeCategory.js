import "../../../src/style.css";
import "./resumeCategory.css";

export default class ResumeCategory {
    constructor(html) {
        // Category section
        this.s = document.createElement("section");
        this.s.classList.add("resume-category");

        // Category header
        this.s.innerHTML = html;

        return this.s;
    }
}
