<?php
$url_prefix = '../';
$imageFolder = $url_prefix . '/data/images/';
$dbPath = $url_prefix . './data/json/';
require $url_prefix . "/JsonDB.class.php";
$db = new JsonDB($dbPath);  //parameter => directory to your json files

//$catalog = $db->selectAll("catalog"); //parameter => json file (tablename), key, value
?>

<!DOCTYPE html >
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Админка для создания рыбы</title>
    <link rel="stylesheet" type="text/css" href="site/assets/css/style.css">
</head>
<body>

<script src="site/assets/js/vendor-bundle.js"></script>
<script src="site/assets/js/app.js"></script>
</body>
</html>
