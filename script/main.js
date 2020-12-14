window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const createElement = (tagElem = 'div', classElem = 'app-block', idElem = 'app', mainSelector = 'app') => {
        const app = document.querySelector(`.${mainSelector}`),
            elem = document.createElement(tagElem);
        elem.classList.add(classElem);
        elem.setAttribute('id', idElem);
        app.append(elem);
        return elem;   
    };

    const userInput = createElement('input', 'text-input', 'user-text'),
        textBlock = createElement('p');
    userInput.setAttribute('type', 'text');
});