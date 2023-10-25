const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

// property tests (ALL DONE)
describe("ScooterApp property tests", () => {
  //scooterApp.stations is hardcoded as { Liverpool: [], London: [], Bristol: [] }

  //test stations
  test("stations should be an object ", () => {
    const scooterApp = new ScooterApp();
    const obj = scooterApp.stations;
    expect(typeof obj).toEqual("object");
  });
  //test values of stations
  test("stations should be 3 keys long initially", () => {
    const scooterApp = new ScooterApp();
    const keys = Object.keys(scooterApp.stations);
    expect(keys.length).toBe(3);
  });
  test("stations should have correct keys", () => {
    const scooterApp = new ScooterApp();
    const keys = Object.keys(scooterApp.stations);
    expect(keys).toEqual(["Liverpool", "London", "Bristol"]);
  });

  //test registeredUsers
  test("registeredUsers should be an object", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    expect(typeof scooterApp.registeredUsers).toEqual("object");
  });
  //test values of registeredUsers
  test("registeredUsers should be an instance of User", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    const instance = scooterApp.registeredUsers["JoeBloggs"];
    expect(instance).toBeInstanceOf(User);
  });

  test("registeredUsers should be an object whose keys are usernames to store all users", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    const keys = Object.keys(scooterApp.registeredUsers);

    expect(keys).toEqual(["JoeBloggs"]);
  });
});

// method tests

//registerUser tests COMPLETE
describe("registerUser method tests", () => {
  //console logs 'the user has been registered'
  test("console logs that 'the user has been registered'", () => {
    const scooterApp = new ScooterApp();
    const logSpy = jest.spyOn(global.console, "log");
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    expect(logSpy).toHaveBeenCalledWith("the user has been registered");
  }); //Had to add a 'logSpy' variable

  // updates the registeredUsers property
  test("updates the registeredUsers property", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    const keys = Object.keys(scooterApp.registeredUsers);
    const lastVal = keys[keys.length - 1];
    expect(lastVal).toBe("JoeBloggs");
  });

  //throw an error: 'already registered'
  test("throw an error 'already registered' if the user is already registered", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    expect(() => {
      scooterApp.registerUser("JoeBloggs", "test123", 21);
    }).toThrow("already registered");
  });

  //throw an error: 'too young to register'
  test("throw an error 'too young to register' if the users age is too young", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    expect(() => {
      scooterApp.registerUser("JB", "tAst123", 16);
    }).toThrow("too young to register");
  });
});

// loginuser tests (COMPLETE)
describe("loginUser method tests", () => {
  //console logs 'the user has been logged in'
  test("console.logs the user has been loggen in  if the user is successfully logged in", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.loginUser("JoeBloggs", "test123");
    expect(console.log).toHaveBeenCalledWith("user has been logged in");
  });

  //updates the .loggedIn value of the user
  test("updates the .loggedIn value of the user", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.loginUser("JoeBloggs", "test123");
    expect(scooterApp.registeredUsers["JoeBloggs"].loggedIn).toBe(true);
  });

  //if the user cant be located
  test("console.log 'Username or password is incorrect' if the user cant be located", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.loginUser("JoeBlogg", "test123");
    expect(console.log).toHaveBeenCalledWith(
      "Username or password is incorrect"
    );
  });

  //if the password is incorrrect
  test("console.log 'Username or password is incorrect' if the password is incorrect", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.loginUser("JoeBloggs", "tEst123");
    expect(console.log).toHaveBeenCalledWith(
      "Username or password is incorrect"
    );
  });
});

// logoutUser tests (COMPLETE)
describe("logoutUser method tests", () => {
  //console logs 'the user is logged out'
  test("console logs 'the user is logged out", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.loginUser("JoeBloggs", "test123");
    scooterApp.logoutUser("JoeBloggs");
    expect(console.log).toHaveBeenCalledWith("user has been logged out");
  });

  // updates the .loggedIn value of the user
  test("updates the .loggedIn value of the user", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.loginUser("JoeBloggs", "test123");
    scooterApp.logoutUser("JoeBloggs");
    const result = scooterApp.registeredUsers["JoeBloggs"].loggedIn;
    expect(result).toBe(false);
  });

  //If the user cannot be located, throw no such user is logged in error
  test("throw no such user is logged in error, if the user cannot be located,", () => {
    const scooterApp = new ScooterApp();
    expect(() => {
      scooterApp.logoutUser("JoeBlogg");
    }).toThrow("no such user is logged in");
  });
});

// create scooter (COMPLETE)
describe("createScooter method tests", () => {
  //scooterApp.stations is hardcoded as { Liverpool: [], London: [], Bristol: [] }

  // console.logs 'created new scooter'
  test("console.logs 'created new scooter' when done successfully", () => {
    const logSpy = jest.spyOn(global.console, "log");
    const scooterApp = new ScooterApp();
    scooterApp.createScooter("London");
    expect(logSpy).toHaveBeenCalledWith("created new scooter");
  });

  // updates the .stations object with this scooter as a scooter in that stations list
  test("updates the scooterApp.stations object with this new scooter as a scooter in that stations list", () => {
    const scooterApp = new ScooterApp();
    scooterApp.createScooter("London");
    const londonScooter = scooterApp.stations["London"];
    expect(londonScooter).toEqual([
      {
        station: "London",
        user: null,
        serial: 2,
        charge: 100,
        isBroken: false,
      },
    ]);
  });

  //station index station.length - 1 should be instance of Scooter
  test("station index station['stationname'][length - 1] (NEW VALUE) should be an instance of Scooter", () => {
    const scooterApp = new ScooterApp();
    scooterApp.createScooter("London");
    const londonList = scooterApp.stations["London"];
    expect(londonList[londonList.length - 1]).toBeInstanceOf(Scooter);
  });

  //If the station cannot be located, throw no such station error
  test("If the station cannot be located, throw no such station error", () => {
    const scooterApp = new ScooterApp();
    expect(() => {
      scooterApp.createScooter("Cornwall");
    }).toThrow("no such station");
  });
});

