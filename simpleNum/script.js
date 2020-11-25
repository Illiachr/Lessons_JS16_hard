'use strict';
let n = 100;

nextNum:
for (let i = 2; i <= n; i++) { // Для всех i...

  for (let j = 2; j < i; j++) { // проверить, делится ли число..
    if (i % j === 0) {
        continue nextNum;
    } else {// не подходит, берём следующее
        }
}

console.log(`${i} Делители этого числа: 1 и ${i}`); // простое число
}