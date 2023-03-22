window.addEventListener('load', init);

let mapIcons;
let iconImgs;
let map; 
let clicked = false;
let currentSrc = '';

function init() {

    mapIcons = document.getElementsByClassName("map_icon");
    iconImgs = document.getElementsByClassName("iconImgs");
    map = document.getElementById("station_map_img");

    for (let i = 0; i < mapIcons.length; i++) {
        if (!mapIcons[i].classList.contains("no_variant")) {
            mapIcons[i].addEventListener('click', getIconUrl);
        }
    }
}

function getIconUrl(e) {

    fetch("includes/getIconUrl.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            "id": e.target.dataset.id,
            "icon": e.target.dataset.type
        })
    })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(ajaxSuccessHandler)
        .catch(ajaxErrorHandler)
}

function clickAgain(e) {

    fetch("includes/getNormalStationMap.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            "id": e.target.dataset.id,
        })
    })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(ajaxSuccessHandler)
        .catch(ajaxErrorHandler)
}

function ajaxSuccessHandler(data) {

    if(clicked) {
        clicked = false;
        map.src = currentSrc;
    } else {

        for (let i = 0; i < iconImgs.length; i++) {

            switch(iconImgs[i].dataset.type) {
                case data[0].name: {
                    currentSrc = map.src;

                    map.src = data[0].map_url;
                }
            }
        }
        clicked = true;
    }
}

function ajaxErrorHandler(data) {
    console.log(data);
}
