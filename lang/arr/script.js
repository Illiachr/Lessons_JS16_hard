let lang = prompt('Enter your language (en / ru)', 'en');

const arrWeek = {
    'ru' : ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    'en' : ['monday', 'thuesday', 'wednesday', 'thurday', 'friday', 'saturday', 'sunday'],
};

alert (`${arrWeek[lang].join(', ')}`);

