'use strict';

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 
            'Суббота', 'Воскресенье'];

const addZero = (num) => {
    if (num > 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
};   

const declOfNum = (n, textForms) => {  
    n = Math.abs(n) % 100; 
    let n1 = n % 10;
    if (n > 10 && n < 20) { return textForms[2]; }
    if (n1 > 1 && n1 < 5) { return textForms[1]; }
    if (n1 === 1) { return textForms[0]; }
    return textForms[2];
};

const setTimer = (now, timeEnd = '1 january 2021') => {    
    const timeToEnd = new Date (timeEnd).getTime(),
        timeNow = now.getTime(),
        timeDiff = (timeToEnd - timeNow) / 1000,
        secondLeft = Math.floor(timeDiff % 60),
        minLeft = Math.floor((timeDiff / 60) % 60),
        hoursLeft = Math.floor((timeDiff / 60 / 60) % 24),
        daysLeft = Math.floor(timeDiff / 60 / 60 / 24);    
    return { timeNow, timeDiff, secondLeft, minLeft, hoursLeft, daysLeft };
};

const sayHello = (nowHours) => {
    const partOfday = ['утро', 'день', 'вечер', 'ночи'];

    return nowHours >= 4 && nowHours < 12 ? `Доброе ${partOfday[0]}` :
    nowHours >= 12 && nowHours < 16 ? `Добрый ${partOfday[1]}` :
    nowHours >= 16 && nowHours > 0 ?
    `Добрый ${partOfday[2]}` : `Доброй ${partOfday[3]}`;
};

const createElement = (mainSelector, tagElem = 'div', classElem = 'app-block', idElem = 'app') => {
    const app = document.querySelector(`.${mainSelector}`),
        elem = document.createElement(tagElem);
    elem.classList.add(classElem);
    elem.setAttribute('id', idElem);
    app.append(elem);
    return elem;    
};

const HeaderA = createElement('app', 'h2');

setInterval(() => {
    const date = new Date(),
        timer = setTimer(date, `1 january 2021`),
        daysToNewYear = timer.timeDiff > 0 ?
                        `${timer.daysLeft} ${declOfNum(timer.daysLeft, ['день', 'дня', 'дней'])}` :
                        `С Новым Годом!`,
        localTime = date.toLocaleTimeString('en-US'),
        formatTime = localTime.split(':')[0] < 10 ? `0${localTime}` : localTime;        
    HeaderA.innerHTML = `<i>
        ${sayHello(date.getHours())} <br>
        Сегодня: ${
        days[(6 + date.getDay()) % 7]
        } <br> ${
            formatTime
        } <br>
            До нового года осталось ${daysToNewYear}
        </i>`;    
}, 1000);