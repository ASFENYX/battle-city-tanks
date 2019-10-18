;(function () {
    'use strict'

        class Sprite extends GameEngine.DisplayObject {

            constructor(texture,args = {}){
                super(args)
                // Присваиваем изображение(текстуру)
                this.texture = texture
                const frame = args.frame || {}
                // Создаем фрейм, который хотим отрисовать и присваиваем его значения
                this.frame = {
                    // Координаты х и у фрейма
                    x:frame.x || 0,
                    y:frame.y || 0,
                    // ширина и высота фрейма по умолчанию равна ширине и высоте изображения(текстуры)
                    width: frame.width || texture.width,
                    height: frame.height || texture.height

                }
               if(args.width === undefined){
                    this.width = this.frame.width
               }
               if(args.height === undefined){
                this.height = this.frame.height
           }
                
            }
           
            

          
            //Отрисовываем изображение
            draw(canvas, context){
                context.save()
            
                context.translate(this.x,this.y)
                context.rotate(-this.rotation)
                context.scale(this.scaleX,this.scaleY)
                context.drawImage(
                    // Передаем наше изображение
                    this.texture,

                    // Координаты участка изображения который нужно отрисовать
                    // Координаты фрейма, который нужно отрисовать
                    this.frame.x,
                    this.frame.y,
                    // Ширина и высота фрейма ,который нужно отрисовать
                    this.frame.width,
                    this.frame.height, 


                    // Координаты участка канваса, на котором нужно отобразить изображение  
                    // Координаты х и у
                    this.absoluteX-this.x,
                    this.absoluteY-this.y,
                    // Координаты ширины и высоты
                    this.width ,
                    this.height

                )
                context.restore()

            }
        }

        window.GameEngine = window.GameEngine || {}
        window.GameEngine.Sprite = Sprite

})();