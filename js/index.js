'use strict';

/*
 //1. Добавление авто в таблицу
//2. Фильтрация авто по признакам (без изменнеия основного массива)
//3. Сортировка по признаку (убывание, возрастание)
//4. Сброс - возвращение к исходной таблице
//5. Пересоздание опций - удаление текущих и создание новых*
6. отмена сортировки*
7. сохранение в LocalStorage*
8. редизайн (добавить сайд бар с настройками)
*/

const carTableHeader = document.getElementById('car-table-header'),
    carTable = document.getElementById('car-table'),
    addForm = document.getElementById('add'),
    filterForm = document.getElementById('filter'),
    dataURL = './cars.json',
    cachedOptions = {},
    cachedFilter = new Map();
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

    // addOptionsFromCache = (cachObj, elem) => {
    //     elem.textContent = '';
    //     elem.append(new Option(`--`, `no`));
    //     cachObj[elem.name].forEach(item => {
    //         const optionValue = item;
    //         if (optionValue !== 'no') {
    //             elem.append(new Option(`${Number(optionValue) === 0 ?
    //                 'без пробега' : optionValue}`, optionValue));
    //         }
    //     });
    //     //filtredCars[elem.name] = cachObj[elem.name];
    // },

    addFilterOptions = arr => {
        [...filterForm.elements].forEach(elem => {
            if (elem.matches('select')) {
                if (cachedOptions[elem.name]) {
                    delete cachedOptions[elem.name];
                }
                cachedOptions[elem.name] = [...elem.options].reduce((arr, option) => {
                    arr.push(option.value);
                    return arr;
                }, []);
                elem.textContent = '';
                elem.append(new Option(`--`, `no`));
            }
        });

        [...filterForm.elements].forEach(elem => {
            if (elem.matches('select')) {
                arr.forEach(car => {
                    const val = `${car[elem.name]}`;
                    const isValue = [...elem.options].find(
                        option => option.value.toLowerCase() === val.toLowerCase()
                    );
                    if (!isValue) {
                        elem.append(new Option(`${Number(val) === 0 ?
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
        addFilterOptions(carDb);
        addForm.classList.add('d-none');
        addForm.previousElementSibling.classList.remove('d-none');

    }, // end handlAddCar
    handlFilter = e => {
        const target = e.target;
        if (target.matches('select')) {
            console.log(target.nextElementSibling);
            const filterChoise = target.previousElementSibling.firstElementChild,
                closeBtn = target.previousElementSibling.lastElementChild,
                divider = target.nextElementSibling;
            filterChoise.textContent = target.value;
            closeBtn.classList.remove('d-none');
            target.classList.add('d-none');
            if (divider) { divider.classList.remove('d-none'); }
            if (filtredCars.length) {
                filtredCars = getArrShadow(filtredCars, target);
            } else if (carTable.querySelectorAll('tr').length > 0) {
                filtredCars = getArrShadow(carDb, target);
            }
            e.target.dataset.order = cachedFilter.size;
        }
        carToTable(filtredCars);
        addFilterOptions(filtredCars);
        cachedFilter.set(cachedFilter.size, filtredCars);
        console.log(cachedFilter);
    }, // end handlFilter

    handlSort = e => {
        let headerCell = e.target;
        if (!e.target.matches('thead th')) { headerCell = e.target.closest('thead th'); }
        const key = headerCell.dataset.name;
        document.querySelectorAll('thead th').forEach(cell => {
            if (cell.dataset.name !== key) {
                [...cell.children].forEach((btn, i) => {
                    if (i !== 0) {
                        btn.classList.add('d-none');
                    } else { btn.classList.remove('d-none'); }
                });
            } else {
                cell.children[0].classList.add('d-none');
            }
        });

        if (key === 'num') {
            if (click < 1) {
                if (filtredCars.length > 0) {
                    filtredCars = filtredCars.reverse();
                    headerCell.children[1].classList.remove('d-none');
                    headerCell.children[0].classList.add('d-none');
                } else {
                    filtredCars = carDb.reverse();
                    headerCell.children[1].classList.remove('d-none');
                    headerCell.children[0].classList.add('d-none');
                }
                click++;
            } else {
                filtredCars = filtredCars.reverse();
                headerCell.children[0].classList.remove('d-none');
                headerCell.children[1].classList.add('d-none');
                carToTable(filtredCars);
                click--;
            }
            carToTable(filtredCars);
        }

        if (key === 'brand' || key === 'model' && e.target.value !== 'no') {
            if (click < 1) {
                if (filtredCars.length > 0) {
                    filtredCars = filtredCars.sort((a, b) => sortString(a, b, key));
                    headerCell.children[1].classList.remove('d-none');
                    headerCell.children[2].classList.add('d-none');
                } else {
                    filtredCars = carDb.sort((a, b) => sortString(a, b, key));
                    headerCell.children[1].classList.remove('d-none');
                    headerCell.children[2].classList.add('d-none');
                }
                click++;
            } else {
                filtredCars = filtredCars.sort((a, b) => sortStringRevers(a, b, key));
                headerCell.children[2].classList.remove('d-none');
                headerCell.children[1].classList.add('d-none');
                carToTable(filtredCars);
                click--;
            }
            carToTable(filtredCars);
        } // end event text sort
        if (key === 'year' || key === 'mileage') {
            if (click < 1) {
                if (filtredCars.length > 0) {
                    filtredCars = filtredCars.sort((a, b) => sortNum(a, b, key));
                    headerCell.children[1].classList.remove('d-none');
                    headerCell.children[2].classList.add('d-none');
                } else {
                    filtredCars = carDb.sort((a, b) => sortNum(a, b, key));
                    headerCell.children[1].classList.remove('d-none');
                    headerCell.children[2].classList.add('d-none');
                }
                click++;
            } else {
                filtredCars = filtredCars.sort((a, b) => sortNumRevers(a, b, key));
                headerCell.children[2].classList.remove('d-none');
                headerCell.children[1].classList.add('d-none');
                carToTable(filtredCars);
                click--;
            }
            carToTable(filtredCars);
        } // end event numeric sort


        //carToTable(filtredCars);
    },

    handlClick = e => {
        e.preventDefault();
        if (e.target.closest('.close')) {
            console.log(e.target);
            const label = e.target.closest('label');
            //const labelTitle =
            const elem = e.target.closest('label').nextElementSibling;
            label.textContent = label.dataset.name;
            e.target.classList.add('d-none');
            //addOptionsFromCache(cachedOptions, elem);
            elem.classList.remove('d-none');
            for (let i = Number(elem.dataset.order); i <= cachedFilter.size; i++) {
                cachedFilter.delete(i);
            }
            console.log(cachedFilter);
            if (cachedFilter.size) {
                carToTable(cachedFilter.get(cachedFilter.size - 1));
                addFilterOptions(cachedFilter.get(cachedFilter.size - 1));
            } else {
                carToTable(carDb);
                addFilterOptions(carDb);
            }
        }
        if (e.target.matches('#reset')) {
            console.log(e.target);
            document.querySelectorAll('#filter label').forEach(elem => {
                if (elem.matches('label')) {
                    elem.removeAttribute('data-order');
                    elem.firstElementChild.textContent = elem.dataset.name;
                    elem.lastElementChild.classList.add('d-none');
                    elem.nextElementSibling.classList.remove('d-none');
                }
            });
            for (let i = 0; i <= cachedFilter.size; i++) {
                cachedFilter.delete(i);
            }
            document.querySelectorAll('#filter hr').forEach(elem => elem.classList.add('d-none'));
            document.querySelectorAll('thead th').forEach(cell => {
                [...cell.children].forEach((btn, i) => {
                    if (i !== 0) {
                        btn.classList.add('d-none');
                    } else { btn.classList.remove('d-none'); }
                });
            });

            carToTable(carDb);
            addFilterOptions(carDb);
        }
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

document.querySelector('#add-menu').addEventListener('click', e => {
    e.target.classList.add('d-none');
    addForm.classList.remove('d-none');
});
addForm.addEventListener('submit', handlAddCar);
filterForm.addEventListener('click', handlClick);
filterForm.addEventListener('change', handlFilter);
carTableHeader.addEventListener('click', handlSort);
