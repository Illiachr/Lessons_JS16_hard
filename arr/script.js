'use strict';

const arr = ['4567', '7658', '3945', '2943', '7403', '4444', '8572'];

for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] == 4 || arr[i][0] == 2) {
        console.log(arr[i]);
    }
}