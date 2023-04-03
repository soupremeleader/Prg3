let addFavourites = document.getElementById("favourites");
let stationInputFrom = document.getElementById("from_input");
let stationInputTo = document.getElementById("to_input");

let isFavoured;
if (localStorage.getItem(stationInputFrom.value) === stationInputTo.value) {
    isFavoured = true;
} else {
    isFavoured = false;
}

addFavourites.addEventListener('click', switchFavourites);
// localStorage.clear();

function switchFavourites(e) {
    if (isFavoured) {
        e.target.src = "../scss/img/star-regular.svg";
    } else {
        fetch("../fetch/fetch-stations-exist.php",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    "from": stationInputFrom.value,
                    "to": stationInputTo.value
                })
            }).then(res => res.json()).then(data => {
                if (data) {
                    e.target.src = "../scss/img/star-solid.svg";
                    isFavoured = !isFavoured;
                    localStorage.setItem(stationInputFrom.value, stationInputTo.value);
                    console.log(localStorage);
                }
            }).catch(error => console.log(error));
    }
}