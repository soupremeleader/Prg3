<?php

require_once "includes/database.php";

$_GET['name'] = 1;
$station_id = $_GET['name'];

$query = "SELECT * FROM stations WHERE id = '$station_id'";

$result = mysqli_query($db, $query)
    or die('error: '.mysqli_error($db).' with query '.$query);

$stations = [];

while($row = mysqli_fetch_assoc($result)){
    $stations[] = $row;
}

$query = "SELECT * FROM icons JOIN types ON icons.type_id = types.id WHERE station_id = $station_id";

$result = mysqli_query($db, $query)
    or die('error: '.mysqli_error($db).' with query '.$query);

$icons = [];

while($row = mysqli_fetch_assoc($result)){
    $icons[] = $row;
}

foreach($icons as $icon) {
    switch($icon['name']) {
        case "informatie punten": {
            $station_info = $icon['amount'];
        }
        case "toiletten": {
            $station_toilets = $icon["amount"];
        }
        case "liften": {
            $station_elevators = $icon["amount"];
        }
        case "ov-oplaad punten": {
            $station_ov = $icon["amount"];
        }
        case "winkels": {
            $station_shops = $icon["amount"];
        }
    }
}

$img_src = $stations[0]["image"];
$station_name = $stations[0]["station"];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/stationmap.css">
    <script type="text/javascript" src="stationmap.js" defer></script>
    <script type="text/javascript" src="favoriteStation.js" defer></script>
    <script src="https://kit.fontawesome.com/f6c855ada2.js" crossorigin="anonymous"></script>
</head>

<body>

    <header>
        <section id = "back_button">
            <button> <a href=""> <i class="fa-solid fa-caret-left"></i> Ga terug </a> </button>
        </section>
        <section id = "favorites">
            <button> <a href="favoriteStationsAll.php"> <i class="fa-solid fa-star fa-xl"></i> </a> </button>
        </section>
    </header>

    <section id = "current_station">
        <h1> Huidig station </h1>
        <section id = "markFavorite" data-name="<?= $station_name ?>" data-id="<?= $station_id ?>">
            <h2> <?= $station_name ?> </h2> <button> 
            <a href="" id = "markFavoriteButton" class="white"> <i class="fa-solid fa-star fa-xl"></i> </a> </button>
        </section>
    </section>

    <section id = "station_map">
        <img src = <?= $img_src ?> id="station_map_img"/>
    </section>

    <section id = "facilities">
        <h2> Faciliteiten </h2>

        <section id = facility_icons>
            <section id = "icons_1">
                <section class = "map_icon">
                    <img src = "images/icons/infoIcon.png" data-id=<?= $station_id ?> data-type="info" class="iconImgs"/>
                    <section class = "icon_description">
                        <h3> Informatie punten </h3>
                        <P> <?= $station_info ?> aanwezig </P>
                    </section>
                </section>
                <section class = "map_icon">
                    <img src = "images/icons/wcIcon.png" data-id=<?= $station_id ?> data-type="toilets" class="iconImgs"/>
                    <section class = "icon_description">
                        <h3> Toiletten </h3>
                        <P> <?= $station_toilets ?> aanwezig </P>
                    </section>
                </section>
                <section class = "map_icon">
                    <img src = "images/icons/elevatorIcon.png" data-id=<?= $station_id ?> data-type="elevators" class="iconImgs"/>
                    <section class = "icon_description">
                        <h3> Liften </h3>
                        <P> <?= $station_elevators ?> aanwezig </P>
                    </section>
                </section>
                <section class = "map_icon">
                    <img src = "images/icons/stairsIcon.png" data-id=<?= $station_id ?> data-type="stairs" class="iconImgs"/>
                    <section class = "icon_description">
                        <h3> Trappen </h3>
                    </section>
                </section>
            </section>

            <section id = "icons_2">
                <section class = "map_icon">
                    <img src = "images/icons/ovIcon.png" data-id=<?= $station_id ?> data-type="ov" class="iconImgs"/>
                    <section class = "icon_description">
                        <h3> OV oplaad punten </h3>
                        <P> <?= $station_ov ?> aanwezig </P>
                    </section>
                </section>
                <section class = "map_icon">
                    <img src = "images/icons/benchIcon.png" data-id=<?= $station_id ?> data-type="bench" class="iconImgs"/>
                    <section class = "icon_description">
                        <h3> Zitplaatsen </h3>
                    </section>
                </section>
                <section class = "map_icon">
                    <img src = "images/icons/shopIcon.png" data-id=<?= $station_id ?> data-type="shop" class="iconImgs"/>
                    <section class = "icon_description">
                        <h3> Winkels </h3>
                        <P> <?= $station_shops ?> aanwezig </P>
                    </section>
                </section>
                <section class = "map_icon no_variant">
                    <img src = "images/icons/incheckIcon.png"/>
                    <section class = "icon_description">
                        <h3> Incheck poortjes </h3>
                    </section>
                </section>
            </section>
        </section>
    </section>



</body>

</html>