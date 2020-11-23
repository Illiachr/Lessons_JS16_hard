let lang = prompt('Enter your langauage (en / ru)', 'en');
const weekRu = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    weekEn = ['monday', 'thuesday', 'wednesday', 'thurday', 'friday', 'saturday', 'sunday'];
switch (lang) {
    case 'ru':
        alert (`${weekRu.join(', ')}`);
        break;
    case 'en':
        alert (`${weekEn.join(', ')}`);
        break;
};

