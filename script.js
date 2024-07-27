//Регулирование блоков с временем аренды
const data = new Date();
const year = data.getFullYear();
const month = data.getMonth();
const day = data.getDate();

switch (month) {
    case 0:
        sMonth = "01";
        eMonth = "02";
        eYear = year;
        break;
    case 1:
        sMonth = "02";
        eMonth = "03";
        eYear = year;
        break;
    case 2:
        sMonth = "03";
        eMonth = "04";
        eYear = year;
        break;
    case 3:
        sMonth = "04";
        eMonth = "05";
        eYear = year;
        break;
    case 4:
        sMonth = "05";
        eMonth = "06";
        eYear = year;
        break;
    case 5:
        sMonth = "06";
        eMonth = "07";
        eYear = year;
        break;
    case 6:
        sMonth = "07";
        eMonth = "08";
        eYear = year;
        break;
    case 7:
        sMonth = "08";
        eMonth = "09";
        eYear = year;
        break;
    case 8:
        sMonth = "09";
        eMonth = "10";
        eYear = year;
        break;
    case 9:
        sMonth = "10";
        eMonth = "11";
        eYear = year;
        break;
    case 10:
        sMonth = "11";
        eMonth = "12";
        eYear = year;
        break;
    case 11:
        sMonth = "12";
        eMonth = "01";
        eYear = year + 1;
        break;
}

const scrDateS = document.querySelector("#date_start")
scrDateS.setAttribute("value", `${year}-${sMonth}-${day}`)
scrDateS.setAttribute("min", `${year}-${sMonth}-${day}`)
scrDateS.setAttribute("max", `${eYear}-${eMonth}-${day}`)

const scrDateE = document.querySelector("#date_end")
scrDateE.setAttribute("value", scrDateS.value)
scrDateE.setAttribute("min", scrDateS.value)

function funDate() {
    scrDateE.setAttribute("value", scrDateS.value)
    scrDateE.setAttribute("min", scrDateS.value)

    scrDateE.value = scrDateS.value

    funFilter()
}

//добавление категорий в фильтры
const masBody = []
const masClass = []
const masMake = []

for (i = 0; i < db.length; i++) {
    if (!masBody.includes(db[i].parameters.body)) {
        masBody.push(db[i].parameters.body)
    }
    if (!masClass.includes(db[i].parameters.class)) {
        masClass.push(db[i].parameters.class)
    }
    if (!masMake.includes(db[i].parameters.make)) {
        masMake.push(db[i].parameters.make)
    }
}

masBody.sort()
masClass.sort()
masMake.sort()

const scrBody1 = document.querySelector(".scr_body1");
const scrBody2 = document.querySelector(".scr_body2");
for (i = 0; i < masBody.length; i++) {
    if (i < masBody.length / 2) {
        scrBody1.innerHTML += `
                                <p class="text_ch"><input class="checkbox_auto" type="checkbox" name="body" value="${masBody[i]}" onchange="funFilter()"> ${masBody[i]}</p>`;
    } else {
        scrBody2.innerHTML += `
                            <p class="text_ch"><input class="checkbox_auto" type="checkbox" name="body" value="${masBody[i]}" onchange="funFilter()"> ${masBody[i]}</p>`;
    }
}

const scrClass1 = document.querySelector(".scr_class1");
const scrClass2 = document.querySelector(".scr_class2");
for (i = 0; i < masClass.length; i++) {
    if (i < masClass.length / 2) {
        scrClass1.innerHTML += `
                                <p class="text_ch"><input class="checkbox_auto" type="checkbox" name="classA" value="${masClass[i]}" onchange="funFilter()"> ${masClass[i]}</p>`;
    } else {
        scrClass2.innerHTML += `
                            <p class="text_ch"><input class="checkbox_auto" type="checkbox" name="classA" value="${masClass[i]}" onchange="funFilter()"> ${masClass[i]}</p>`;
    }
}

const scrMake1 = document.querySelector(".scr_make1");
const scrMake2 = document.querySelector(".scr_make2");
for (i = 0; i < masMake.length; i++) {
    if (i < masMake.length / 2) {
        scrMake1.innerHTML += `
                                <p class="text_ch"><input class="checkbox_auto" type="checkbox" name="make" value="${masMake[i]}" onchange="funFilter()"> ${masMake[i]}</p>`;
    } else {
        scrMake2.innerHTML += `
                            <p class="text_ch"><input class="checkbox_auto" type="checkbox" name="make" value="${masMake[i]}" onchange="funFilter()"> ${masMake[i]}</p>`;
    }
}

