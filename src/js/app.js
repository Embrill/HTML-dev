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
const windowScrollTop = window.pageYOffset; // Присваивание прокрученных пикселей

// window.onscroll - событие прокручивания страницы
window.onscroll = function fixedHeader() {
    if (window.pageYOffset >= (mainElementHeight - 100)) {
        header.classList.add('fixed'); // Добавление класса fixed
    } else {
        header.classList.remove('fixed'); // Удаление класса fixed
    }
}




