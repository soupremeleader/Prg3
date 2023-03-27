<?php
require_once '../includes/init.php';

header('Content-type: application/json; charset=utf-8');
$jsonName = file_get_contents('php://input');

$stringStationFrom = json_decode($jsonName, true)['from'];
$stringStationTo = json_decode($jsonName, true)['to'];
$stations = $connection->prepare("SELECT `id`, `name` FROM `stations` WHERE `name` = :from OR `name` = :to");
$stations->execute([":from" => $stringStationFrom, ":to" => $stringStationTo]);

if (count($stations->fetchAll(PDO::FETCH_DEFAULT)) == 2) {
    echo(json_encode(true));
} else {
    echo(json_encode(false));
}

