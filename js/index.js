document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const carTableHeader = document.getElementById('car-table-header'),
        carTable = document.getElementById('car-table'),
        addForm = document.getElementById('add'),
        filterForm = document.getElementById('filter'),
        filterFormSelectAll = [...filterForm.elements].filter(item => item.tagName.toLowerCase() === 'select'),
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
        resetSelectOptions = form => {
            [...form.elements].forEach(elem => {
                if (elem.matches('select')) {
                    elem.textContent = '';
                    elem.append(new Option(`--`, `no`));
                }
            });
        },
        chekOption = (value, selectElem) => {
            [...selectElem.options].find(
                option => option.value.toLowerCase() === value.toLowerCase());
        },
        addFilterOptions = (arr, form = filterForm) => {
            resetSelectOptions(filterForm);
            [...form.elements].forEach(elem => {
                if (elem.matches('select')) {
                    arr.forEach(car => {
                        const val = `${car[elem.name]}`;
                        //Если опции с таким значением нет - добавляем (чтоб не было дубликатов)
                        if (!chekOption(val, elem)) {
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
        tglElemDisplay = elem => {
            if (!elem) { return; }
            if (elem.classList.contains('d-none')) {
                elem.classList.remove('d-none');
            } else { elem.classList.add('d-none'); }
        },
        tglLabelElems = (selectElem, dataName = false, mode = 'toggle') => {
            const labelFilter = selectElem.previousElementSibling,
                filterTitle = selectElem.previousElementSibling.firstElementChild,
                closeBtn = selectElem.previousElementSibling.lastElementChild,
                divider = selectElem.nextElementSibling.matches('hr') ? selectElem.nextElementSibling : null;
            filterTitle.textContent = dataName ? labelFilter.dataset.name : selectElem.value;
            if (mode === 'toggle') {
                tglElemDisplay(closeBtn);
                tglElemDisplay(selectElem);
                tglElemDisplay(divider);
            }

            if (mode === 'none') {
                closeBtn.classList.add('d-none');
                selectElem.classList.remove('d-none');
                if (divider) { divider.classList.add('d-none'); }
            }
        },
        render = arr => {
            carToTable(arr);
            addFilterOptions(arr);
        },
        handlFilter = e => {
            const target = e.target;
            if (target.matches('select')) {
                tglLabelElems(target);
                if (filtredCars.length) {
                    filtredCars = getArrShadow(filtredCars, target);
                } else if (carTable.querySelectorAll('tr').length > 0) {
                    filtredCars = getArrShadow(carDb, target);
                }
            }
            render(filtredCars);
        }, // end handlFilter

        handlFilterClick = e => {
            e.preventDefault();
            if (e.target.closest('.close')) {
                filterFormSelectAll.forEach(elem => tglLabelElems(elem, true, 'none'));
                filtredCars = [];
                render(carDb);
            }
            if (e.target.matches('#reset')) {
                console.log(e.target);
                filterFormSelectAll.forEach(elem => {
                    tglLabelElems(elem, true, 'none');
                });
                filtredCars = [];
                document.querySelectorAll('thead th').forEach(cell => {
                    [...cell.children].forEach((btn, i) => {
                        if (i !== 0) {
                            btn.classList.add('d-none');
                        } else { btn.classList.remove('d-none'); }
                    });
                });
                render(carDb);
            }
        },

        setSortIcon = key => {
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
        },

        handlSort = e => {
            const headerCell = !e.target.matches('thead th') ? e.target.closest('thead th') : e.target,
                key = headerCell.dataset.name;
            setSortIcon(key);

            if (!filtredCars.length) { filtredCars = carDb.slice(0, carDb.length); }

            if (key === 'num') {
                if (click < 1) {
                    if (filtredCars.length > 0) {
                        filtredCars = filtredCars.reverse();
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
            }

            if (key === 'brand' || key === 'model' && e.target.value !== 'no') {
                if (click < 1) {
                    if (filtredCars.length > 0) {
                        filtredCars = filtredCars.sort((a, b) => sortString(a, b, key));
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
            } // end event text sort
            if (key === 'year' || key === 'mileage') {
                if (click < 1) {
                    if (filtredCars.length > 0) {
                        filtredCars = filtredCars.sort((a, b) => sortNum(a, b, key));
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
            } // end event numeric sort

            carToTable(filtredCars);
        };

    fetch(dataURL)
        .then(res => {
            if (res.status !== 200) { throw new Error('Network status is not 200'); }
            return res.json();
        })
        .then(data => {
            carDb = data.cars;
            render(carDb);
        })
        .catch(err => console.log(err));

    document.querySelector('#add-menu').addEventListener('click', e => {
        e.target.classList.add('d-none');
        addForm.classList.remove('d-none');
    });
    addForm.addEventListener('submit', handlAddCar);
    filterForm.addEventListener('click', handlFilterClick);
    filterForm.addEventListener('change', handlFilter);
    carTableHeader.addEventListener('click', handlSort);
});

