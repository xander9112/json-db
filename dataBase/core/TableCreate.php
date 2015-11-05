<?php
$url_prefix = '../../';
$imageFolder = $url_prefix . '/data/images/';
$dbPath = $url_prefix . './data/json/';
require $url_prefix . "/JsonDB.class.php";
$scanned_directory = array_diff(scandir($dbPath), array('..', '.'));

$db = new JsonDB($dbPath);

$tableName = $_POST['tableName'];

if ($db->createTable($tableName)) {
	echo json_encode(array("success" => TRUE));
}
