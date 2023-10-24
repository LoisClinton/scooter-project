class Scooter {
  // scooter code here
  // static nextSerial = 1;
  constructor(station, user) {
    this.station = station;
    this.user = user;
    // this.serial = nextSerial;
    // this.nextSerial++;
  }
}

const scooter = new Scooter("Liverpool", {
  username: "LoL0",
  password: "acbgh^7",
  age: 23,
  loggedIn: true,
});

console.log(scooter);
module.exports = Scooter;
