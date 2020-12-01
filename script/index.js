'use strict';

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", 
            "Суббота", "Воскресенье"];

const month = ["января", "февраля", "марта", "апреля", 
            "мая", "июня", "июля", "августа",
            "сентября", "октября", "ноября", "декабря"];    

function addZero(num){
    if (num > 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
}   

function declOfNum(n, textForms) {  
    n = Math.abs(n) % 100; 
    let n1 = n % 10;
    if (n > 10 && n < 20) { return textForms[2]; }
    if (n1 > 1 && n1 < 5) { return textForms[1]; }
    if (n1 === 1) { return textForms[0]; }
    return textForms[2];
}

const app = document.querySelector('.app'),
    HeaderA = document.createElement('h2'),
    HeaderB = document.createElement('h2');
app.append(HeaderA, HeaderB);

setInterval(() => {
    const date = new Date();
    HeaderA.textContent = `Сегодня ${
        days[(6 + date.getDay()) % 7]
        }, ${
                date.getDay()
            } ${
                month[date.getMonth()]
            } ${
                date.getFullYear()
            } года, ${
                date.getHours()
            } ${
                declOfNum(date.getHours(), ['час', 'часа', 'часов'])
            } ${
                date.getMinutes()
            } ${
                declOfNum(date.getHours(), ['минута', 'минуты', 'минут'])
            } ${
                date.getSeconds()
            } ${declOfNum(date.getSeconds(), ['секунда', 'секунды', 'секунд'])}`;

    HeaderB.textContent = `${
                addZero(date.getDate())
            }.${
                addZero(date.getMonth() + 1)
            }.${
                date.getFullYear()
            } - ${ 
                addZero(date.getHours())
            }:${
                addZero(date.getMinutes())
            }:${
                addZero(date.getSeconds())
                }`;
}, 1000);