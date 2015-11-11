<?php
require "Core.php";

$tables = array();


foreach ($scanned_directory as $table) {
    $tables[] = substr($table, 0, -5);
}

$menu = array(
    "Главная" => '/admin',
    "tables" => array(
        'Таблицы' => 'tables',
        'links' => $tables
    )
);

echo json_encode($menu);
