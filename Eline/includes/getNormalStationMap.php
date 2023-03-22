<?php 

 require_once "database.php";

 $_GET['name'] = 1;
$station_id = $_GET['name'];

$query = "SELECT * FROM stations WHERE 'name' = $station_id";

$result = mysqli_query($db, $query)
    or die('error: '.mysqli_error($db).' with query '.$query);

$stations = [];

while($row = mysqli_fetch_assoc($result)){
    $stations[] = $row;
}

$img_src = $stations[0]["image"];