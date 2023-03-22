import {Location} from '../includes/classes/Location.js';
import {Route} from '../includes/classes/Route.js';
import {Transport} from "../includes/classes/Transport.js";
import {Station} from "../includes/classes/Station.js";

let planTripButton = document.getElementById("plan_submit");
let stationFromInput = document.getElementById("from_input");
let stationToInput = document.getElementById("to_input");
let main = document.getElementById("main");

planTripButton.addEventListener('click', function () {
    // console.log("hello");
    fetch("../fetch/fetch-route.php",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                "station_from_name": stationFromInput.value,
                "station_to_name": stationToInput.value
            })
        }).then(res => res.json()).then(data => {
        // console.log(`data: ${data}`);
        let beginStationId = data[0][0].id;
        let endStationId = data[1][0].id;
        let transportId = data[2][0].transport_id;
        let currentLocation = new Location(data[3][0].location_x, data[3][0].location_y)

        let route = new Route(beginStationId, endStationId, [transportId], currentLocation);
        // console.log(`route: ${route}`);

        fetch("../fetch/fetch-transport.php",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    "transport_ids": route.transports
                })
            }).then(res => res.json()).then(data => {

            let stations = [];
            for (let i = 0; i < data.length; i++) {
                let stationId = data[i].id;
                let stationName = data[i].name;
                let arrivalTime = new Date(data[i].arrival_time);
                let platform = data[i].platform;
                let stationLocation = new Location(data[i].location_x, data[i].location_y);

                stations[i] = new Station(stationId, stationName, arrivalTime, platform, stationLocation);
            }

            let transportName = data[0].type_name;
            let transport = new Transport(transportName, route.begin, route.end, stations);

            let i = 0;
            let beginReached = false;
            let endReached = false;
            let currentStation;
            while (i < stations.length && !endReached) {
                currentStation = stations[i];
                if (currentStation.id === route.begin) {
                    beginReached = true;
                }

                if (beginReached) {
                    let stationDiv = document.createElement("div");
                    stationDiv.classList.add("station_divs");
                    stationDiv.dataset.name = stations[i].name;

                    if (i % 2 === 1) {
                        stationDiv.classList.add("odd_purple");
                    }

                    let routeDiv = document.createElement("div");
                    routeDiv.classList.add("routeDiv");

                    let routeImg = document.createElement("img");

                    if (stations[i].id === route.end) {
                        endReached = true;
                    }

                    if (currentStation.id === route.begin) {
                        routeImg.src = "../scss/img/begin.png";
                    } else if (endReached) {
                        routeImg.src = "../scss/img/end.png";
                    } else {
                        routeImg.src = "../scss/img/middle.png";
                    }

                    let stationNameInfoDiv = document.createElement("div");
                    stationNameInfoDiv.classList.add("stationNameInfoDiv");

                    let stationMapDiv = document.createElement("div");
                    stationMapDiv.classList.add("stationMapDiv");

                    let stationNameDiv = document.createElement("div");
                    stationNameDiv.classList.add("stationNameDiv");
                    stationNameDiv.innerHTML = stations[i].name;

                    let stationInfoDiv = document.createElement("div");
                    stationInfoDiv.classList.add("stationInfoDiv");

                    let arrivalTimeDiv = document.createElement("div");
                    arrivalTimeDiv.classList.add("arrivalTimeDiv");
                    arrivalTimeDiv.innerHTML = `${stations[i].arrivalTime.getHours()}:${stations[i].arrivalTime.getMinutes()}`;

                    let platformDiv = document.createElement("div");
                    platformDiv.classList.add("platformDiv");
                    platformDiv.innerHTML = stations[i].platform;

                    if (currentStation.id === route.begin) {
                        let stationMapImg = document.createElement("img");
                        stationMapImg.classList.add("stationMapImg");

                        stationMapImg.src = "../scss/img/stationmaplogo.png";
                        stationMapDiv.appendChild(stationMapImg);
                    }

                    stationInfoDiv.appendChild(arrivalTimeDiv);
                    stationInfoDiv.appendChild(platformDiv);

                    stationNameInfoDiv.appendChild(stationNameDiv);
                    stationNameInfoDiv.appendChild(stationInfoDiv);

                    routeDiv.appendChild(routeImg);
                    stationDiv.appendChild(routeDiv);
                    stationDiv.appendChild(stationNameInfoDiv);
                    stationDiv.appendChild(stationMapDiv)


                    main.appendChild(stationDiv);
                }
                i++;
            }
        });
    });
})