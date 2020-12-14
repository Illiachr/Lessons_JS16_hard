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
    userInput.setAttribute('placeholder', 'Введите текст...')

    function debounce (handler, timeStop) {
        return function (args) {
            let prevCall = this.lastCall;
            this.lastCall = Date.now();
            if (prevCall && (this.lastCall - prevCall) <= timeStop) {
                clearTimeout(this.lastCallTimer);
            }
            this.lastCallTimer = setTimeout(() => handler(args), timeStop);
        };
    }
    let inputUserText = (args) => textBlock.textContent = userInput.value;
    userInput.addEventListener('keyup', debounce(inputUserText, 300));
});