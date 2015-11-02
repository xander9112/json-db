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
	<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="site/assets/css/styles.css">
</head>
<body>
<header>
	<nav>
		<div class="nav-wrapper">
			<a href="#" class="brand-logo">Logo</a>
			<ul id="nav-mobile" class="right hide-on-med-and-down">
				<li><a href="sass.html">Sass</a></li>
				<li><a href="badges.html">Components</a></li>
				<li><a href="collapsible.html">JavaScript</a></li>
			</ul>
		</div>
	</nav>
</header>
