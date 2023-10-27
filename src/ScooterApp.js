const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    // `stations` is hardcoded
    this.stations = { Liverpool: [], London: [], Bristol: [] };
    // `registeredUsers` is initalised as empty
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    // validating username
    const userKeys = Object.keys(this.registeredUsers);
    for (const name of userKeys) {
      if (name == username) {
        throw new Error("already registered");
      }
    }

    // validating age
    if (age < 18) {
      throw new Error("too young to register");
    }

    // proceeding with registering user in system
    const newUser = new User(username, password, age);
    this.registeredUsers[username] = newUser;
    console.log("the user has been registered");

    return newUser;
  }

  loginUser(username, password) {
    const userToLogin = this.registeredUsers[username];

    if (userToLogin != undefined && userToLogin.password === password) {
      // utilising User's login() method after user is found and password match
      console.log("user has been logged in");
      userToLogin.login(password);
    } else {
      console.log("Username or password is incorrect");
    }
  }

  logoutUser(username) {
    const userToLogout = this.registeredUsers[username];

    if (userToLogout != undefined && userToLogout.loggedIn === true) {
      // utilising user's logout() method after user is found
      console.log("user has been logged out");
      userToLogout.logout();
    } else {
      throw new Error("no such user is logged in");
    }
  }

  createScooter(station) {
    const scooterListForStation = this.stations[station];

    // check if station is defined (i.e., has been initalised in constructor)
    if (scooterListForStation != undefined) {
      const scooter = new Scooter(station);
      console.log("created new scooter");
      scooterListForStation.push(scooter);
    } else {
      throw new Error("no such station");
    }
  }

  dockScooter(scooter, station) {
    const stations = Object.keys(this.stations);

    // validate if scooter is already docked at a station
    if (scooter.station) {
      throw new Error("scooter already at station");
    }

    // validate if station exists
    if (stations.includes(station)) {
      // update station for Scooter instance
      scooter.dock(station);
      // update station for ScooterApp instance
      this.stations[station].push(scooter);
      console.log("scooter is docked");
    } else {
      throw new Error("no such station.");
    }
  }

  rentScooter(scooter, user) {
    // validate is not already rented
    if (scooter.user != null) {
      throw new Error("scooter already rented");
    } else {
      // update scooter in this.stations
      const station = scooter.station;
      const stationArray = this.stations[station];

      // finding scooter within stations' scooter list
      for (let i = 0; i <= stationArray.length - 1; i++) {
        const potentialScooter = stationArray[i];

        if (potentialScooter.serial == scooter.serial) {
          // remove scooter from stations' scooter list
          stationArray.splice(i, 1);

          // utilise Scooter's .rent() method to assign user to the scooter
          scooter.rent(user);
          console.log("scooter is rented");
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
