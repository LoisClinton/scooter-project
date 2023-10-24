const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

// property tests (ALL DONE)
describe("ScooterApp property tests", () => {
  const scooterApp = new ScooterApp();
  //scooterApp.stations is hardcoded as { Liverpool: [], London: [], Bristol: [] }

  //test stations
  test("stations should be an object ", () => {
    expect(typeof scooterApp.stations).toBe("object");
  });
  //test values of stations
  test("stations should be 3 keys long initially", () => {
    const keys = Object.keys(scooterApp.stations);
    expect(keys.length).toBe(3);
  });
  test("stations should have correct keys", () => {
    const keys = Object.keys(scooterApp.stations);
    expect(keys).toEqual(["Liverpool", "London", "Bristol"]);
  });

  //test registeredUsers
  test("registeredUsers should be an object", () => {
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    expect(typeof scooterApp.registeredUsers).toEqual("object");
  });
  //test values of registeredUsers
  test("registeredUsers should be an instance of User", () => {
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    expect(scooterApp.registeredUsers["JoeBloggs"]).toBeInstanceOf(User);
  });
  test("registeredUsers should be an object whose keys are usernames to store all users", () => {
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    expect(scooterApp.registeredUsers).toEqual({
      JoeBloggs: {
        username: "JoeBloggs",
        password: "test123",
        age: 21,
        loggedIN: false,
      },
    });
  });
});

// method tests

//registerUser tests COMPLETE
describe("registerUser method tests", () => {
  const scooterApp = new ScooterApp();
  const scooter1 = new Scooter("Liverpool");
  const user1 = new User("JoeBloggs", "test123", 21);

  //console logs 'the user has been registered'
  test("console logs that 'the user has been registered'", () => {
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    expect(console.log).toHaveBeenCalledWith("the user has been registered");
  });

  // updates the registeredUsers property
  test("updates the registeredUsers property", () => {
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    expect(scooterApp.registeredUsers).toEqual({
      JoeBloggs: {
        username: "JoeBloggs",
        password: "test123",
        age: 21,
        loggedIN: false,
      },
    });
  });

  //throw an error: 'already registered'
  test("throw an error 'already registered' if the user is already registered", () => {
    scooterApp.registerUser("JoeBloggs", "test123", 21);

    expect(() => {
      scooterApp.registerUser("JoeBloggs", "test123", 21);
    }).toThrow("already registered");
  });

  //throw an error: 'too young to register'
  test("throw an error 'too young to register' if the users age is too young", () => {
    expect(() => {
      scooterApp.registerUser("JoeBloggs", "test123", 19);
    }).toThrow("too young to register");
  });
});

// loginuser tests (COMPLETE)
describe("loginUser method tests", () => {
  const scooterApp = new ScooterApp();
  scooterApp.registerUser("JoeBloggs", "test123", 21);

  //console logs 'the user has been logged in'
  test("console.logs the user has been loggen in  if the user is successfully logged in", () => {
    scooterApp.loginUser("JoeBloggs", "test123");
    expect(console.log).toHaveBeenCalledWith("user has been logged in");
  });

  //updates the .loggedIn value of the user
  test("updates the .loggedIn value of the user", () => {
    scooterApp.loginUser("JoeBloggs", "test123");
    expect(scooterApp.registeredUsers["JoeBloggs"].loggedIn).toBe(true);
  });

  //if the user cant be located
  test("console.log 'Username or password is incorrect' if the user cant be located", () => {
    scooterApp.loginUser("JoeBlogg", "test123");
    expect(console.log).toHaveBeenCalledWith(
      "Username or password is incorrect"
    );
  });

  //if the password is incorrrect
  test("console.log 'Username or password is incorrect' if the password is incorrect", () => {
    scooterApp.loginUser("JoeBloggs", "tEst123");
    expect(console.log).toHaveBeenCalledWith(
      "Username or password is incorrect"
    );
  });
});

// logoutUser tests (COMPLETE)
describe("logoutUser method tests", () => {
  const scooterApp = new ScooterApp();
  scooterApp.registerUser("JoeBloggs", "test123", 21);
  scooterApp.loginUser("JoeBloggs", "test123");

  //console logs 'the user is logged out'
  test("console logs 'the user is logged out", () => {
    scooterApp.logoutUser("JoeBloggs");
    expect(console.log).toHaveBeenCalledWith("the user is logged out");
  });

  // updates the .loggedIn value of the user
  test("updates the .loggedIn value of the user", () => {
    scooterApp.logoutUser("JoeBloggs");
    expect(scooterApp.registeredUsers["JoeBloggs"].loggedIn).toBe(false);
  });

  //If the user cannot be located, throw no such user is logged in error
  test("throw no such user is logged in error, if the user cannot be located,", () => {
    expect(() => {
      scooterApp.logoutUser("JoeBlogg");
    }).toThrow("no such user is logged in");
  });
});

