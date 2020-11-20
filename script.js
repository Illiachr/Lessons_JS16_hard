// 1) Создаю переменную num со значением 266219 (тип данных число)
const num = 266219

// 2) Вывожу в консоль произведение цифр этого числа в переменной num
numStr = num.toString();
numSelfMulti = 1;
for (let i = 0; i < numStr.length; i++){
    numSelfMulti *= parseInt(numStr[i])
};

console.log(numSelfMulti);

// 3) Полученный результат возвожу в куб
numSelfMultiPow = numSelfMulti ** 3;

// 4) Вывожу на экран первые 2 цифры полученного числа
numSelfMultiPow = numSelfMultiPow.toString();
console.log(`${numSelfMultiPow [0]}${numSelfMultiPow [1]}`);

