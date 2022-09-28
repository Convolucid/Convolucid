export default class Sizes
{
    constructor()
    {
        // Setup
        this.resize()
    }

    resize()
    {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        
        // Media query trigger for phone screens
        if(this.width < 786)
        {
            this.responsiveXS = true
        }
        else
        {
            this.responsiveXS = false
        }
    }
}