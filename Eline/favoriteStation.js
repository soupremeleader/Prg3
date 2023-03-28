//localStorage.clear();

let markFavorite = document.getElementById("markFavoriteButton");
let isMarkedIcon = false;

let markFavoriteSection = document.getElementById("markFavorite");


let isStationFavorite = localStorage.getItem(markFavoriteSection.dataset.name)!== null;

if (isStationFavorite) {
    isMarkedIcon = true;
    markFavorite.classList.add("yellow");
    markFavorite.classList.remove("white");
}



markFavorite.addEventListener("click", toggleFavoriteIcon);

function toggleFavoriteIcon (e) {

    e.preventDefault();
    isMarkedIcon = !isMarkedIcon;

    if (isMarkedIcon) {
        localStorage.setItem(markFavoriteSection.dataset.name, markFavoriteSection.dataset.id);
        markFavorite.classList.add("yellow");
        markFavorite.classList.remove("white");
    } else {
        localStorage.removeItem(markFavoriteSection.dataset.name);
        markFavorite.classList.remove("yellow");
        markFavorite.classList.add("white");
    }
    console.log(localStorage);
}