import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

import Swiper, { Navigation, Pagination } from 'swiper';

const swiper = new Swiper();

// =========================================
// БУРГЕР
// Достаем кнопку-бургер
let headerBurger = document.querySelector('.header-burger');
// Достаем класс header
let header = document.querySelector('.header');
// Достаем класс nav
let nav = document.querySelector('.nav');

// Ф-я toggle кликом для БУРГЕРА
headerBurger.addEventListener('click', function () { // На headerBurger вешаю знак события, которые срабатывает при клике(click) и запускает функцию
    headerBurger.classList.toggle('active'); // Сама ф-я: 1) classList - штука, которая говорит о том, что мы можем добавить или удалить класс к уже имеющемуся классу 2) toggle - позволяет добавить какой-то класс, если его нет или удалить, если он есть
    header.classList.toggle('active');
    nav.classList.toggle('active');
})

// FIXED HEADER
const mainElement = document.documentElement; // Достаем целый элемент
/* Не работает */ const mainElementHeight = mainElement.clientHeight; // Достаем высоту окна
const introHeight = document.querySelector('.intro').offsetHeight; // 
/* Не работает */ const windowScrollTop = window.pageYOffset; // Присваивание прокрученных пикселей

// window.onscroll - событие прокручивания страницы
window.onscroll = function fixedHeader() {
    if (window.pageYOffset >= (introHeight - 80)) { // 
        header.classList.add('fixed'); // Добавление класса fixed
    } else {
        header.classList.remove('fixed'); // Удаление класса fixed
    }
}

// SMOOTH SCROLL

const menuLinks = document.querySelectorAll('.nav__link[data-scroll]'); // Ищем все .nav__link с атрибутом data-scroll
if (menuLinks.length > 0) { // menuLinks.length > 0 просто проверяет наличие данного класса с атрибутом
    menuLinks.forEach(menuLink => { // forEach - для каждой ссылки выполняется ф-я menuLink, которая вешает событие click с фун-ей onMenuLinkClick  
        menuLink.addEventListener("click", onMenuLinkClick); // Добавление прослушки
    });

    function onMenuLinkClick(e) { // function(e) - e означет event
        const menuLink = e.target; // event.target - Объект на котором сработал обработчик;
        if (menuLink.dataset.scroll && document.querySelector(menuLink.dataset.scroll)) { // dataset.scroll == data-scroll="", т.к. "dataset." == "data-", а ".scroll" == "-scroll" / второй аргумент создан для проверки наличия нужного класса         
            const scrollBlock = document.querySelector(menuLink.dataset.scroll); // выбирает классы с артибутом data-scroll, которые сработали на обработчике
            const scrollBlockValue = scrollBlock.getBoundingClientRect().top + scrollY - 71;/* 71 - высота .header.fixed */ // .getBoundingClientRect() - выдает координаты элемента относительная окна браузера, в данном случае мы использует только парам-р top / offsetHeight - полная высота элемента 
            console.log('ЭТА ЕБАНИНА РАБОТАЕТ');

            window.scrollTo({
                top: scrollBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

// SMOOTH SCROLL btnDown
const btnDown = document.querySelector('.btn__down'); // ищу кнопку
const aboutBlock = document.querySelector('#about'); // ищу блок, к которому идет навигация

// Создание ф-и прокрутки
function btnDownScroll(e) {
    window.scrollTo({
        left: 0,
        top: e.offsetTop,
        behavior: "smooth"
    });
    e.preventDefault();
}

//  Добавление события на кнопку, которая включает ф-ю btnDownScroll,
// которая прокручивает страницу до нужного места
btnDown.addEventListener("click", function () {
    btnDownScroll(aboutBlock);
})


// pop-up VIDEO
const popupLinks = document.querySelectorAll('.popup-link'); // Открытие попапа при клике на ссылки с классом popup-link
const body = document.querySelector('body'); // Чтобы заблокировать скролл body 
const lockPadding = document.querySelectorAll('.lock-padding'); // ...

let unlock = true; // тоже число, что указано в transition в css

const timeout = 300;

// Проверка на существование ссылок на странице
if (popupLinks.length > 0) {
    // Цикл пробегания по ссылкам
    for (let index = 0; index < popupLinks.length; index++) {
        // получение каждой ссылки в отдельную константу со своим index
        const popupLink = popupLinks[index];
        // Вешание события при клике на полученную ссылку
        popupLink.addEventListener("click", function (e) {
            // Получение чистого имени popupName путем замены '#' на '' пустой символ
            const popupName = popupLink.getAttribute('href').replace('#', '');
            // Получение чистого имени popup из ID / curent - текущий 
            const curentPopup = document.getElementById(popupName);
            // ф-я открытия popup
            popupOpen(curentPopup);
            // Запрет перезагрузки страницы (ссылки)
            e.preventDefault();
        });
    }
}

// Закрытие попапа по добавлению класса close-popup
const popupCloseIcon = document.querySelectorAll('.close-popup');
// Проверка на наличие класса
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const element = popupCloseIcon[index];
        element.addEventListener('click', function (e) {
            // При клике идет поиск ближайшего родителя с классом popup
            popupClose(element.closest('.popup'));
            e.preventDefault();
        });
    }
}

// Открытие попапа
function popupOpen(curentPopup) {
    // Проверка наличия чистого имени попапа name && true
    if (curentPopup && unlock) {
        // Получение открытого попапа с классом .open
        const popupActive = document.querySelector('.popup.open');
        // Проверка наличия открытого попапа
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        // Непосредственное добавление класса open для открытия
        curentPopup.classList.add('open');
        // Закрытия попапа при нажатии вне контента
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

// Close popup
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

// Фикса бага скролла при открытии попапа
function bodyLock() {
    // Высчитывание скроллбара
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.lenght > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

// Unblocking scroll
function bodyUnlock() {
    setTimeout(function () {
        if (lockPadding.lenght > 0) {
            for (let index = 0; index < lockPadding.lenght; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

// Close popup if Esc click
document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});