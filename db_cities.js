document.addEventListener('DOMContentLoaded', () => {
    const listDefault = document.querySelector('.dropdown-lists__list--default'),
        listSelect = document.querySelector('.dropdown-lists__list--select'),
        listAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
        cancelCountryBtn = document.querySelector('.close-button'),
        label = document.querySelector('.label'),
        refBtn =  document.querySelector('.button'),
        inputCities = document.getElementById('select-cities'),
        dataUrl = './db_cities.json',
        keyLS = 'citiesDb';
    let data = {},
        citiesDb = {};

    const sortNum = (a, b, key) => a[key] - b[key];

    const addCities = (list, arr, country) => {
        arr.forEach(city => {
            list.insertAdjacentHTML('beforeend', `
                <div class="dropdown-lists__line">
                    <div class="dropdown-lists__city" data-country=${country.replace(/ /, '_')} data-link=${city.link}>
                        ${city.name}
                    </div>
                    <div class="dropdown-lists__count">${city.count}</div>
                </div>
            `);
        });
    };

    const addSelectCountry = (list, arrOfObj, country, cbAddCities) => {
        list.textContent = '';
        const obj = arrOfObj.filter(item => item.country === country.replace(/_/, ' '))[0];
        list.insertAdjacentHTML('beforeend', `
        <div class="dropdown-lists__total-line">
            <div class="dropdown-lists__country" data-country=${obj.country.replace(/ /, '_')}>${obj.country}</div>
            <div class="dropdown-lists__count" data-country=${obj.country.replace(/ /, '_')}>${obj.count}</div>
        </div>
        `);
        cbAddCities(list, obj.cities, country);
    };
    const addCitiesTop = (list, arrOfObj, country) => {
        arrOfObj.forEach((city, index) => {
            if (index < 3) {
                list.insertAdjacentHTML('beforeend', `
                <div class="dropdown-lists__line">
                    <div class="dropdown-lists__city" data-link=${city.link}
                    data-country=${country.replace(/ /, '_')}>${city.name}</div>
                    <div class="dropdown-lists__count">${city.count}</div>
                </div>
            `);
            }
        });
    };

    const addList = (list, arrOfObj, cbAddCities, firstCountry = '') => {
        list.textContent = '';
        arrOfObj.forEach(obj => {
            if (obj.country === firstCountry) {
                list.insertAdjacentHTML('beforeend', `
                <div class="dropdown-lists__countryBlock">  
                    <div class="dropdown-lists__total-line">
                        <div class="dropdown-lists__country" data-country=${obj.country.replace(/ /, '_')}>
                            ${obj.country}
                        </div>
                        <div class="dropdown-lists__count">${obj.count}</div>
                    </div>
                </div>
            `);
                cbAddCities(list, obj.cities, obj.country);
            }

        });
        arrOfObj.forEach(obj => {
            if (obj.country !== firstCountry) {
                list.insertAdjacentHTML('beforeend', `
                <div class="dropdown-lists__countryBlock">  
                    <div class="dropdown-lists__total-line">
                        <div class="dropdown-lists__country" data-country=${obj.country.replace(/ /, '_')}>
                            ${obj.country}
                        </div>
                        <div class="dropdown-lists__count">${obj.count}</div>
                    </div>
                </div>
            `);
                cbAddCities(list, obj.cities, obj.country);
            }

        });
    };

    const moveItem = (elem, drawFn, startPos, distance) => {
        let start = null,
            currentPos = startPos;
        const step = timestamp => {
            if (!start) { start = timestamp; }
            const progress = timestamp - start;
            currentPos = drawFn(elem, currentPos, progress);
            if (startPos > distance) {
                if (currentPos >= distance) {
                    requestAnimationFrame(step);
                } else {
                    elem.style.transform = `translateX(${distance}%)`;
                }
            } else if (startPos < distance) {
                if (currentPos <= distance) {
                    requestAnimationFrame(step);
                } else {
                    elem.style.transform = `translateX(${distance}%)`;
                }
            }
        };

        requestAnimationFrame(step);
    };

    const drawLeft = (elem, currentLeft, progress) => {
        elem.style.transform = `translateX(${currentLeft}%)`;
        return currentLeft -= Math.floor((progress / 100));
    };
    const drawRight = (elem, currentLeft, progress) => {
        elem.style.transform = `translateX(${currentLeft}%)`;
        return currentLeft += Math.floor((progress / 100));
    };

    const setCookie = (name, value, options = {}) => {
        options = {
            path: '/',
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = `${encodeURIComponent(name)} = ${encodeURIComponent(value)}`;

        for (const optionKey in options) {
            updatedCookie += "; " + optionKey;
            const optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    };

    const getDataLS = keyLS => (localStorage.getItem(keyLS) !== null ?
        JSON.parse(localStorage.getItem(keyLS)) :
        false);
    const getCookies = () => (document.cookie !== '' ?
        new Map([...document.cookie.split(";").map(item =>
            decodeURIComponent(item).trim().split('='))]) :
        false);

    const getData = resObj => {
        let localeKey = '';
        const localeKeyCookie = getCookies();
        if (localeKeyCookie !== false && localeKeyCookie.has('locale')) {
            localeKey =  localeKeyCookie.get('locale');
        } else {
            do {
                localeKey = prompt('Choose your locale: RU | EN | DE', 'RU').trim().toUpperCase();
            } while (localeKey !== 'RU' && localeKey !== 'EN' && localeKey !== 'DE');
            setCookie('locale', localeKey);
        }
        const firstCountry = localeKey === 'RU' ?
            "Россия" : localeKey === 'EN' ?
                "United Kingdom" : "Deutschland";
        data = resObj[localeKey].sort((a, b) => sortNum(a, b, "count")).reverse();
        addList(listDefault, data, addCitiesTop, firstCountry);
    };

    const responseHandler = resObj => {
        getData(resObj);
        console.log(data);
        localStorage[keyLS] = JSON.stringify(resObj);
    };

    citiesDb = getDataLS(keyLS);
    console.log(citiesDb);

    const init = () => {
        if (!citiesDb) {
            fetch(dataUrl)
                .then(res => {
                    if (res.status !== 200) { throw new Error(`Network status isn't 200`); }
                    return res.json();
                })
                .then(responseHandler)
                .catch(err => console.warn(err));
        } else {
            getData(citiesDb);
        }

        document.querySelector('.input-cities').addEventListener('click', e => {
            console.log(e.target);
            if (e.target.matches('.dropdown-lists__country')) {
                const country = e.target.dataset.country;
                listSelect.style.display = 'block';
                listDefault.style.display = 'none';
                moveItem(listSelect, drawLeft, 100, 0);
                label.textContent = 'Выберите город';
                cancelCountryBtn.style.display = 'inline';
                addSelectCountry(listSelect, data, country, addCities);
            }

            if (e.target.closest('.dropdown-lists__line')) {
                const citySelected = e.target.closest('.dropdown-lists__line').firstElementChild;
                const country = citySelected.dataset.country;
                listSelect.style.display = 'block';
                listDefault.style.display = 'none';
                listAutocomplete.style.display = 'none';
                moveItem(listSelect, drawLeft, 100, 0);
                citySelected.classList.add('dropdown-lists__city--ip');
                label.textContent = '';
                inputCities.value = citySelected.textContent;
                cancelCountryBtn.style.display = 'block';
                addSelectCountry(listSelect, data, country, addCities);
                listSelect.querySelectorAll('.dropdown-lists__city').forEach(elem => {
                    if (inputCities.value === elem.textContent) {
                        elem.classList.add('dropdown-lists__city--ip');
                    } else { elem.classList.remove('dropdown-lists__city--ip'); }
                });
                refBtn.setAttribute('href', citySelected.dataset.link);
                refBtn.setAttribute('target', '_blank');
            }

            if (e.target === cancelCountryBtn) {
                cancelCountryBtn.style.display = 'none';
                listDefault.style.display = 'block';
                listSelect.style.display = 'none';
                listAutocomplete.style.display = 'none';
                moveItem(listDefault, drawRight, -100, 0);
                inputCities.value = '';
                label.textContent = 'Страна или город';
                refBtn.setAttribute('href', '#!');
                refBtn.removeAttribute('target');
            }
        });

        inputCities.addEventListener('input', () => {
            if (inputCities.value.trim() !== '') {
                listAutocomplete.style.display = 'block';
                listDefault.style.display = 'none';
                listSelect.style.display = 'none';
                listAutocomplete.textContent = '';
                data.forEach(obj =>
                    obj.cities.forEach(city => {
                        const compare = city.name.toLowerCase().includes(inputCities.value.trim().toLowerCase());
                        if (compare) {
                            console.log(obj.country);
                            listAutocomplete
                                .insertAdjacentHTML('beforeend', `
                            <div class="dropdown-lists__line">
                                <div class="dropdown-lists__city" data-country=${obj.country} 
                                data-link=${city.link}>${city.name}</div>
                                <div class="dropdown-lists__count">${city.count}</div>
                            </div>
                        `);
                        }
                    })
                );
                if (!listAutocomplete.childElementCount) {
                    listAutocomplete.insertAdjacentHTML('beforeend',
                        `
                        <div class="dropdown-lists__line">
                            <div class="dropdown-lists__city">Ничего не найдено</div>
                        </div>
                    `);
                }
            } else {
                listDefault.style.display = 'block';
                listAutocomplete.style.display = 'none';
            }
        });
    };

    init();
});

