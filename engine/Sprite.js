;(function () {
    'use strict'

        class Sprite {

            constructor(texture,args = {}){
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
                //Присваиваем координаты данному экземпляру спрайта
                this.x = args.x || 0
                this.y = args.y || 0,
                // Анкор
                this.anchorX = args.anchorX || 0
                this.anchorY = args.anchorY || 0,
                // Присваиваем ширину и высоту данному экземпляру спрайта, по умолчанию равна ширине и высоте фрейма
                this.width = args.width || this.frame.width
                this.height =args.width || this.frame.height

                if(args.scale !== undefined){
                    this.setScale(args.scale)
                }
            }
            setScale(value){
                this.scaleX = value
                this.scaleY = value

            }
            get absoluteX(){
                return this.x - this.anchorX*this.width
            }
            set absoluteX(value){
                this.x= value + this.anchorX * this.width
                return value
            }
            get absoluteY(){
                return this.y - this.anchorY*this.height
                
            }
            set absoluteY(value){
                this.y= value + this.anchorY * this.height
                return value
                

            }

            get scaleX(){
                return this.width / this.frame.width
            }
            set scaleX(value){
                this.width = this.frame.width*value
                return value
            }
            get scaleY(){
                return this.height / this.frame.height
            }
            set scaleY(value){
                this.height = this.frame.height*value
                return value
            }
            //Отрисовываем изображение
            draw(canvas, context){
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
                    this.absoluteX,
                    this.absoluteY,
                    // Координаты ширины и высоты
                    this.width,
                    this.height

                )
            }
        }

        window.GameEngine = window.GameEngine || {}
        window.GameEngine.Sprite = Sprite

})();