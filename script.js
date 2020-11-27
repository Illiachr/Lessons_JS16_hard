'use strict';

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "<i>Суббота</i>", "<i>Воскресенье</i>"];
    
const todayIndex = (6 + new Date().getDay()) % 7;
days[todayIndex] = `<b>${ days[todayIndex] }</b>`;

const nowDate = new Date().getDay();

document.body.insertAdjacentHTML(
    "beforeEnd", 
    `
    <h2>Задание</h2>
    <h3>Создать массив week и записать в него дни недели в виде строк</h3>
    <ul>
        <li>Вывести на экран все дни недели</li>
        <li>Каждый из них с новой строчки</li>
        <li>Выходные дни - курсивом</li>
        <li>Текущий день - жирным шрифтом(использовать объект даты)</li>
    </ul>
    <h2><i>Решение</i></h2>    
    ${days.join("<br>")}
    `);
    