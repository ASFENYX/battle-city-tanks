;(function(){
    'use strict'

    
    /* Загрузчик */
    class Loader {
        
        constructor(){
            /* Загрузки в очереди */
            this.loadOrder = {
                images: [],
                jsons: []
            }
            /* Загруженные ресурсы */
            this.resources ={
                 images: [],
                 jsons:[]
            }
        }
        /* Добавление изображения в очередь */
        addImage(name,src){
            this.loadOrder.images.push({name,src})
        }
        /* Добавление json-файла в очередь */
        addJson(name,adress){
            this.loadOrder.jsons.push({name,adress})
        }
        getImage(name) {
            
                return this.resources.images[name]
            
        }
        getJson(name){
            return this.resources.jsons[name]
            }
        /* Promise, что все файлы загрузились на клиент */
        load(callback) {
            
            /* массив Promise'ов (если изображение в нем, значит оно уже "загружено" )  */
            const promises = []  
            
            /* Проходимся по массиву изображений в очереди */
            for (const ImageData of this.loadOrder.images) {
                /* константа данных каждого элемента массива очереди с изображениями */
                const {name, src} = ImageData
                /* Загружаем изображение из очереди и получаем удачный Promise(о том,что оно "загружено") */
                const promise = Loader
                /* Promise загружено изображение с данным адрессом  или нет  */
                .loadImage(src)
                /* Удаление изображения из очереди, если прошлый Promise был удачным */
                .then(image =>{ 
                    this.resources.images[name] = image
                    /* Проверяем есть ли УЖЕ ЗАГРУЖЕННОЕ изображение в ОЧЕРЕДИ , и если есть, то удаляем из очереди */
                    if (this.loadOrder.images.includes(ImageData)){
                        /* Определяем под каким индексом это изображение в архиве */
                        const index = this.loadOrder.images.indexOf(ImageData)
                        /* Удаляем изображение из очереди */
                        this.loadOrder.images.splice(index,1) 
                    }
                })
                /* Добавляем удачный Promise в массив Promise'ов */
                promises.push(promise)

                
            }
            /* Проходимся по массиву json-файлов */
            for (const jsonData of this.loadOrder.jsons) {
                /* Данные каждого элемента из архива с json-файлами в очереди */
                const {name, adress} = jsonData
               /* Загружаем json-файл из очереди и получаем удачный Promise(о том,что он "загружен") */
               const promise = Loader
               /* Promise загружен ли json-файл с данным адрессом  или нет  */
               .loadJson(adress)
               /* Удаление json-файла из очереди, если прошлый Promise был удачным */
               .then(json =>{ 
                   this.resources.jsons[name] = json
                /* Проверяем есть ли УЖЕ ЗАГРУЖЕННЫЙ json-файл в ОЧЕРЕДИ , и если есть, то удаляем из очереди */
                   if (this.loadOrder.jsons.includes(jsonData)){
                       /* Определяем под каким индексом этот json-файл в архиве */
                       const index = this.loadOrder.jsons.indexOf(jsonData)
                       /* Удаляем json-файл из очереди */
                       this.loadOrder.jsons.splice(index,1) 
                   }
               })
               /* Добавляем удачный Promise в массив Promise'ов */
                promises.push(promise)

               
           }
           /* Promise о том, что все файлы загружены и отправка callback'а */
                Promise.all(promises).then(callback)
        }

        /* Статичный метод класса по загрузке изображений */
        static loadImage (src) {
            /* Возвращает Promise о том, что файл "загружен" */
            return new Promise((resolve, reject) => {
                /* Если Promise удачен */
                try{
                    /* Объявляем изображение */
                    const image = new Image
                    /* Возвращаем изображение в resolve после его подгрузки */
                    image.onload = () => resolve(image)
                    /* Присваиваем src путь до изображения */
                    image.src = src
    
                }
                /* Возвращаем ошибку , если что-то пошло не так */
                catch(err){
                    reject(err)
                }
            })
        }
        /* Статичный метод класса по загрузке изображений */
        static loadJson(adress){
            /* Возвращает Promise о том, что файл "загружен" */
            return new Promise((resolve,reject)=>{
                /* Если Promise удачен */
                /* Возвращает Promise о том, загружен ли файл под данным адресом */
                fetch(adress)
                /* Promise о том, является ли наш файл именно json-файлом */
                    .then(result => result.json())
                    /* Возвращаем удачный Promise */
                    .then(result => resolve(result))
                    /* Возвращаем ошибку , если что-то пошло не так */
                    .catch(err => reject(err))

            })
        }

    }
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Loader = Loader
})();