// create scooter (COMPLETE)
describe("createScooter method tests", () => {
  const scooterApp = new ScooterApp();
  //scooterApp.stations is hardcoded as { Liverpool: [], London: [], Bristol: [] }

  // console.logs 'created new scooter'
  test("console.logs 'created new scooter' when done successfully", () => {
    scooterApp.createScooter("London");
    expect(console.log).toHaveBeenCalledWith("the user is logged out");
  });

  // updates the .stations object with this scooter as a scooter in that stations list
  test("updates the scooterApp.stations object with this new scooter as a scooter in that stations list", () => {
    scooterApp.createScooter("London");
    expect(scooterApp.stations["London"]).toEqual({
      station: "London",
      user: null,
      serial: 1,
      nextSerial: 2,
      charge: 100,
      isBroken: false,
    });
  });

  //station index station.length - 1 should be instance of Scooter
  test("station index station['stationname'][length - 1] (NEW VALUE) should be an instance of Scooter", () => {
    scooterApp.createScooter("London");
    const londonList = scooterApp.stations["London"];
    expect(londonList[londonList.length - 1]).toBeInstanceOf(Scooter);
  });

  //If the station cannot be located, throw no such station error
  test("If the station cannot be located, throw no such station error", () => {
    expect(() => {
      scooterApp.createScooter("Cornwall");
    }).toThrow("no such station");
  });
});

// dock scooter (COMPLETE)
describe("dockScooter method tests", () => {
  const scooterApp = new ScooterApp();
  const scooter = new Scooter("Bristol");
  scooter.station = null;

  // Log scooter is docked to the console.
  test("should log 'scooter is docked' to the console", () => {
    scooterApp.dockScooter(scooter, "London");
    expect(console.log).toHaveBeenCalledWith("scooter is docked");
  });

  // updates the .stations object with this scooter as a scooter in that stations list
  test("should updates the scooterApp.stations object with this scooter in this station", () => {
    scooterApp.dockScooter(scooter, "London");
    expect(scooterApp.stations["London"]).toEqual({
      station: "London",
      user: null,
      serial: 1,
      nextSerial: 2,
      charge: 100,
      isBroken: false,
    });
  });

  //station index station.length - 1 should be instance of Scooter
  test("station index station['stationname'][length - 1] (NEW VALUE) should be an instance of Scooter", () => {
    scooterApp.dockScooter(scooter, "London");
    const londonList = scooterApp.stations["London"];
    expect(londonList[londonList.length - 1]).toBeInstanceOf(Scooter);
  });

  //Throws 'no such station' error if the station does not exist.
  test("should throw 'no such station' error if the station does not exist", () => {
    expect(() => {
      scooterApp.dockScooter(scooter, "Cornwall");
    }).toThrow("no such station");
  });

  //Throws 'scooter already at station' error if the scooter is already there.
  test("should throw 'scooter already at station' error if the scooter is already there", () => {
    scooterApp.dockScooter(scooter, "London");
    expect(() => {
      scooterApp.dockScooter(scooter, "London");
    }).toThrow("scooter already at station");
  });
});

// rent scooter (COMPLETE)
describe("rentScooter method tests", () => {
  const scooterApp = new ScooterApp();

  // Log scooter is rented to the console.
  test("should log 'scooter is rented' to the console.", () => {
    scooterApp.station["London"].push({
      station: "London",
      user: null,
      serial: 1,
      nextSerial: 2,
      charge: 100,
      isBroken: false,
    });
    scooterApp.rentScooter(
      {
        station: "London",
        user: null,
        serial: 1,
        nextSerial: 2,
        charge: 100,
        isBroken: false,
      },
      "JoeBloggs"
    );
    expect(console.log).toHaveBeenCalledWith("scooter is rented");
  });

  // can remove scooter from station
  test("should remove scooter from station", () => {
    scooterApp.station["London"].push({
      station: "London",
      user: null,
      serial: 1,
      nextSerial: 2,
      charge: 100,
      isBroken: false,
    });
    scooterApp.rentScooter(
      {
        station: "London",
        user: null,
        serial: 1,
        nextSerial: 2,
        charge: 100,
        isBroken: false,
      },
      {
        name: "JoeBloggs",
        password: "test123",
        age: 21,
        loggedIn: false,
      }
    );
    expect(scooterApp.station["London"]).toBe([]);
  });

  //Throws 'scooter already rented' error if the scooter is already rented.
  test("", () => {
    expect(() => {
      scooterApp.rentScooter(
        {
          station: "London",
          user: {
            name: "JoeBloggs",
            password: "test123",
            age: 21,
            loggedIn: false,
          },
          serial: 1,
          nextSerial: 2,
          charge: 100,
          isBroken: false,
        },
        {
          name: "JoeBloggs",
          password: "test123",
          age: 21,
          loggedIn: false,
        }
      );
    }).toThrow("scooter already rented");
  });
});

// print
describe("print method tests", () => {
  const scooterapp = new ScooterApp(
    { Liverpool: [], London: [], Bristol: [] },
    { JoeBloggs: { username: "JoeBloggs", password: "test123", age: 21 } }
  );

  // Log the list of registered users to the console.
  test("", () => {
    scooterapp.print();
    expect(console.log).toHaveBeenCalledWith(
      "JoeBloggs: { username: 'JoeBloggs', password: 'test123', age: 21 }"
    );
  });

  // Log the list of stations and how many scooters are at each station to the console.
  test("", () => {
    scooterapp.print();
    expect(console.log).toHaveBeenCalledWith(
      "{ Liverpool: [], London: [], Bristol: [] }"
    );
  });
});
