const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

describe("ScooterApp property tests", () => {
  test("stations should be an object ", () => {
    const scooterApp = new ScooterApp();

    expect(typeof scooterApp.stations).toEqual("object");
  });

  test("stations should be 3 keys long initially", () => {
    const scooterApp = new ScooterApp();
    const stationNameList = Object.keys(scooterApp.stations);

    expect(stationNameList.length).toBe(3);
  });

  test("stations should have correct keys", () => {
    const scooterApp = new ScooterApp();
    const stationNameList = Object.keys(scooterApp.stations);

    expect(stationNameList).toEqual(["Liverpool", "London", "Bristol"]);
  });

  test("registeredUsers should be an object", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);

    expect(typeof scooterApp.registeredUsers).toEqual("object");
  });

  test("registeredUsers should be an instance of User", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    const theRegisteredUser = scooterApp.registeredUsers["JoeBloggs"];

    expect(theRegisteredUser).toBeInstanceOf(User);
  });

  test("registeredUsers should be an object whose keys are usernames to store all users", () => {
    const scooterApp = new ScooterApp();

    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.registerUser("JohnDoe", "passw0rd", 40);

    const registeredUserList = Object.keys(scooterApp.registeredUsers);

    expect(registeredUserList).toEqual(["JoeBloggs", "JohnDoe"]);
  });
});

describe("ScooterApp .registerUser() method tests", () => {
  test("console logs that 'the user has been registered'", () => {
    const logSpy = jest.spyOn(global.console, "log");

    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);

    expect(logSpy).toHaveBeenCalledWith("the user has been registered");
  });

  test("updates the registeredUsers property", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.registerUser("JohnDoe", "passw0rd", 40);

    const registeredUsers = Object.keys(scooterApp.registeredUsers);
    const firstVal = registeredUsers[0];
    const lastVal = registeredUsers[registeredUsers.length - 1];

    expect(firstVal).toBe("JoeBloggs");
    expect(lastVal).toBe("JohnDoe");
  });

  test("throw an error 'already registered' if the user is already registered", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("JoeBloggs", "test123", 21);

    expect(() => {
      scooterApp.registerUser("JoeBloggs", "test123", 21);
    }).toThrow("already registered");
  });

  test("throw an error 'too young to register' if the users age is too young", () => {
    const scooterApp = new ScooterApp();

    expect(() => {
      scooterApp.registerUser("JoeBloggs", "tAst123", 16);
    }).toThrow("too young to register");
  });
});

describe("ScooterApp .loginUser() method tests", () => {
  test("console.logs the user has been loggen in  if the user is successfully logged in", () => {
    const scooterApp = new ScooterApp();

    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.loginUser("JoeBloggs", "test123");

    expect(console.log).toHaveBeenCalledWith("user has been logged in");
  });

  test("updates the .loggedIn value of the user", () => {
    const scooterApp = new ScooterApp();

    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.loginUser("JoeBloggs", "test123");

    expect(scooterApp.registeredUsers["JoeBloggs"].loggedIn).toBe(true);
  });

  test("console.log 'Username or password is incorrect' if the user cant be located", () => {
    const scooterApp = new ScooterApp();

    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.loginUser("JoeBlogg", "test123");

    expect(console.log).toHaveBeenCalledWith(
      "Username or password is incorrect"
    );
  });

  test("console.log 'Username or password is incorrect' if the password is incorrect", () => {
    const scooterApp = new ScooterApp();

    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.loginUser("JoeBloggs", "tEst123");

    expect(console.log).toHaveBeenCalledWith(
      "Username or password is incorrect"
    );
  });
});

describe("ScooterApp .logoutUser() method tests", () => {
  test("console logs 'the user is logged out", () => {
    const scooterApp = new ScooterApp();

    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.loginUser("JoeBloggs", "test123");
    scooterApp.logoutUser("JoeBloggs");

    expect(console.log).toHaveBeenCalledWith("user has been logged out");
  });

  test("updates the .loggedIn value of the user", () => {
    const scooterApp = new ScooterApp();

    scooterApp.registerUser("JoeBloggs", "test123", 21);
    scooterApp.loginUser("JoeBloggs", "test123");
    scooterApp.logoutUser("JoeBloggs");

    const result = scooterApp.registeredUsers["JoeBloggs"].loggedIn;

    expect(result).toBe(false);
  });

  test("throw no such user is logged in error, if the user cannot be located,", () => {
    const scooterApp = new ScooterApp();

    expect(() => {
      scooterApp.logoutUser("JoeBlogg");
    }).toThrow("no such user is logged in");
  });
});

describe("ScooterApp .createScooter() method tests", () => {
  test("console.logs 'created new scooter' when done successfully", () => {
    const logSpy = jest.spyOn(global.console, "log");

    const scooterApp = new ScooterApp();
    scooterApp.createScooter("London");

    expect(logSpy).toHaveBeenCalledWith("created new scooter");
  });

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

  test("the scooter at the station should be an instance of Scooter using index selection", () => {
    const scooterApp = new ScooterApp();

    scooterApp.createScooter("London");
    const londonList = scooterApp.stations["London"];

    expect(londonList[londonList.length - 1]).toBeInstanceOf(Scooter);
  });

  test("If the station cannot be located, throw no such station error", () => {
    const scooterApp = new ScooterApp();

    expect(() => {
      scooterApp.createScooter("Cornwall");
    }).toThrow("no such station");
  });
});

describe("ScooterApp .dockScooter() method tests", () => {
  test("should log 'scooter is docked' to the console", () => {
    const scooterApp = new ScooterApp();
    const scooter = new Scooter("Bristol");
    scooter.station = null;
    scooterApp.dockScooter(scooter, "London");

    expect(console.log).toHaveBeenCalledWith("scooter is docked");
  });

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

  test("newest docked scooter should be an instance of Scooter", () => {
    const scooterApp = new ScooterApp();
    const scooter = new Scooter("Bristol");

    scooter.station = null;
    scooterApp.dockScooter(scooter, "London");
    const londonList = scooterApp.stations["London"];

    expect(londonList[londonList.length - 1]).toBeInstanceOf(Scooter);
  });

  test("should throw 'no such station' error if the station does not exist", () => {
    const scooterApp = new ScooterApp();
    const scooter = new Scooter("Bristol");

    scooter.station = null;

    expect(() => {
      scooterApp.dockScooter(scooter, "Cornwall");
    }).toThrow("no such station");
  });

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

describe("ScooterApp .rentScooter() method tests", () => {
  test("should log 'scooter is rented' to the console.", () => {
    const scooterApp = new ScooterApp();
    scooterApp.createScooter("London");
    scooterApp.registerUser("Bilbo", "passw0rd", 20);
    const userWhoRents = scooterApp.registeredUsers["Bilbo"];

    const logSpy = jest.spyOn(global.console, "log");

    scooterApp.rentScooter(scooterApp.stations["London"][0], userWhoRents);

    expect(logSpy).toHaveBeenCalledWith("scooter is rented");
  });

  test("should remove scooter from station", () => {
    const scooterApp = new ScooterApp();
    scooterApp.createScooter("London");
    scooterApp.registerUser("Bilbo", "passw0rd", 20);
    const userWhoRents = scooterApp.registeredUsers["Bilbo"];

    scooterApp.rentScooter(scooterApp.stations["London"][0], userWhoRents);

    expect(scooterApp.stations["London"]).toEqual([]);
  });

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

describe("ScooterApp .print() method tests", () => {
  test("logs the list of registered users to the console", () => {
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

  test("logs the list of stations and how many scooters are at each station to the console", () => {
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
