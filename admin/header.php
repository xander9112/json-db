<?
$urlPrefix = '/admin';
$urlAssets = $urlPrefix . '/site/assets';

require "/config.php";
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Админка для создания рыбы</title>
    <link rel="stylesheet" type="text/css" href="<?= $urlAssets; ?>/css/styles.css">
</head>
<body class="js-application">
<header>
    <? include('/navigation.php'); ?>
</header>
<div class="g-messages"></div>
