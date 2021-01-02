'use strict';

/*
 //1. Добавление авто в таблицу
//2. Фильтрация авто по признакам (без изменнеия основного массива)
//3. Сортировка по признаку (убывание, возрастание)
4. Сброс - возвращение к исходной таблице
5. Пересоздание опций - удаление текущих и создание новых*
6. отмена сортировки*
7. сохранение в LocalStorage*
8. редизайн (добавить сайд бар с настройками)
*/

const carTableHeader = document.getElementById('car-table-header'),
    carTable = document.getElementById('car-table'),
    addForm = document.getElementById('add'),
    filterForm = document.getElementById('filter'),
    dataURL = './cars.json';
let carDb = [],
    filtredCars = [],
    click = 0;
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
            if (elem.matches('select')) {
                arr.forEach(car => {
                    const val = `${car[elem.name]}`;
                    const isValue = [...elem.options].find(
                        option => option.value.toLowerCase() === val.toLowerCase()
                    );
                    if (!isValue) {
                        elem.appendChild(new Option(`${Number(val) === 0 ?
                            'без пробега' : val}`, val));
                    }
                });
            }
        });
    },

    getArrShadow = (arr, elem) => arr.filter(car => `${car[elem.name]}`.toLowerCase() === elem.value.toLowerCase()),
    sortString = (a, b, key) => {
        if (a[key].toLowerCase() > b[key].toLowerCase()) { return 1; }
        if (a[key].toLowerCase() < b[key].toLowerCase()) { return -1; }
        return 0;
    },
    sortStringRevers = (a, b, key) => {
        if (a[key].toLowerCase() > b[key].toLowerCase()) { return -1; }
        if (a[key].toLowerCase() < b[key].toLowerCase()) { return 1; }
        return 0;
    },

    sortNum = (a, b, key) => a[key] - b[key],
    sortNumRevers = (a, b, key) => b[key] - a[key],

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
    }, // end handlFilter

    handlSort = e => {
        const key = e.target.dataset.name;
        if (key === 'brand' || key === 'model') {
            if (click < 1) {
                if (filtredCars.length > 0) {
                    filtredCars = filtredCars.sort((a, b) => sortString(a, b, key));
                } else {
                    filtredCars = carDb.sort((a, b) => sortString(a, b, key));
                }
                click++;
            } else {
                filtredCars = filtredCars.sort((a, b) => sortStringRevers(a, b, key));
                carToTable(filtredCars);
                click--;
            }
        }
        if (key === 'year' || key === 'mileage') {
            if (click < 1) {
                if (filtredCars.length > 0) {
                    filtredCars = filtredCars.sort((a, b) => sortNum(a, b, key));
                } else {
                    filtredCars = carDb.sort((a, b) => sortNum(a, b, key));
                }
                click++;
            } else {
                filtredCars = carDb.sort((a, b) => sortNumRevers(a, b, key));
                carToTable(filtredCars);
                click--;
            }
        }
        carToTable(filtredCars);
    };

fetch(dataURL)
    .then(res => {
        if (res.status !== 200) { throw new Error('Network status is not 200'); }
        return res.json();
    })
    .then(data => {
        carDb = data.cars;
        carToTable(carDb);
        addFilterOptions(carDb);
    })
    .catch(err => console.log(err));

addForm.addEventListener('submit', handlAddCar);
filterForm.addEventListener('change', handlFilter);
carTableHeader.addEventListener('click', handlSort);
