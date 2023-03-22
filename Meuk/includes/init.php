<?php
use Prg3\Databases\Database;

require_once 'settings.php';
require_once 'classes/phpClasses/Database.php';

try {
    $db = new Database(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    $connection = $db->getConnection();
} catch (Exception $e) {
    //Set error variable for template
    $error = 'Oops, try to fix your error please: ' .
        $e->getMessage() . ' on line ' . $e->getLine() . ' of ' .
        $e->getFile();
}