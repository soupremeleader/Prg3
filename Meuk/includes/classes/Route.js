import { Location } from './Location.js';
const SIGNAL_DISTANCE_IN_METERS = 5000;

let isClose = false;

class Route {
    constructor(begin, end, transports, currentLocation) {
        this.begin = begin;
        this.end = end;
        this.transports = transports;
        this.currentLocation = currentLocation;
        this.lastStation = begin;
        this.currentTransport = 0;
    }

    getCurrentTransport() {
        return this.transports[this.currentTransport];
    }

    checkEndStationClose() {
        let locationEndStation = this.getCurrentTransport().getEndStation().location;

        console.log("end: " + locationEndStation.xCoord);
        // console.log("current: " + this.currentLocation);
        if (locationEndStation.getDistanceBetween(this.currentLocation) <= SIGNAL_DISTANCE_IN_METERS) {
            // navigator.vibrate(1000);
            isClose = true;
            console.log("buzz");
        } else {
            isClose = false;
        }
        return isClose;
    }

    nextStation() {
        let beginTransportLocation = this.getCurrentTransport().getBeginStation().location;
        let endTransportLocation = this.getCurrentTransport().getEndStation().location;

        if (this.currentLocation < beginTransportLocation || this.currentLocation > endTransportLocation) {
            throw new Error("location not on route");
        }

        let nextStation = this.lastStation + 1;
        let nextTransport = this.currentTransport + 1;

        if (nextStation > this.transports[this.currentTransport].end) {
            nextStation = 0;
            isClose = false;
            if (nextTransport >= this.transports.length) {
                return;
            } else {
                this.currentTransport++;
            }
        }

        let nextStationLocation = this.transports[this.currentTransport].stations[nextStation].location;

        if (this.currentLocation >= nextStationLocation) {
            this.lastStation = nextStation;
        }
    }
}

export {Route};