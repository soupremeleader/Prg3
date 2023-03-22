class Transport {
    constructor(type, begin, end, stations) {
        this.type = type;
        this.begin = begin;
        this.end = end;
        this.stations = stations;
    }

    getBeginStation() {
        return this.stations[this.begin];
    }

    getEndStation() {
        return this.stations[this.end];
    }
}

export {Transport};