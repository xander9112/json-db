<?php
$url_prefix = '';
$imageFolder = $url_prefix . '/data/images/';
$dbPath = $url_prefix . './data/json/';
require $url_prefix . "/JsonDB.class.php";
$db = new JsonDB($dbPath);  //parameter => directory to your json files
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>5 element</title>
    <link rel="stylesheet" type="text/css" href="<?= $url_prefix ?>/site/assets/css/style.css">
</head>
<body>
<div class="container-fluid">
    <div class="row">
        <nav class="p-menu col-md-2">
            <div class="logo-wrapper">
                <a class="logo" href="/">
                    <img class="logo-image" src="<?= $url_prefix ?>/site/assets/images/logo.png" alt="logo">
				<span class="company-name">
					Пятый
					элемент
				</span>
                </a>

                <p class="description">
                    Инженерно
                    технические
                    средства
                    безопасности
                </p>
            </div>
        </nav>
        <div class="p-page col-md-8">
            <div class="p-header-wrapper">
                <div class="p-city-group">
                    <div class="inner">
                        <form class="search-form">
                            <input type="text" class="search-input" placeholder="Поиск">
                            <button class="search-button" type="submit">
								<span>
									Найти
									<span class="g-icon g-icon-search search-icon"></span>
								</span>
                            </button>
                        </form>
                    </div>
                    <span class="close-icon">+</span>
                    <ul class="items">
                        <li class="item letter">а</li>
                        <li class="item">Абакан</li>
                        <li class="item">Азов</li>
                        <li class="item">Альметьевск</li>
                        <li class="item">Анапа</li>
                        <li class="item">Арзамас</li>
                        <li class="item">Астрахань</li>
                        <li class="item">Аткарск</li>
                        <li class="item">Ахтубинск</li>
                        <li class="item">Ачинск</li>
                        <li class="item letter">б</li>
                        <li class="item">Балаково</li>
                        <li class="item">Балахна</li>
                        <li class="item">Балашиха</li>
                        <li class="item">Балашов</li>
                        <li class="item">Батайск</li>
                        <li class="item priority">Белгород</li>
                        <li class="item">Березники</li>
                        <li class="item">Богородск</li>
                        <li class="item">Бор</li>
                        <li class="item">Борисоглебск</li>
                        <li class="item">Бугульма</li>
                        <li class="item">Бугуруслан</li>
                        <li class="item">Бузулук</li>
                        <li class="item transparent">Невидимый текст</li>
                        <li class="item letter">в</li>
                        <li class="item">Великий Новгород</li>
                        <li class="item">Владимир</li>
                        <li class="item">Волгоград</li>
                        <li class="item">Волгодонск</li>
                        <li class="item">Волжск</li>
                        <li class="item">Волжский</li>
                        <li class="item">Вологда</li>
                        <li class="item">Вольск</li>
                        <li class="item priority">Воронеж</li>
                        <li class="item">Ворсма</li>
                        <li class="item">Выборг</li>
                        <li class="item">Выкса</li>
                        <li class="item">Вязники</li>
                        <li class="item">Вятские Поляны</li>
                        <li class="item letter">г</li>
                        <li class="item">Гатчина</li>
                        <li class="item">Геленджик</li>
                        <li class="item">Георгиевск</li>
                        <li class="item">Городец</li>
                        <li class="item">Гороховец</li>
                        <li class="item letter">д</li>
                        <li class="item">Дзержинск</li>
                        <li class="item">Димитровград</li>
                        <li class="item">Дмитров</li>
                        <li class="item">Долгопрудный</li>
                        <li class="item">Домодедово</li>
                        <li class="item letter">е</li>
                        <li class="item">Ейск</li>
                        <li class="item">Екатеринбург</li>
                        <li class="item">Елабуга</li>
                        <li class="item letter">ж</li>
                        <li class="item">Железногорск</li>
                        <li class="item">Железнодорожный</li>
                        <li class="item">Жигулевск</li>
                        <li class="item">Жирновск</li>
                        <li class="item">Жуковский</li>
                        <li class="item letter">з</li>
                        <li class="item">Заволжье</li>
                        <li class="item">Закамск</li>
                        <li class="item">Заречный</li>
                        <li class="item">Зеленогорск</li>
                        <li class="item">Зеленоград</li>
                        <li class="item">Зеленодольск</li>
                        <li class="item">Златоуст</li>
                        <li class="item">Знаменск</li>
                        <li class="item letter">и</li>
                        <li class="item">Иваново</li>
                        <li class="item">Изобильный</li>
                        <li class="item transparent">Невидимый текст</li>
                        <li class="item letter">й</li>
                        <li class="item">Йошкар-Ола</li>
                        <li class="item letter">к</li>
                        <li class="item">Казань</li>
                        <li class="item">Калач-на-Дону</li>
                        <li class="item">Калуга</li>
                        <li class="item">Каменск-Уральский</li>
                        <li class="item light">Каменск-Шахтинский</li>
                        <li class="item">Камышин</li>
                        <li class="item">Каневская</li>
                        <li class="item">Канск</li>
                        <li class="item">Кинель</li>
                        <li class="item">Кириши</li>
                        <li class="item">Клин</li>
                        <li class="item">Ковров</li>
                        <li class="item">Колпино</li>
                        <li class="item">Копейск</li>
                        <li class="item">Королев</li>
                        <li class="item">Кострома</li>
                        <li class="item">Котельниково</li>
                        <li class="item">Котово</li>
                        <li class="item">Красногорск</li>
                        <li class="item">Краснодар</li>
                        <li class="item">Краснокамск</li>
                        <li class="item">Красноярск</li>
                        <li class="item letter">л</li>
                        <li class="item">Лениногорск</li>
                        <li class="item priority">Липецк</li>
                        <li class="item">Лысково</li>
                        <li class="item">Люберцы</li>
                        <li class="item letter">м</li>
                        <li class="item">Магнитогорск</li>
                        <li class="item">Майкоп</li>
                        <li class="item">Маркс</li>
                        <li class="item">Миасс</li>
                        <li class="item">Михайловка</li>
                        <li class="item">Морозовск</li>
                        <li class="item">Москва</li>
                        <li class="item">Муром</li>
                        <li class="item">Мытищи</li>
                        <li class="item letter">т</li>
                        <li class="item">Таганрог</li>
                        <li class="item">Тамбов</li>
                        <li class="item">Тамбов</li>
                        <li class="item">Тверь</li>
                        <li class="item">Тимашевск</li>
                        <li class="item">Тихорецк</li>
                        <li class="item">Тольятти</li>
                        <li class="item">Тосно</li>
                        <li class="item">Троицк</li>
                        <li class="item letter">ф</li>
                        <li class="item">Фролово</li>
                        <li class="item letter">х</li>
                        <li class="item">Химки</li>
                        <li class="item letter">ч</li>
                        <li class="item">Чапаевск</li>
                        <li class="item">Чебоксары</li>
                        <li class="item">Челябинск</li>
                        <li class="item">Череповец</li>
                        <li class="item">Черкесск</li>
                        <li class="item">Чехов</li>
                        <li class="item">Чистополь</li>
                        <li class="item">Чкаловск</li>
                        <li class="item letter">ш</li>
                        <li class="item">Шахты</li>
                        <li class="item">Шуя</li>
                        <li class="item letter">щ</li>
                        <li class="item">Щёлково</li>
                        <li class="item letter">э</li>
                        <li class="item">Элиста</li>
                        <li class="item">Энгельс</li>
                        <li class="item letter">я</li>
                        <li class="item">Ярославль</li>
                    </ul>
                </div>
                <div class="p-user-form login-form">
                    <span class="close-icon">+</span>

                    <form class="form">
                        <div class="tabs">
                            <span class="tab active">Вход</span>
                            <span class="tab">Регистрация</span>
                        </div>
                        <div class="form-group">
                            <label class="label" for="login-form-header-email-input">E-mail</label>
                            <input class="input" id="login-form-header-email-input">
                            <span class="error-message">Введите логин</span>
                        </div>
                        <div class="form-group">
                            <label class="label" for="login-form-header-password-input">Пароль</label>
                            <input class="input" id="login-form-header-password-input">
                            <i class="g-icon g-icon-eye-closed eye"></i>
                        </div>
                        <div class="action-wrapper">
                            <input type="submit" class="submit" value="Войти">
                            <span class="restore">Восстановить пароль</span>
                        </div>
                    </form>
                </div>
                <div class="p-user-form wide call-me feedback-form">
                    <span class="close-icon">+</span>

                    <form class="form">
                        <div class="tabs">
                            <span class="tab">Перезвонить мне</span>
                            <span class="tab active">Задать вопрос</span>
                        </div>
                        <div class="form-group">
                            <label class="label" for="feedback-form-header-name-input">Имя <sup
                                    class="sup">*</sup></label>
                            <input class="input" id="feedback-form-header-name-input">
                        </div>
                        <div class="form-group may-hide">
                            <label class="label" for="feedback-form-header-password-input">E-mail <sup
                                    class="sup">*</sup></label>
                            <input class="input" id="feedback-form-header-password-input">
                        </div>
                        <div class="form-group">
                            <label class="label" for="feedback-form-header-phone-input">Телефон</label>
                            <input class="input" id="feedback-form-header-phone-input">
                        </div>
                        <div class="form-group may-hide">
                            <label class="label" for="feedback-form-header-order-input">Заказ №</label>
                            <input class="input" id="feedback-form-header-order-input">
                        </div>
                        <div class="form-group big may-hide">
                            <label class="label" for="feedback-form-header-question-text">Вопрос <sup
                                    class="sup">*</sup></label>
                            <textarea id="feedback-form-header-question-text" class="input"></textarea>
                        </div>
                        <div class="action-wrapper">
                            <input type="submit" class="submit" value="Отправить">
                        </div>
                    </form>
                </div>
                <div class="p-info">
                    <span class="close-icon">+</span>
                    <ul class="items">
                        <li class="item">
                            <a class="text">О компании</a>
                        </li>
                        <li class="item">
                            <a class="text">Новости</a>
                        </li>
                        <li class="item">
                            <a class="text">Наши магазины</a>
                        </li>
                        <li class="item">
                            <a class="text">Контактая информация</a>
                        </li>
                        <li class="item">
                            <a class="text">Как сделать заказ</a>
                        </li>
                        <li class="item">
                            <a class="text">Оплата</a>
                        </li>
                        <li class="item active">
                            <a class="text">Доставка</a>
                        </li>
                        <li class="item">
                            <a class="text">Гарантия</a>
                        </li>
                        <li class="item">
                            <a class="text">Часто задаваемые вопросы</a>
                        </li>
                        <li class="item">
                            <a class="text">Акции и скидки</a>
                        </li>
                        <li class="item">
                            <a class="text">Прайс-листы</a>
                        </li>
                        <li class="item">
                            <a class="text">Форум</a>
                        </li>
                    </ul>
                </div>
                <div class="p-profile">
                    <span class="close-icon"></span>
                    <ul class="items">
                        <li class="item">
                            <a class="text">Редактировать профиль</a>
                        </li>
                        <li class="item">
                            <a class="text">История заказов</a>
                        </li>
                        <li class="item">
                            <a class="text">Корзина</a>
                        </li>
                        <li class="item">
                            <a class="text">Состояние заказов</a>
                        </li>
                        <li class="item active">
                            <a class="text">Выход</a>
                        </li>
                    </ul>
                </div>
                <div class="p-header js-upper-header">
                    <div class="common">
                        <div class="list-item cities-drop-list">
                            <p class="group-item dotted">Липецк</p>
                        </div>
                        <div class="list-item send-message">
                            <p class="group-item highlighted dotted">+7 (4742) 28-66-66</p>
                        </div>
                        <div class="list-item information">
                            <p class="group-item">Информация</p>
                        </div>
                        <div class="list-item">
                            <p class="group-item">Монтаж</p>
                        </div>
                    </div>
                    <div class="services">
                        <div class="list-item right-border">
                            <p class="group-item">Сравнить</p>
                        </div>
                        <div class="list-item">
                            <span class="g-icon g-icon-basket basket"></span>

                            <p class="group-item">
                                Корзина пуста
                            </p>
                        </div>
                        <div class="list-item left-border enter">
                            <p class="group-item wide">Вход</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-content-wrapper">