// dock scooter (COMPLETE)
describe("dockScooter method tests", () => {
  // Log scooter is docked to the console.
  test("should log 'scooter is docked' to the console", () => {
    const scooterApp = new ScooterApp();
    const scooter = new Scooter("Bristol");
    scooter.station = null;
    scooterApp.dockScooter(scooter, "London");
    expect(console.log).toHaveBeenCalledWith("scooter is docked");
  });

  // updates the .stations object with this scooter as a scooter in that stations list
  test("should update the scooterApp.stations object with this scooter in this station", () => {
    const scooterApp = new ScooterApp();
    const scooter = new Scooter("Bristol");
    scooter.station = null;
    scooterApp.dockScooter(scooter, "London");
    expect(scooterApp.stations["London"]).toEqual([
      {
        station: "London",
        user: null,
        serial: 5,
        charge: 100,
        isBroken: false,
      },
    ]);
  });

  //station index station.length - 1 should be instance of Scooter
  test("newest docked scooter should be an instance of Scooter", () => {
    const scooterApp = new ScooterApp();
    const scooter = new Scooter("Bristol");
    scooter.station = null;
    scooterApp.dockScooter(scooter, "London");
    const londonList = scooterApp.stations["London"];
    expect(londonList[londonList.length - 1]).toBeInstanceOf(Scooter);
  });

  //Throws 'no such station' error if the station does not exist.
  test("should throw 'no such station' error if the station does not exist", () => {
    expect(() => {
      const scooterApp = new ScooterApp();
      const scooter = new Scooter("Bristol");
      scooter.station = null;
      scooterApp.dockScooter(scooter, "Cornwall");
    }).toThrow("no such station");
  });

  //Throws 'scooter already at station' error if the scooter is already there.
  test("should throw 'scooter already at station' error if the scooter is already there", () => {
    const scooterApp = new ScooterApp();
    const scooter = new Scooter("Bristol");
    scooter.station = null;
    scooterApp.dockScooter(scooter, "London");
    expect(() => {
      scooterApp.dockScooter(scooter, "London");
    }).toThrow("scooter already at station");
  });
});

// rent scooter (COMPLETE)
describe("rentScooter method tests", () => {
  // Log scooter is rented to the console.
  test("should log 'scooter is rented' to the console.", () => {
    const scooterApp = new ScooterApp();
    scooterApp.createScooter("London");

    const user = new User("Jake", "rjfbne", 34);

    const userWhoRents = scooterApp.registeredUsers["Bilbo"];

    const logSpy = jest.spyOn(global.console, "log");

    scooterApp.rentScooter(scooterApp.stations["London"][0], userWhoRents);

    expect(logSpy).toHaveBeenCalledWith("scooter is rented");
  });

  // can remove scooter from station
  test("should remove scooter from station", () => {
    const scooterApp = new ScooterApp();
    scooterApp.createScooter("London");
    scooterApp.registerUser("Bilbo", "passw0rd", 20);

    const userWhoRents = scooterApp.registeredUsers["Bilbo"];

    scooterApp.rentScooter(scooterApp.stations["London"][0], userWhoRents);

    expect(scooterApp.stations["London"]).toEqual([]);
  });

  //Throws 'scooter already rented' error if the scooter is already rented.
  test("Throws 'scooter already rented' error if the scooter is already rented", () => {
    const scooterApp = new ScooterApp();
    scooterApp.createScooter("London");
    scooterApp.registerUser("Bilbo", "passw0rd", 20);
    scooterApp.registerUser("Charlie", "hello_world", 20);

    const userBilbo = scooterApp.registeredUsers["Bilbo"];
    const userCharlie = scooterApp.registeredUsers["Charlie"];

    const scooterToRent = scooterApp.stations["London"][0];

    scooterApp.rentScooter(scooterToRent, userBilbo);

    expect(() => {
      scooterApp.rentScooter(scooterToRent, userCharlie);
    }).toThrow("scooter already rented");
  });
});

// print
describe("print method tests", () => {
  test("Log the list of registered users to the console.", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registeredUsers = {
      JoeBloggs: { username: "JoeBloggs", password: "test123", age: 21 },
    };
    const logSpy = jest.spyOn(global.console, "log");

    scooterApp.print();

    expect(logSpy).toHaveBeenCalledWith({
      JoeBloggs: { username: "JoeBloggs", password: "test123", age: 21 },
    });
  });

  test("Log the list of stations and how many scooters are at each station to the console", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registeredUsers = {
      JoeBloggs: { username: "JoeBloggs", password: "test123", age: 21 },
    };

    const logSpy = jest.spyOn(global.console, "log");

    scooterApp.print();

    expect(logSpy).toHaveBeenCalledWith({
      Liverpool: [],
      London: [],
      Bristol: [],
    });
  });
});

// Had to change my console.log() checks with a logSpy variable
// I was accidentally mutating my scooterApp variable from the describe scope so it was failing tests
