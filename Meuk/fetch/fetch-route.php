<?php
require_once '../includes/init.php';

header('Content-type: application/json; charset=utf-8');
$jsonName = file_get_contents('php://input');

$stringStationFrom = json_decode($jsonName, true)['station_from_name'];
$stringStationTo = json_decode($jsonName, true)['station_to_name'];

$stationFrom = $connection->prepare("SELECT id FROM `stations` WHERE stations.name = :station_from");
$stationFrom->execute([":station_from" => $stringStationFrom]);

$stationTo = $connection->prepare("SELECT id FROM `stations` WHERE stations.name = :station_to");
$stationTo->execute([":station_to" => $stringStationTo]);

$transports = $connection->prepare("SELECT transport_id FROM station_transport INNER JOIN stations ON stations.id = station_transport.station_id WHERE stations.name = :station_from OR stations.name = :station_to");
$transports->execute([":station_from" => $stringStationFrom, ":station_to" => $stringStationTo]);

$stationFromLocation = $connection->prepare("SELECT location_x, location_y FROM `stations` WHERE stations.name = :station_from");
$stationFromLocation->execute([":station_from" => $stringStationFrom]);


echo (json_encode([$stationFrom->fetchAll(PDO::FETCH_DEFAULT), $stationTo->fetchAll(PDO::FETCH_DEFAULT), $transports->fetchAll(PDO::FETCH_DEFAULT), $stationFromLocation->fetchAll(PDO::FETCH_DEFAULT)]));

