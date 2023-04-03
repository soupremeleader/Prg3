class Location {
    constructor(xCoord, yCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
    }

    getDistanceBetween(location) {
        let xCoordSquared = Math.pow(location.xCoord - this.xCoord, 2)
        let yCoordSquared = Math.pow(location.yCoord - this.yCoord, 2)
        // console.log("route: " + this.xCoord)
        // console.log(location.xCoord);
        return Math.pow(xCoordSquared + yCoordSquared, 0.5);
    }
}
export {Location};