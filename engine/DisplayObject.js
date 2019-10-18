;(function(){
'use strict'
// Display который нам нужно отобразить
class DisplayObject {
    constructor(args = {}){
        
        this.x = args.x || 0
        this.y = args.y || 0

        this.width = args.width || 0
        this.height = args.height || 0


    }

    draw(){}
}

window.GameEngine = window.GameEngine || {}
    window.GameEngine.DisplayObject = DisplayObject
})();