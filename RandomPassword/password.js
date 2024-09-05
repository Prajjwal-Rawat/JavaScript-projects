const showPassword = document.querySelector('#password');
const eye = document.querySelector('.eyeToggle');
const copyIcon = document.querySelector('.copyIcon');
const lengthCnt = document.querySelector('#LenghtCnt');
const slider = document.querySelector('.slider');
const indicator = document.querySelector('.indicator');
const generateBtn = document.querySelector('.generateBtn');
const uppercasesCheck = document.querySelector('#UpperCase');
const lowercasesCheck = document.querySelector('#LowerCase');
const numberCheck =  document.querySelector('#Numbers');
const symbolCheck = document.querySelector('#Symbols');
const copyText = document.querySelector('.copytext');
const hoverEffect = document.querySelector('.hoverEffect');
const allCheckbox = document.querySelectorAll('.check-box');

const symbols = '@#%^&*!$?."-/~<>,:;'

let password = '';
let checkCount = 0;

let sliderCount = 10;
HandleSlider();

slider.addEventListener('input', (e) => {
  sliderCount = e.target.value;                // e.target.value ki jgh slider.value bhi likh skte the 
  HandleSlider();  
})

function HandleSlider(){
    lengthCnt.innerHTML = sliderCount;
    slider.value = sliderCount;
}

function getRandomInteger(min, max){                 // to fetch random numbers, symbols, uppercases, lowecases
   return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumber(){
    return getRandomInteger(0,9);                        // so i want to give only 1 number to the password so that's why 0 to 9 single digit number
}

function getRandomUppercase(){
    return String.fromCharCode(getRandomInteger(65,90));
}

function getRandomLowercase(){
    return String.fromCharCode(getRandomInteger(97, 122));
}

function getRandomSymbol(){
    const randomnum = getRandomInteger(0, symbols.length);
    return symbols.charAt(randomnum);
}

function indicatorColor(color){
    indicator.style.background = color;
    indicator.style.boxShadow = `1px 1px 15px 2px ${color}`;
}

function checkStrength(){
    if(uppercasesCheck.checked && lowercasesCheck.checked && numberCheck.checked && symbolCheck.checked && slider.value >= 8){
        indicatorColor('#0f0');
    }else if(uppercasesCheck.checked && lowercasesCheck.checked && numberCheck.checked && slider.value >= 6 || lowercasesCheck.checked && numberCheck.checked 
        && symbolCheck.checked && slider.value >= 6 || lowercasesCheck.checked && symbolCheck.checked && uppercasesCheck.checked && slider.value >= 6 || symbolCheck.checked &&
        numberCheck.checked && uppercasesCheck.checked && slider.value >= 6 ){
        indicatorColor('#ff0');
    }else{
        indicatorColor('#f00');
    }
}


copyIcon.addEventListener('click', copyLogic);

async function copyLogic(){
    try{
        await navigator.clipboard.writeText(showPassword.value);
        hoverEffect.classList.remove('hoverEffect');
        copyText.style.display = 'block'
    }catch(e){
        copyText.innerHTML = 'failed';
    }

    setTimeout(() => {
        copyText.style.display = 'none';
        hoverEffect.classList.add('hoverEffect');
     }, 2000);
}


eye.addEventListener('click', eyeToggle);

function eyeToggle(){
    if(showPassword.type === 'password'){
        showPassword.type = 'text';
        eye.innerHTML = '🙈';
    }else{
        showPassword.type = 'password';
        eye.innerHTML = '👁️';
    }
}


function handleCheckbox(){
    checkCount = 0;

    allCheckbox.forEach((checkBox) =>{
        if(checkBox.checked){
            checkCount++;
        }
    })

    if(checkCount > sliderCount){
        sliderCount = checkCount;
        HandleSlider();
    }
}


allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckbox);
})




function shufflePass(password){       //applying Fisher-Yates (Knuth) shuffle algorithm

    //change this password string into array 
    let arrpass = password.split('');

    for(let i = arrpass.length -1; i > 0; i--){
        let ranindex = Math.floor(Math.random() * (i + 1));

        //swap
        let temp  = arrpass[i];
        
        arrpass[i] = arrpass[ranindex];
        arrpass[ranindex] = temp;
    }

    return arrpass.join('');
}




function generatePassword(){
    if(checkCount <= 0){
        return;
    }

    if(checkCount > sliderCount){
        sliderCount = checkCount;
        HandleSlider();
    }

    password = '';

    let passArr = [];

    if(uppercasesCheck.checked){
        passArr.push(getRandomUppercase)
    }

    if(lowercasesCheck.checked){
        passArr.push(getRandomLowercase)
    }

    if(numberCheck.checked){
        passArr.push(getRandomNumber)
    }

    if(symbolCheck.checked){
        passArr.push(getRandomSymbol)
    }

    //compulsory checkbox characters

    passArr.forEach((foo) => {
        password += foo();
    })
    

    while(password.length < sliderCount){
        let rndoIndex = getRandomInteger(0, passArr.length);
        password += passArr[rndoIndex]();
    }

    password =  shufflePass(password);

    showPassword.value = password;

    // indicator strength
    checkStrength();

}


generateBtn.addEventListener('click', () => {
    generatePassword();
})
