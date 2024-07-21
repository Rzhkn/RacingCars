//добавление карточек с информацией об автомобиле
const objects = document.querySelector(".objects");

for (i = 0; i < db.length && i < 6; i++) {
    objects.innerHTML += `<div class="object">
                            <div class="img"> <img src="BD/IMG/${db[i].auto.img}" alt="auto${i+1}"> </div>
                            <h4>${db[i].auto.title}</h4>
                            <div class="info">
                                <div class="inf">
                                    <p>Год выпуска <span class="i">${db[i].auto.info.yearOfIssue}</span></p>
                                    <p title="${db[i].auto.info.kpp2}">КПП <span class="i">${db[i].auto.info.kpp}</span></p>
                                    <p>Мест <span class="i">${db[i].auto.info.seats}</span></p>
                                </div>
                                <div class="price">
                                    <p>Цена <span class="i">${db[i].parameters.price} руб</span></p>
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


const navAuto = document.querySelector(".nav_auto");

if (db.length > 5) {
    for (i = 1;
        (i - 1) * 6 < db.length; i++) {
        navAuto.innerHTML += `<div class="num_auto color_auto" onclick="funNav(${i-1})">${i}</div>`
    }

    const numAuto = document.querySelector(".num_auto");
    numAuto.classList.remove("color_auto");
    numAuto.classList.add("color_auto_A");
}

function funNav(a) {
    const fNumAuto = document.getElementsByClassName('num_auto');
    for (i = 0; i < fNumAuto.length; i++) {
        if (fNumAuto[i].classList.contains("color_auto_A")) {
            fNumAuto[i].classList.remove("color_auto_A");
            fNumAuto[i].classList.add("color_auto");
        }
    }
    fNumAuto[a].classList.remove("color_auto");
    fNumAuto[a].classList.add("color_auto_A");

    const fObjects = document.querySelector(".objects");
    fObjects.innerHTML = "";
    for (i = a*6; i < db.length && i < a*6+6; i++) {
        fObjects.innerHTML += `<div class="object">
                            <div class="img"> <img src="BD/IMG/${db[i].auto.img}" alt="auto${i+1}"> </div>
                            <h4>${db[i].auto.title}</h4>
                            <div class="info">
                                <div class="inf">
                                    <p>Год выпуска <span class="i">${db[i].auto.info.yearOfIssue}</span></p>
                                    <p title="${db[i].auto.info.kpp2}">КПП <span class="i">${db[i].auto.info.kpp}</span></p>
                                    <p>Мест <span class="i">${db[i].auto.info.seats}</span></p>
                                </div>
                                <div class="price">
                                    <p>Цена <span class="i">${db[i].parameters.price} руб</span></p>
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
                                <p class="text_ch"><input type="checkbox" name="${masBody[i]}" value="1417"> ${masBody[i]}</p>`;
    } else {
        scrBody2.innerHTML += `
                            <p class="text_ch"><input type="checkbox" name="${masBody[i]}" value="1417"> ${masBody[i]}</p>`;
    }
}

const scrClass1 = document.querySelector(".scr_class1");
const scrClass2 = document.querySelector(".scr_class2");
for (i = 0; i < masClass.length; i++) {
    if (i < masClass.length / 2) {
        scrClass1.innerHTML += `
                                <p class="text_ch"><input type="checkbox" name="${masClass[i]}" value="1417"> ${masClass[i]}</p>`;
    } else {
        scrClass2.innerHTML += `
                            <p class="text_ch"><input type="checkbox" name="${masClass[i]}" value="1417"> ${masClass[i]}</p>`;
    }
}

const scrMake1 = document.querySelector(".scr_make1");
const scrMake2 = document.querySelector(".scr_make2");
for (i = 0; i < masMake.length; i++) {
    if (i < masMake.length / 2) {
        scrMake1.innerHTML += `
                                <p class="text_ch"><input type="checkbox" name="${masMake[i]}" value="1417"> ${masMake[i]}</p>`;
    } else {
        scrMake2.innerHTML += `
                            <p class="text_ch"><input type="checkbox" name="${masMake[i]}" value="1417"> ${masMake[i]}</p>`;
    }
}
