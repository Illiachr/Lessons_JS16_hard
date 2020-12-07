document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const label = document.createElement('label'),
        btn = document.createElement('button'),
        divBox = document.createElement('div');
    document.body.append(divBox);
    divBox.append(label, btn);

    btn.textContent = "Push here";
    label.textContent = "#909BF0";

    btn.addEventListener('click', () => {
        btn.textContent = "New Color";
        const xColor = '#'+ Math.floor(Math.random()*16777215).toString(16);
        document.body.style.background = xColor;
        label.textContent = xColor.toUpperCase();
        btn.style.color = xColor;
        if(xColor === '#dcdcdc') {label.style.color = '#000000';}
        if(xColor > '#dcdcdc') {label.style.color = '#ffffff';}
    });

});