import GUI from 'lil-gui'

export default class Debug
{
    constructor()
    {
        this.active = true;

        this.ui = new GUI()

        if(this.active)
        {
            this.ui.hide()
        }
    }
}