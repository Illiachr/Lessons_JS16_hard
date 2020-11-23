// Переменная lang может принимать 2 значения: 'ru' 'en'.
// Написать условия при котором в зависимости от значения lang будут выводится дни недели на русском или английском языке. Решите задачу
let lang = prompt('Enter your langauage (en / ru)', 'en');

const arrWeek = {
    'ru' : ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    'en' : ['monday', 'thuesday', 'wednesday', 'thurday', 'friday', 'saturday', 'sunday'],
};

alert (`${arrWeek[lang].join(', ')}`);

