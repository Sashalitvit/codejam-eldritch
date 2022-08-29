const body = document.querySelector('body');
const audio = new Audio()
let cardBox, mixBgAncients, textBlock, textBlockItem, mixDeckBlock, mixDeck
// console.log(body)
const bgAncientsArr = ['./img/Ancients/Azathoth.png', './img/Ancients/Cthulthu.png', './img/Ancients/IogSothoth.png', './img/Ancients/ShubNiggurath.png']
const levelGame = ['Очень лёгкий', 'Лёгкий', 'Средний', 'Высокий', 'Очень высокий']

body.style.backgroundImage = "url(./img/home.png)";
body.style.backgroundRepeat = 'no-repeat';
// создаём контейнер для отображения древних карт
function cardBoxCreate(){
    cardBox = document.createElement('div')
    body.append(cardBox)
    cardBox.classList.add('cardBox')
}
cardBoxCreate()
// создаём 4 древние карты
function cardAncientsCreate(){
    for(let i = 0; i < 4; i++){
        cardBox.append(document.createElement('div'))
    }
}

cardAncientsCreate()

const cardAncients = cardBox.querySelectorAll('div')
console.log(cardAncients)
// мешаем колоду древних карт, каждый раз при открытии страницы будут рандомноь отображаться
function mixBgAncientsArr(){
    mixBgAncients = bgAncientsArr.sort(()=>Math.random() - 0.5)
}

mixBgAncientsArr()

cardAncients.forEach((el, i) => {
   
    el.style.backgroundImage = `url(${mixBgAncients[i]})`
    el.classList.add('pasive')          
       
})
let pause = 0 //задержка времени
cardAncients.forEach(el =>{    
    setTimeout(()=>{             
        el.classList.remove('pasive')  
        console.log(pause)         
    }, `${pause += 700}`) 
})

// звук при нажатии
function soundClick(){
   
    audio.src ='./sound/Sound_click.mp3'
    audio.currentTime = 0;
    audio.play();
}
// эффекты при наведении на карту

cardAncients.forEach(el => el.addEventListener('mouseover', ()=>{
    el.classList.add('cardAncientsHover')
}))

cardAncients.forEach(el => el.addEventListener('mouseout', ()=>{   

    el.classList.remove('cardAncientsHover')   
}))

cardAncients.forEach(el => el.addEventListener('click', ()=>{
    el.classList.add('active')

    soundClick()
    removeCard()
}))

// удалить не нужные карты
function removeCard(){
    
    cardAncients.forEach(el =>{
        if(!el.classList.contains('active')){
            el.classList.add('pasive')         
        } 
    })
    //удаляем ненужные карты
    
    cardAncients.forEach(el =>{
            if(el.classList.contains('pasive')){
                el.remove()   
                el.style.cursor = 'auto'                   
            } 
    })       
    textBlockCreate()
}
// создание длока-контейнера для выбора уровня сложности
function textBlockCreate() {
    textBlock = document.createElement('div')
    cardBox.append(textBlock)
    textBlock.classList.add('textBlock')

    setTimeout (()=>{
        textBlockCreateItem()
    }, 1000)
} 

// создание надписей h2
function textBlockCreateItem(){
    for(let i = 0; i < 5; i++){
        textBlock.append(document.createElement('h2'))
    }
    textBlockItem = cardBox.querySelectorAll('h2')    
    textBlockItem.forEach(el => el.classList.add('textBlockItem'))
    let time = 0 //задержка времени
    textBlockItem.forEach(el => {       
        setTimeout(()=>{           
            el.classList.add('textBlockItemVis')
            console.log(time)
        }, `${time += 500}`)        
       
    })      
    
    checkHeight()
} 
// получаем высоту h2

function checkHeight(){
    console.log('!')
    let b = textBlockItem[0].clientHeight
      console.log(b)
    writeTextBlockItem(b)
}

function writeTextBlockItem(b){
    textBlockItem.forEach((el, i)=>{
        el.style.lineHeight =  `${b}px`        
        el.textContent = levelGame[i]
    })

    addSoundTextBlockItem()
}

function addSoundTextBlockItem(){
    textBlockItem.forEach((el, i) => {

        el.addEventListener('mouseover', ()=>{
            if (el.classList.contains('textBlockItemVis')){
                el.classList.add('textBlockItemVishover')
            } 
            
        })
        el.addEventListener('mouseout', ()=>{
             
            el.classList.remove('textBlockItemVishover')         
        })
        el.addEventListener('click', ()=>{

            soundClick() 
                      
            textBlockItem.forEach((el, i) =>{
               
                if (!el.classList.contains('textBlockItemVishover')){
                   
                    el.classList.remove('textBlockItem')
                    el.classList.remove('textBlockItemVishover')  
                    el.classList.remove('textBlockItemVis') 
                    el.style.opacity = '0'
                    el.style.visibility = 'hidden' 
                                  
                } else {
                    
                    mixDeckCreate(i)
                }
            })
        })
    })  
}
// создание блока, шде будет надпись "замешать колоду"
function mixDeckCreate(i){    
    mixDeckBlock = document.createElement('div')
    cardBox.append(mixDeckBlock)
    mixDeckBlock.classList.add('textBlock')
    // создание надписей h2
    for(let i = 0; i < 5; i++){
        mixDeckBlock.append(document.createElement('h2'))
    }
    mixDeck = mixDeckBlock.querySelectorAll('h2')  
    console.log(mixDeck)  
    mixDeck.forEach(el => el.classList.add('textBlockItem'))
    setTimeout(()=>{
        mixDeck[i].classList.add('textBlockItemVis')
    }, 500)
    
    let b = textBlockItem[i].clientHeight
    mixDeck.forEach((el, i)=>{
        el.style.lineHeight =  `${b}px`        
        el.textContent = "Замешать колоду"
    })

    mixDeck[i].addEventListener('mouseover', ()=>{
        
        mixDeck[i].classList.toggle('textBlockItemVishover')
    })
    mixDeck[i].addEventListener('mouseout', ()=>{
        mixDeck[i].classList.toggle('textBlockItemVishover')
    })
}
// контроль высоты блока
function checkHeightAbsolut(i){
    console.log('!!!')
}














