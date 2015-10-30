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
    <link rel="stylesheet" type="text/css" href="../site/assets/css/style.css">
</head>
<body>
<nav class="p-menu">
    <div class="logo-wrapper">
        <a class="logo">
            <img class="logo-image" src="../site/assets/images/logo.png" alt="logo">
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
<div class="p-page">
    <div class="p-header">
        <div class="common">
            <p>Липецк</p>

            <p class="highlighted">123456</p>

            <p>Информация</p>
        </div>
        <div class="services">
            <p>Сравнить</p>

            <p>Корзина пуста</p>

            <p>Вход</p>
        </div>
    </div>
    <div class="p-content-wrapper">
