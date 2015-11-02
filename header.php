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
    <link rel="stylesheet" type="text/css" href="<?=$url_prefix?>/site/assets/css/style.css">
</head>
<body>
