<?php
require_once "../includes/database.php";
// echo("hello");
header('Content-type: application/json; charset=utf-8');
$jsonIconInfo = file_get_contents('php://input');

$station_id = json_decode($jsonIconInfo, true)['id'];
$icon = json_decode($jsonIconInfo, true)['icon'];

$query = "SELECT types.name, map_url FROM stations JOIN icons ON stations.id=icons.station_id JOIN types ON icons.type_id = types.id WHERE stations.id = '$station_id' AND types.name = '$icon'";

$result = mysqli_query($db, $query)
    or die('error: '.mysqli_error($db).' with query '.$query);

$stations = [];

while($row = mysqli_fetch_assoc($result)){
    $stations[] = $row;
}

echo(json_encode($stations));