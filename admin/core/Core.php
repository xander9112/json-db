<?php
$imageFolder = $url_prefix . '/data/images/';

$dbPath = $project_dir . '/data/json/';

require $project_dir . "/admin/JsonDB.class.php";

$db = new JsonDB($dbPath);

$scanned_directory = array_diff(scandir($dbPath), array('..', '.'));

$tables = array();

foreach ($scanned_directory as $table) {
    $tables[] = substr($table, 0, -5);
}

$db = new JsonDB($dbPath);
