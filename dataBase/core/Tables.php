<?php
$url_prefix = '../../';
$imageFolder = $url_prefix . '/data/images/';
$dbPath = $url_prefix . './data/json/';
require $url_prefix . "/JsonDB.class.php";
$scanned_directory = array_diff(scandir($dbPath), array('..', '.'));

$tables = array();


foreach ($scanned_directory as $table) {
    $tables[] = substr($table, 0, -5);
}

echo json_encode($tables);