//база данных
var masAuto = db;
masAuto.sort(function (a, b) {
    return b.parameters.price - a.parameters.price;
});

//количество отображаемых карточек
let __NumAuto = 6
if (window.innerWidth <= 750) {
    __NumAuto = 4
}

//фильтрация
function funFilter() {

    //    console.log("filter")

    const checkBody = Array.from(document.getElementsByName('body')).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    const checkClass = Array.from(document.getElementsByName('classA')).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    const checkMake = Array.from(document.getElementsByName('make')).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    const checkboxAuto = document.getElementsByClassName('checkbox_auto');

    if (checkBody.length != 0 || checkClass.length != 0 || checkMake.length != 0) {
        masAuto = db.filter((auto) => {
            const isBody = checkBody.length === 0 || checkBody.includes(auto.parameters.body);
            const isClass = checkClass.length === 0 || checkClass.includes(auto.parameters.class);
            const isMake = checkMake.length === 0 || checkMake.includes(auto.parameters.make);

            return auto.status == "true" && isBody && isClass && isMake;
        });
    } else {
        masAuto = db
    }

    const priceA = document.querySelector("#priceA");
    if (priceA.value == "few") {
        masAuto.sort(function (a, b) {
            return a.parameters.price - b.parameters.price;
        });
    } else {
        masAuto.sort(function (a, b) {
            return b.parameters.price - a.parameters.price;
        });
    }

    const fNavAuto = document.querySelector(".nav_auto")
    fNavAuto.innerHTML = ""

    if (masAuto.length > __NumAuto) {
        for (i = 1;
            (i - 1) * __NumAuto < masAuto.length; i++) {
            navAuto.innerHTML += `<div class="num_auto color_auto" onclick="funNav(${i-1})">${i}</div>`
        }

        const numAuto = document.querySelector(".num_auto");
        numAuto.classList.remove("color_auto");
        numAuto.classList.add("color_auto_A");
    }

    funNav(0)

}


//добавление карточек с информацией об автомобиле
const objects = document.querySelector(".objects");
for (i = 0; i < masAuto.length && i < __NumAuto; i++) {

    let priceAuto = `${masAuto[i].parameters.price}`
    const scrDateEe = document.querySelector("#date_end")
    const scrDateSs = document.querySelector("#date_start")
    let dateE = new Date(`${scrDateEe.value}`)
    let dateS = new Date(`${scrDateSs.value}`)
    if ((dateE - dateS) / (1000 * 60 * 60 * 24) > 0) {
        priceAuto = ((dateE - dateS) / (1000 * 60 * 60 * 24)) * parseInt(`${masAuto[i].parameters.price}`)
    }

    objects.innerHTML += `<div class="object">
                            <div class="img"> <img src="BD/IMG/${masAuto[i].auto.img}" alt="auto${i+1}"> </div>
                            <h4>${masAuto[i].auto.title}</h4>
                            <div class="info">
                                <div class="inf">
                                    <p>Год выпуска <span class="i">${masAuto[i].auto.info.yearOfIssue}</span></p>
                                    <p title="${masAuto[i].auto.info.kpp2}">КПП <span class="i">${masAuto[i].auto.info.kpp}</span></p>
                                    <p>Мест <span class="i">${masAuto[i].auto.info.seats}</span></p>
                                </div>
                                <div class="price">
                                    <p>Цена <span class="i">${priceAuto} руб</span></p>
                                </div>
                            </div>
                            <div class="buttons">
                                <a href="#" aria-label="Detailed information about the car">
                                    <div class="button1">Подробнее</div>
                                </a>
                                <a href="#" aria-label="Rent a car">
                                    <div class="button2">Арендовать</div>
                                </a>
                            </div>

                        </div>`;

}

//количество страниц
const navAuto = document.querySelector(".nav_auto");
navAuto.innerHTML = ""
if (masAuto.length > __NumAuto + 1) {
    for (i = 1;
        (i - 1) * __NumAuto < masAuto.length; i++) {
        navAuto.innerHTML += `<div class="num_auto color_auto" onclick="funNav(${i-1})">${i}</div>`
    }

    const numAuto = document.querySelector(".num_auto");
    numAuto.classList.remove("color_auto");
    numAuto.classList.add("color_auto_A");
}


