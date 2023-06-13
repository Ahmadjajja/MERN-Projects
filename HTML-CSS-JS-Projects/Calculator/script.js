let screen = document.getElementById('screen');
let buttons = document.querySelectorAll('button');
let screenValue = ''; 
var numberingCounter = 1;
var dotCounter = 0;
for (item of buttons) {
   item.addEventListener('click',(e)=>{  // Arrow Function Used Here
        buttonText = e.target.innerText;   // Can we use here innerHTML instead of innerText
        if (buttonText === '=') {
            screen.value = eval(screenValue);
            counter = 0;
        } else if (buttonText === 'C') {
            screenValue = "";
            screen.value = screenValue;
            counter = 0;
        } else if (buttonText == '*' || buttonText == 'x' || buttonText == '-' || buttonText == '+' || buttonText == '%' || buttonText == '/') {
            if (screen.value.charAt(screen.value.length-1) == '*' || screen.value.charAt(screen.value.length-1) == 'x' || screen.value.charAt(screen.value.length-1) == '-' || screen.value.charAt(screen.value.length-1) == '+' || screen.value.charAt(screen.value.length-1) == '%' || screen.value.charAt(screen.value.length-1) == '/') {
                screenValue = screenValue.substring(0,screen.value.length-1);
                console.log(screen.value.length-2)
                console.log(screenValue);
                if (buttonText == 'x') {
                    buttonText = '*';
                }
                screenValue += buttonText;
                screen.value = screenValue;

            } else {
                if (buttonText == 'x') {
                    buttonText = '*';
                }
                screenValue += buttonText;
                screen.value = screenValue;
            }
            // counter++;
        } else if (buttonText == "(" || buttonText == ")" ) {
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "." && dotCounter === 0) {
            screenValue += buttonText;
            screen.value = screenValue;
            dotCounter++;
        }
        for (let index = 0; index < 10; index++) {
            if (buttonText === index.toString() ) {
                screenValue += buttonText;
                screen.value = screenValue;
                numberingCounter = 0;
            }
        }
   }) 
}
console.log(screen.value);
backspace.onclick = function () {
    screenValue = screenValue.substring(0,screenValue.length-1);
    screen.value = screenValue;
}
// screen.value.charAt(screen.value.length-1) !== 'x' || screen.value.charAt(screen.value.length-1) !== '-' || screen.value.charAt(screen.value.length-1) !== '+' || screen.value.charAt(screen.value.length-1) !== '%' || screen.value.charAt(screen.value.length-1) !== '/' || screen.value.charAt(screen.value.length-1) !== '.'