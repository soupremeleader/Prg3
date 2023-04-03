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
        }).then(res => res.json()).then(routeData => {
        let transportId = routeData[2][0].transport_id;

        fetch("../fetch/fetch-transport.php",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    "transport_ids": transportId
                })
            }).then(res => res.json()).then(transportData => {
                // console.log("here: " + routeData);

            let stations = [];
            let beginStation;
            let endStation;
            for (let i = 0; i < transportData.length; i++) {
                let stationId = transportData[i].id;
                let stationName = transportData[i].name;
                let arrivalTime = new Date(transportData[i].arrival_time);
                let platform = transportData[i].platform;
                let stationLocation = new Location(transportData[i].location_x, transportData[i].location_y);

                stations[i] = new Station(stationId, stationName, arrivalTime, platform, stationLocation);

                if (stations[i].name === stationFromInput.value) {
                    beginStation = i;
                }

                if (stations[i].name === stationToInput.value) {
                    endStation = i;
                }
            }

            let transportName = transportData[0].type_name;
            let transport = new Transport(transportName, beginStation, endStation, stations);

            let currentLocation = new Location(stations[beginStation].location.xCoord, stations[beginStation].location.yCoord);
            console.log("current: " + currentLocation);

            let route = new Route(beginStation, endStation, [transport], currentLocation);

            let i = 0;
            let beginReached = false;
            let endReached = false;
            let currentStation;

            let routeDiv = document.createElement("div");
            routeDiv.classList.add("routeDiv");
            let stationAmount = route.end - route.begin + 1;
            let stationDivHeight = 20;
            routeDiv.style.height = `${stationAmount * stationDivHeight}%`;

            let bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${100 * (stationAmount - 1) / stationAmount}%`;

            let progress = document.createElement("div");
            progress.classList.add("progress");
            progress.id = "progress";

            bar.appendChild(progress);
            routeDiv.appendChild(bar);

            let stationSection = document.createElement("section");
            stationSection.classList.add("stationSection");

            while (i < stations.length && !endReached) {
                currentStation = i;
                if (currentStation === route.begin) {
                    beginReached = true;
                }

                if (beginReached) {
                    let stationDiv = document.createElement("div");
                    stationDiv.classList.add("station_divs");
                    stationDiv.dataset.name = stations[i].name;

                    if (i % 2 === 1) {
                        stationDiv.classList.add("odd_purple");
                    }

                    if (currentStation === route.end) {
                        endReached = true;
                    }

                    // if (currentStation.id === route.begin) {
                    //     routeImg.src = "../scss/img/begin.png";
                    // } else if (endReached) {
                    //     routeImg.src = "../scss/img/end.png";
                    // } else {
                    //     routeImg.src = "../scss/img/middle.png";
                    // }

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

                    // routeDiv.appendChild(routeImg);
                    stationDiv.appendChild(stationNameInfoDiv);
                    stationDiv.appendChild(stationMapDiv)
                    stationSection.appendChild(stationDiv);


                }
                i++;
            }
            main.appendChild(routeDiv);
            main.appendChild(stationSection);

            let endLocation = stations[stations.length - 1].location;

            let j = 0;
            if (j === 0) {
                j = 1;
                let height = 1;
                for (let k = 0; k < stations.length; k++) {
                    let id = setInterval(frame, 10);

                    function frame() {
                        if (height >= 100 * (k + 1) / stations.length) {
                            clearInterval(id);
                            j = 0;
                        } else {
                            height++;
                            progress.style.height = height + "%";
                            // route.currentLocation = height * endLocation / 100;
                            route.nextStation();
                            if (route.checkEndStationClose()) {
                                console.log("hello");
                            }
                        }
                    }
                }
            }
        });
    });
})