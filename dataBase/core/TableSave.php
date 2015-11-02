<?php
$url_prefix = '../../';
$imageFolder = $url_prefix . '/data/images/';
$dbPath = $url_prefix . './data/json/';
require $url_prefix . "/JsonDB.class.php";
$scanned_directory = array_diff(scandir($dbPath), array('..', '.'));

$db = new JsonDB($dbPath);
//$table = $db->selectAll($_POST['tableName']);

$tableName = $_POST['tableName'];
$data = json_decode($_POST['data']);
$data = $_POST['data'];

var_dump($data, true);

/*foreach ($data as $key) {
	print_r(key($value));
}*/
die();

$db->updateAll($tableName, $data);
