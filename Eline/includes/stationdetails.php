<?php
require_once "../includes/database.php";

$_GET['name'] = 1;
$station_id = $_GET['name'];

$query = "SELECT * FROM icons JOIN types ON icons.type_id = types.id WHERE station_id = $station_id AND icons.amount IS NOT NULL";

$result = mysqli_query($db, $query)
    or die('error: '.mysqli_error($db).' with query '.$query);

$station = [];

while($row = mysqli_fetch_assoc($result)){
    $station[] = $row;
}
echo(json_encode($station));

?>