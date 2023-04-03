let stationDatalists = document.getElementsByClassName("station_lists");
let favouriteIcon = document.getElementById("favourites");
let stationInputFrom = document.getElementById("from_input");
let stationInputTo = document.getElementById("to_input");

for (let i = 0; i < stationDatalists.length; i++) {
    stationDatalists[i].addEventListener('click', function(e) {
        console.log("hello");
    })
}