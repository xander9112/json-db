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

//$catalog = $db->selectAll("catalog"); //parameter => json file (tablename), key, value


/*class Table
{
    function __constructor()
    {
        $this->$db = new JsonDB($dbPath);  //parameter => directory to your json files
    }


    function getTable()
    {
        var_dump($this);
    }
}



$table = new Table();*/
$db = new JsonDB($dbPath);




echo json_encode($tables);
