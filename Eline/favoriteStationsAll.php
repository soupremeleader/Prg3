<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/stationmap.css">
    <script type="text/javascript" src="favoriteStationsAll.js" defer></script>
    <script src="https://kit.fontawesome.com/f6c855ada2.js" crossorigin="anonymous"></script>
</head>

<body id="body">

    <header>
        <section id = "back_button">
            <button> <a href="stationmap.php"> <i class="fa-solid fa-caret-left"></i> Ga terug </a> </button>
        </section>
    </header>

    <section id = "overviewFavorites">
        <h1> Favoriete stations: </h1>
        <section id = "favoritedStations">

            <dialog class="modal" id="favotite-station-detail">
                <button class="modal-close" id="close-details"> <i class="fa-solid fa-xmark fa-2xl"></i> </button>
                <section class="modal-content" id="favorite-station-details">

                </section>
            </dialog>

        </section>
    </section>

</body>

</html>