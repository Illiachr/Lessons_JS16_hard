let lang = prompt('Enter your language (en / ru)', 'en');
const weekRu = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    weekEn = ['monday', 'thuesday', 'wednesday', 'thurday', 'friday', 'saturday', 'sunday'];

if (lang === 'ru') alert (`${weekRu.join(', ')}`)
    else if (lang === 'en') alert (`${weekRu.join(', ')}`)
    else alert ('Вы ввели некорректный запрос');

