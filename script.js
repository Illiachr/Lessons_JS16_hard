'use strict';

const strTrim = ((str) => {
    if (typeof(str) === 'string') {
        return str.length > 30 ? str.trim().substring(0, 30) + '...' : str.trim();
    } else {return 'Данные, которые вы передали не являются строкой';}
});

let expr = prompt('Введите строку',
                '           Привет, давай потестим новую фичу, будет весело!!!    ');

console.log (expr.length);
console.log (strTrim (expr));
console.log (strTrim(expr).length);


