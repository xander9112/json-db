<?php
$url_prefix = '../../';
$imageFolder = $url_prefix . '/data/images/';
$dbPath = $url_prefix . './data/json/';
require $url_prefix . "/JsonDB.class.php";
$scanned_directory = array_diff(scandir($dbPath), array('..', '.'));

$db = new JsonDB($dbPath);
$table = $db->selectAll($_POST['tableName']);

if(sizeof($table)) {
	echo json_encode(array(
		"success" => TRUE,
		"data" => $table,
	));
} else {
	echo json_encode(array(
		"success" => FALSE,
		"message" => "Таблица пустая",
	));
}
