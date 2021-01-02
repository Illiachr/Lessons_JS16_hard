'use strict';

/*
 //1. Добавление авто в таблицу
//2. Фильтрация авто по признакам (без изменнеия основного массива)
3. Сортировка по признаку (убывание, возрастание)
4. Сброс - возвращение к исходной таблице
5. Пересоздание опций - удаление текущих и создание новых
*/

const carTable = document.getElementById('car-table'),
    addForm = document.getElementById('add'),
    filterForm = document.getElementById('filter'),
    dataURL = './cars.json';
let carDb = [],
    filtredCars = [];
const carToTable = arr => {
        carTable.textContent = '';
        arr.forEach((car, i) => {
            carTable.insertAdjacentHTML('beforeend', `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${car.brand}</td>
                <td>${car.model}</td>
                <td>${car.year}</td>
                <td>${car.mileage ? car.mileage : 'без пробега'}</td>
            </tr>
        `);
        });
    }, // end carToTable

    addFilterOptions = arr => {
        [...filterForm.elements].forEach(elem => {
            console.log(elem);
            if (elem.matches('select')) {
                console.log(elem);
                arr.forEach(car => {
                    const val = `${car[elem.name]}`;
                    const isValue = [...elem.options].find(
                        option => option.value.toLowerCase() === val.toLowerCase()
                    );
                    console.log(val);
                    if (!isValue) {
                        elem.appendChild(new Option(`${Number(val) === 0 ?
                            'без пробега' : val}`, val));
                    }
                });
            }
        });
    },

    getArrShadow = (arr, elem) => arr.filter(car => `${car[elem.name]}`.toLowerCase() === elem.value.toLowerCase()),

    handlAddCar = e => {
        e.preventDefault();
        const carItem = {};
        [...addForm.elements].forEach(elem => {
            if (elem.matches('input')) {
                carItem[elem.name] = Number(elem.value) ? Number(elem.value) : elem.value.trim();
            }
        });
        carDb.push(carItem);
        carToTable(carDb);
        addFilterOptions();

    }, // end handlAddCar
    handlFilter = e => {
        const target = e.target;
        if (filtredCars.length) {
            filtredCars = getArrShadow(filtredCars, target);
        } else if (carTable.querySelectorAll('tr').length > 0) { filtredCars = getArrShadow(carDb, target); }
        carToTable(filtredCars);
    }; // end handlFilter

fetch(dataURL)
    .then(res => {
        if (res.status !== 200) { throw new Error('Network status is not 200'); }
        return res.json();
    })
    .then(data => {
        console.log(data);
        carDb = data.cars;
        carToTable(carDb);
        addFilterOptions(carDb);
    })
    .catch(err => console.log(err));

addForm.addEventListener('submit', handlAddCar);
filterForm.addEventListener('change', handlFilter);
