const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  // ScooterApp code here
  // stations is hardcoded as { Liverpool: [], London: [], Bristol: [] }
  constructor() {
    this.stations = { Liverpool: [], London: [], Bristol: [] };
    this.registeredUsers = {};
  }
  registerUser(username, password, age) {}
  loginUser(username, password) {}
  logoutUser(username) {}
  createScooter(station) {}
  dockScooter(scooter, station) {}
  rentScooter(scooter, user) {}

  print() {
    console.log(this.stations);
    console.log(this.registeredUsers);
  }
}

module.exports = ScooterApp;
