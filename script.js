// 1) Создаю переменную num со значением 266219 (тип данных число)
let num = 266219,
    numSelfMulti = 1;

// 2) Вывожу в консоль произведение цифр этого числа в переменной num
num = num.toString();
for (let i = 0; i < num.length; i++){
    numSelfMulti *= parseInt(num[i])
};

console.log(numSelfMulti);

// 3) Полученный результат возвожу в куб
let numSelfMultiPow = numSelfMulti ** 3;

// 4) Вывожу на экран первые 2 цифры полученного числа
numSelfMultiPow = numSelfMultiPow.toString();
console.log(`${numSelfMultiPow [0]}${numSelfMultiPow [1]}`);

