<?php
require_once '../includes/init.php';

header('Content-type: application/json; charset=utf-8');
$jsonName = file_get_contents('php://input');

$transport_ids = json_decode($jsonName, true)['transport_ids'];
$stations = $connection->prepare("SELECT `type_name`, stations.* FROM `transports` INNER JOIN `types` ON type_id = types.id INNER JOIN `station_transport` ON transport_id = transports.id INNER JOIN `stations` ON station_transport.station_id = stations.id WHERE transports.id = :transport_id ORDER BY stations.arrival_time");
$stations->execute([":transport_id" => $transport_ids[0]]);

echo (json_encode($stations->fetchAll(PDO::FETCH_DEFAULT)));