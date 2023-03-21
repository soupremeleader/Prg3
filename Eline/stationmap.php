<?php

require_once "includes/database.php";

$_GET['id'] = 1;
$station_id = $_GET['id'];

$query = "SELECT * FROM stations WHERE id = $station_id";

$result = mysqli_query($db, $query)
    or die('error: '.mysqli_error($db).' with query '.$query);

$station = [];

while($row = mysqli_fetch_assoc($result)){
    $station[] = $row;
}

$img_src = $station[0]["image"];
$station_name = $station[0]["station"];
$station_info = $station[0]["info"];
$station_toilets = $station[0]["toilets"];
$station_elevators = $station[0]["elevator"];
$station_ov = $station[0]["ov"];
$station_shops = $station[0]["shops"];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="stationmap.css">
    <script src="https://kit.fontawesome.com/f6c855ada2.js" crossorigin="anonymous"></script>
</head>

<body>

    <header>
        <section id = "back_button">
            <button> <a href=""> <i class="fa-solid fa-caret-left"></i> Ga terug </a> </button>
        </section>
        <section id = "favorites">
            <button> <a href=""> <i class="fa-solid fa-star fa-xl"></i> </a> </button>
        </section>
    </header>

    <section id = "current_station">
        <h1> Huidig station </h1>
        <h2> <?= $station_name ?> </h2>
    </section>

    <section id = "station_map">
        <img src = <?= $img_src ?> />
    </section>

    <section id = "facilities">
        <h2> Faciliteiten </h2>

        <section id = facility_icons>
            <section id = "icons_1">
                <section class = "map_icon">
                    <img src = "images/icons/infoIcon.png" />
                    <section class = "icon_description">
                        <h3> Informatie punten </h3>
                        <P> <?= $station_info ?> aanwezig </P>
                    </section>
                </section>
                <section class = "map_icon">
                    <img src = "images/icons/wcIcon.png" />
                    <section class = "icon_description">
                        <h3> Toiletten </h3>
                        <P> <?= $station_toilets ?> aanwezig </P>
                    </section>
                </section>
                <section class = "map_icon">
                    <img src = "images/icons/elevatorIcon.png" />
                    <section class = "icon_description">
                        <h3> Liften </h3>
                        <P> <?= $station_elevators ?> aanwezig </P>
                    </section>
                </section>
                <section class = "map_icon">
                    <img src = "images/icons/stairsIcon.png" />
                    <section class = "icon_description">
                        <h3> Trappen </h3>
                    </section>
                </section>
            </section>

            <section id = "icons_2">
                <section class = "map_icon">
                    <img src = "images/icons/ovIcon.png" />
                    <section class = "icon_description">
                        <h3> OV oplaad punten </h3>
                        <P> <?= $station_ov ?> aanwezig </P>
                    </section>
                </section>
                <section class = "map_icon">
                    <img src = "images/icons/benchIcon.png" />
                    <section class = "icon_description">
                        <h3> Zitplaatsen </h3>
                    </section>
                </section>
                <section class = "map_icon">
                    <img src = "images/icons/shopIcon.png" />
                    <section class = "icon_description">
                        <h3> Winkels </h3>
                        <P> <?= $station_shops ?> aanwezig </P>
                    </section>
                </section>
                <section class = "map_icon">
                    <img src = "images/icons/incheckIcon.png" />
                    <section class = "icon_description">
                        <h3> Incheck poortjes </h3>
                    </section>
                </section>
            </section>
        </section>
    </section>



</body>

</html>