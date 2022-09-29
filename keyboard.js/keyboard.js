let keyboard = {
    key: ['1','2','3','4','5','6','7','8','9','backspace'
       ,'q','w','e','r','t','y','u','i','o','p',
        'keyboard_capslock','a','s','d','f','g','h','j','k','l','done',
        'keyboard_return','z','x','c','v','b','n','m',
        'space'
    ],
    div: {
        lock : false,
        keyboardDiv: document.createElement('div'),
        key: null,
        break: '<br>',
        textbox: document.querySelector('textarea')
    },
    keyAndKeyboardGenerator(){
        keyboard.div.keyboardDiv.classList.add('keyboard', 'visibility')
        //set the class of the keyboard
        keyboard.key.forEach((keys)=>{
            //loop through the keys
            keyboard.div.key = document.createElement('div')
            let currentKey = keyboard.div.key 
            let condition = ['backspace', 'keyboard_return', 'keyboard_capslock', 'space'].indexOf(keys) !== -1
            let divForIcon = ()=>{
                return `<i class="material-icons">${keys}</i>`
            }
            if(condition){
                //condition checks if its a function key or not
                keyboard.div.key.innerHTML = divForIcon()
                keyboard.div.keyboardDiv.insertAdjacentHTML('beforeend', keyboard.div.break)
                switch (keys) {
                    case 'backspace':
                        keyboard.div.key.addEventListener('click', ()=>this.functionalityBackspace())
                        keyboard.div.key.classList.add('meduim')
                        break;
                    case 'space':
                        keyboard.div.key.addEventListener('click', ()=>this.functionalitySpace())
                        keyboard.div.key.classList.add('large')
                        break;
                    case 'keyboard_capslock':
                        keyboard.div.key.addEventListener('click', ()=>this.functionalityUppercase(currentKey))
                        keyboard.div.key.classList.add('key--activatable', 'meduim')
                    break;
                    case 'keyboard_return':
                        keyboard.div.key.addEventListener('click', ()=>this.functionalityTab(keys))
                        keyboard.div.key.classList.add('meduim')
                    break;
                }
            }else{
                //not a function key
                switch (keys) {
                    case 'done':
                        keyboard.div.key.innerHTML = divForIcon()
                        keyboard.div.key.addEventListener('click', ()=>this.close())
                        keyboard.div.key.classList.add('small')
                        break;
                    default: 
                        keyboard.div.key.addEventListener('click', ()=>this.functionalityClick(keys))
                        keyboard.div.key.innerText = keys
                        break;
                }
                
            }
            keyboard.div.key.classList.add('key')
            keyboard.div.keyboardDiv.appendChild(keyboard.div.key)
            // puts keysinboard inside keyboardDiv
        })
        document.body.appendChild(keyboard.div.keyboardDiv)
        this.open()
    },
    open(){
        keyboard.div.textbox.addEventListener('focus', ()=>{
            keyboard.div.keyboardDiv.classList.remove('visibility')
        })
    },
    close(){
        keyboard.div.keyboardDiv.classList.add('visibility')

    },
    functionalityClick(key){
        keyboard.div.textbox.value += this.div.lock? key.toUpperCase(): key.toLowerCase()
    },
    functionalityBackspace(){
        keyboard.div.textbox.value = keyboard.div.textbox.value.slice(0, keyboard.div.textbox.value.length-1)
    },
    functionalitySpace(){
        keyboard.div.textbox.value += ' ' 
    },
    functionalityUppercase(key){
        this.div.lock = !this.div.lock
        if (this.div.lock) {
            key.classList.remove('key--activatable')
            key.classList.add('key--active')
        }else{
            key.classList.add('key--activatable')
            key.classList.remove('key--active') 
        }
        // this.div.lock ? : 
        // !this.div.lock ? : 
    },
    functionalityTab(){
        keyboard.div.textbox.value += '\n'
    }
}

window.onload=()=>{
    keyboard.keyAndKeyboardGenerator()
}