window.addEventListener('load', init);

let stationData = [];
let body
let stationPopup;
let closePopup;
let stationDetails;
let stationId
let stationName

console.log(localStorage);

function init(e) {

    body = document.getElementById("favoritedStations");
    stationPopup = document.getElementById("favotite-station-detail");
    closePopup = document.getElementById("close-details");
    stationDetails = document.getElementById("favorite-station-details");

    for (let i = 0; i < localStorage.length; i++) {

        stationName = localStorage.key(i);
        stationId = localStorage.getItem(stationName);
    
        let section = document.createElement("section");
        section.classList.add("favorited-station-name");
    
        section.innerHTML = stationName;
        body.appendChild(section);

        section.addEventListener('click', function () {
            fetch("includes/stationdetails.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    "id": stationId
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
        })
    }
}

function ajaxSuccessHandler(data) {
    //console.log(data);
    stationDetails.innerHTML = '';

    let stationTitle = document.createElement("h2");
    stationDetails.appendChild(stationTitle);
    stationTitle.innerText = stationName;


    for (let type of data){

        //HTML element aanmaken en appendchilden

        let stationSpecs = document.createElement("p");
        stationDetails.appendChild(stationSpecs);
        stationSpecs.innerText = `er zijn ${type.amount} ${type.name} aanwezig`;

        console.log(stationSpecs.innerText);
    }

    let thisStationMap = document.createElement("a");
    stationDetails.appendChild(thisStationMap);
    thisStationMap.innerText = "Zie het complete station";
    thisStationMap.href = "stationmap.php?id="+ stationId;
    //popup openen
    stationPopup.showModal();

    closePopup.addEventListener("click", closeDetails);
}

function closeDetails() {
    stationPopup.close();
}

function ajaxErrorHandler(data) {
    console.log(data);
}









