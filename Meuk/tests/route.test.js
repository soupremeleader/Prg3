import {Route, checkEndStationClose, nextStation} from "../includes/classes/Route.js";
import {Station} from "../includes/classes/Station.js";
import {Transport} from "../includes/classes/Transport.js";


let denHaagCentraal = new Station("Den Haag Centraal", "12:54", "1", 0);
let delftCampus = new Station("Delft Campus", "13:12", "2", 20000);
let rotterdamCentraal = new Station("Rotterdam Centraal", "13:12", "1", 50000);
let blaak = new Station("Blaak", "13:30", "1", 60000);
let barendrecht = new Station("Barendrecht", "13:41", "3A", 80000);
let dordrecht = new Station("Dordrecht", "13:49", "5", 120000);

let sprinterDordrecht = new Transport("Sprinter", 1, 3, [denHaagCentraal, delftCampus, rotterdamCentraal, blaak, dordrecht]);
let route = new Route(1, 3, [sprinterDordrecht], delftCampus.location);

let delftCampusStop = 1;
let rotterdamCentraalStop = 2;
let blaakStop = 3;
let barendrechtStop = 4;

let interCityDordrecht = new Transport("intercity", 3, 5, [denHaagCentraal, delftCampus, rotterdamCentraal, blaak, barendrecht, dordrecht]);
let route2 = new Route(1, 4, [sprinterDordrecht, interCityDordrecht], delftCampus.location);


// isClose tests, one transport
test("Train is close to the next station", () => {
    route.currentLocation = blaak.location - 4000;
    // global.navigator.vibrate = jest.fn(Promise.resolve);
    expect(route.checkEndStationClose()).toBe(true);
})

test("Train is not close to the station", () => {
    route.currentLocation = blaak.location - 6000;
    expect(route.checkEndStationClose()).toBe(false);
})

// isClose tests, multiple transport
test("Train is close to end stop", () => {
    route2.currentLocation = dordrecht.location - 4000;
    route2.currentTransport = 1;
    expect(route2.checkEndStationClose()).toBe(true);
})

test("Train is not close to end stop", () => {
    route2.currentLocation = dordrecht.location - 6000;
    route2.currentTransport = 1;
    expect(route2.checkEndStationClose()).toBe(false);
})

test("last station is starting station", () => {
    route.currentLocation = delftCampus.location;

    route.nextStation();
    expect(route.lastStation).toEqual(delftCampusStop);
})

test("last station is first next station", () => {
    route.currentLocation = rotterdamCentraal.location + 1000;

    route.nextStation();
    expect(route.lastStation).toEqual(rotterdamCentraalStop);
})

test("last station is end station", () => {
    route.currentLocation = blaak.location;
    route.lastStation = rotterdamCentraalStop;

    route.nextStation();
    expect(route.lastStation).toEqual(blaakStop);

})

test("last station is end station, looped", () => {
    for (let i = Number(delftCampus.location); i <= Number(blaak.location); i += 5000) {
        route.currentLocation = i;
        route.nextStation();
    }

    expect(route.lastStation).toEqual(blaakStop);
})

test("current location is smaller than begin of current transport", () => {
    route.currentLocation = 100;
    expect(() => {
        route.nextStation();
    }).toThrow();
})

test("current location is bigger than end of current transport", () => {
    route.currentLocation = blaak.location + 100;
    expect(() => {
        route.nextStation();
    }).toThrow();
})


test("last station is end station, looped", () => {
    for (let i = Number(delftCampus.location); i <= Number(barendrecht.location + 5000); i += 5000) {
        route2.currentLocation = i;
        route2.nextStation();
    }

    expect(route2.lastStation).toEqual(barendrechtStop);
    expect(route2.currentTransport).toEqual(1);
    expect(route2.checkEndStationClose()).toBe(false);
})
