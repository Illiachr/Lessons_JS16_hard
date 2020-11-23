let lang = prompt('Enter your langauage (en / ru)', 'en');
const weekRu = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    weekEn = ['monday', 'thuesday', 'wednesday', 'thurday', 'friday', 'saturday', 'sunday'];

if (lang === 'ru') alert (`${weekRu.join(', ')}`)
    else alert (`${weekEn.join(', ')}`);

