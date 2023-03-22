<?php
require_once '../includes/init.php';

header('Content-type: application/json; charset=utf-8');
$jsonName = file_get_contents('php://input');

$stringName = json_decode($jsonName, true)['name'];
$stations = $connection->prepare("SELECT `id`, `name` FROM `stations` WHERE `name` LIKE CONCAT ('%', :name, '%')");
$stations->execute([":name" => $stringName]);

echo (json_encode($stations->fetchAll(PDO::FETCH_DEFAULT)));

