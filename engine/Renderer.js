;(function(){
    'use strict'

    class Renderer {
        constructor(args = {}){
            
            // Создаем канвас
            this.canvas = document.createElement('canvas')
            
            // Получаем context канваса
            this.context = this.canvas.getContext('2d')
            
            // Запоминаем цвет бэкграунда
            this.background = args.background || 'black'
            
            // Задаем ширину и длину канвасу
            this.canvas.width = args.width || 50
            this.canvas.height = args.height || 50
            
            // Запоминаем функцию update()
            this.update = args.update || (() => {})
            // Создаем и присваиваем контейнер
            this.stage = new GameEngine.Container()
            // Планируем перерисовку на следующем кадре
            requestAnimationFrame(timestamp => this.tick(timestamp))
        }

        get displayObjects () {
            return _getDisplayObjects(this.stage)
            function _getDisplayObjects (container, result = []) {
                for (const displayObject of container.displayObjects){
                    if(displayObject instanceof GameEngine.Container){
                        _getDisplayObjects(displayObject, result)
                    }

                    else {
                        result.push(displayObject)
                    }
                }
                return result
            }
        }
        
        tick(timestamp){
            // Вызываем обновление канваса
            this.update(timestamp)
            // Очищаем канвас
            this.clear()
            // Вызываем функцию рендера
            this.render()
            //Рекурсия tick
            requestAnimationFrame(timestamp => this.tick(timestamp))
        }
        
        // Функция рендера
        render(){
            this.stage.draw(this.canvas,this.context)
        }

        // Функция отрисовки
        // draw(callback){
        //     callback(this.canvas,this.context)
        // }
        // Очищаем канвас
        clear(){
            
                this.context.fillStyle = this.background
                this.context.beginPath()
                this.context.rect(0,0,this.canvas.width,this.canvas.height)
                this.context.fill()
            
        }
    }




    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Renderer = Renderer
})();