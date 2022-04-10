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
const mainElementHeight = mainElement.clientHeight; // Достаем высоту окна
const introHeight = document.querySelector('.intro').offsetHeight; // 
const windowScrollTop = window.pageYOffset; // Присваивание прокрученных пикселей

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
    menuLinks.forEach(menuLink => { // forEach - перебор массива со значениями (item – очередной элемент массива, i – его номер, arr – массив, который перебирается)
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