//переключение между страницами
function funNav(a) {

    if (masAuto.length > __NumAuto) {
        const fNumAuto = document.getElementsByClassName('num_auto');
        for (i = 0; i < fNumAuto.length; i++) {
            if (fNumAuto[i].classList.contains("color_auto_A")) {
                fNumAuto[i].classList.remove("color_auto_A");
                fNumAuto[i].classList.add("color_auto");
            }
        }
        fNumAuto[a].classList.remove("color_auto");
        fNumAuto[a].classList.add("color_auto_A");
    }

    const fObjects = document.querySelector(".objects");
    fObjects.innerHTML = "";

    //наличие водителя
    const checkDriver = Array.from(document.getElementsByName('driver')).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    let isDriver = 0
    if (checkDriver.length != 0) {
        isDriver = 2000
    }

    for (i = a * __NumAuto; i < masAuto.length && i < a * __NumAuto + __NumAuto; i++) {

        //вычисление цены
        const priceStart = parseInt(`${masAuto[i].parameters.price}`)
        let priceAuto = priceStart + isDriver
        const scrDateEe = document.querySelector("#date_end")
        const scrDateSs = document.querySelector("#date_start")
        let dateE = new Date(`${scrDateEe.value}`)
        let dateS = new Date(`${scrDateSs.value}`)
        const kolDay = (dateE - dateS) / (1000 * 60 * 60 * 24)
        if (kolDay > 0) {
            priceAuto = kolDay * (priceStart + isDriver)
        }

        fObjects.innerHTML += `<div class="object">
                            <div class="img"> <img src="BD/IMG/${masAuto[i].auto.img}" alt="auto${i+1}"> </div>
                            <h4>${masAuto[i].auto.title}</h4>
                            <div class="info">
                                <div class="inf">
                                    <p>Год выпуска <span class="i">${masAuto[i].auto.info.yearOfIssue}</span></p>
                                    <p title="${masAuto[i].auto.info.kpp2}">КПП <span class="i">${masAuto[i].auto.info.kpp}</span></p>
                                    <p>Мест <span class="i">${masAuto[i].auto.info.seats}</span></p>
                                </div>
                                <div class="price">
                                    <p>Цена <span class="i">${priceAuto} руб</span></p>
                                </div>
                            </div>
                            <div class="buttons">
                                <a href="#" aria-label="Detailed information about the car">
                                    <div class="button1">Подробнее</div>
                                </a>
                                <a href="#" aria-label="Rent a car">
                                    <div class="button2">Арендовать</div>
                                </a>
                            </div>

                        </div>`;

    }

    const autos = document.querySelector(".autos");
    autos.scrollIntoView();
}


//функция для скролла
function funScroll(a) {
    if (document.querySelector("._active")) {
        funBurger()
    }

    document.querySelector(`${a}`).scrollIntoView({
        behavior: 'smooth'
    });
}

//функция для бургера в шапке
function funBurger() {
    document.querySelector(".burger").classList.toggle("_active")
    document.querySelector(".menu").classList.toggle("_active")
    document.querySelector(".nav_text").classList.toggle("_active")
    document.querySelector(".lin").classList.toggle("_active")
    document.querySelector("body").classList.toggle("_active")
    document.querySelector(".nav_bac").classList.toggle("_active")
}

//функция для бургера в фильтре
function funBurger2() {
    document.querySelector(".icon").classList.toggle("_activeAuto")
    document.querySelector(".filter_wrap").classList.toggle("_activeAuto")
    document.querySelector("body").classList.toggle("_activeAuto")
    document.querySelector(".button_filter").classList.toggle("_activeAuto")

    document.querySelector(".filters").scrollIntoView({
        behavior: 'smooth'
    });
}

//заполнение карточек с отзывами
const reviews_wrap = document.querySelector(".reviews_items_wrap");
for (i = 0; i < reviews.length; i++) {
    reviews_wrap.innerHTML += `<div class="review">
                    <h4>${reviews[i].name}</h4>
                    <div class="grade"></div>
                    <div class="comment">${reviews[i].comment}</div>
                </div>`

    const reviews_grade = document.getElementsByClassName("grade");
    console.log(reviews_grade)
    
//    const reviews_grade = document.getElementsByClassName(".grade");
//    console.log(reviews_grade)
    
    let j = 0;
    for (; j < reviews[i].grade; j++) {
        reviews_grade[i].innerHTML += `<img src="IMG/star.svg" alt="star">`
    }
    for (; j < 5; j++) {
        reviews_grade[i].innerHTML += `<img src="IMG/star_border.svg" alt="star_border">`
    }
}
