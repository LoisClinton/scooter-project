const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  // ScooterApp code here
  // stations is hardcoded as { Liverpool: [], London: [], Bristol: [] }
  constructor() {
    this.stations = { Liverpool: [], London: [], Bristol: [] };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    const userKeys = Object.keys(this.registeredUsers);
    for (const name of userKeys) {
      if (name == username) {
        throw new Error("already registered");
      }
    }
    if (age < 18) {
      throw new Error("too young to register");
    }
    const newUser = new User(username, password, age);
    this.registeredUsers[username] = newUser;
    console.log("the user has been registered");
    return newUser;
  }

  loginUser(username, password) {
    const userToLogin = this.registeredUsers[username];
    if (userToLogin != undefined && userToLogin.password === password) {
      console.log("user has been logged in");
      userToLogin.login(password);
    } else {
      console.log("Username or password is incorrect");
    }
  }

  logoutUser(username) {
    const userToLogout = this.registeredUsers[username];
    if (userToLogout != undefined && userToLogout.loggedIn === true) {
      console.log("user has been logged out");
      userToLogout.logout();
    } else {
      throw new Error("no such user is logged in");
    }
  }

  createScooter(station) {
    const stationInApp = this.stations[station];
    console.log(stationInApp);
    if (stationInApp != undefined) {
      console.log("created new scooter");
      const scooter = new Scooter(station);
      stationInApp.push(scooter);
      return;
    } else {
      throw new Error("no such station");
    }
  }

  dockScooter(scooter, station) {
    const stations = Object.keys(this.stations);

    if (scooter.station) {
      throw new Error("scooter already at station");
    }
    if (stations.includes(station)) {
      scooter.dock(station);
      this.stations[station].push(scooter);
      console.log("scooter is docked");
    } else {
      throw new Error("no such station.");
    }
  }

  rentScooter(scooter, user) {
    // check if scooter is rented
    if (scooter.user != null) {
      throw new Error("scooter already rented");
    } else {
      // todo: update scooter in this.stations
      const station = scooter.station;
      const stationArray = this.stations[station];

      // let indexToRemove = undefined;
      for (let i = 0; i <= stationArray.length - 1; i++) {
        const potentialScooter = stationArray[i];
        if (potentialScooter.serial == scooter.serial) {
          console.log("scooter is rented");
          stationArray.splice(i, 1);
          scooter.rent(user);
          return;
        }
      }
    }
  }

  print() {
    console.log(this.stations);
    console.log(this.registeredUsers);
  }
}

module.exports = ScooterApp;
