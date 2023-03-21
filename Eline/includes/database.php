<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'stationmaps';

$db = mysqli_connect($host, $username, $password, $database)
    or die('error: ' .mysqli_connect_error());

?>