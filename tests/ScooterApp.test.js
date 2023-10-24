const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

// ScooterApp tests here

// property tests
describe("ScooterApp property tests", () => {
  const scooterApp = new ScooterApp();

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
    scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(typeof scooterApp.registeredUsers).toEqual("object");
  });

  //test values of registeredUsers
  test("registeredUsers should be an instance of User", () => {
    scooterApp.registerUser("JoeBloggs", "test123", 21);
    expect(scooterApp.registeredUsers["JoeBloggs"]).toBeInstanceOf(User);
  });
  test("registeredUsers should be an object whose keys are usernames to store all users", () => {
    scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(scooterApp.registeredUsers).toEqual({
      "Joe Bloggs": {
        username: "Joe Bloggs",
        password: "test123",
        age: 21,
        loggedIN: false,
      },
    });
  });
});

// method tests
describe("registerUser method tests", () => {
  scooterApp.registerUser("JoeBloggs", "test123", 21);

  //console logs 'the user has been registered'
  test("", () => {
    expect(console.log).toHaveBeenCalledWith("user has been logged in");
  });

  // updates the registeredUsers property
  test("", () => {
    expect().toBe();
  });

  //throw an error: 'already registered'
  test("", () => {
    expect(() => {
      //something;
    }).toThrow("already registered");
  });

  //throw an error: 'too young to register'
  test("", () => {
    expect(() => {
      //something;
    }).toThrow("too young to register");
  });
});

// loginuser tests
describe("loginUser method tests", () => {
  scooterApp.loginUser("JoeBloggs", "test123");

  //console logs 'the user has been logged in'
  test("", () => {
    scooterApp.loginUser("JoeBloggs", "test123");
    expect(console.log).toHaveBeenCalledWith("user has been logged in");
  });

  //can locate the user
  test("", () => {
    expect().toBe();
  });
  // updates the .loggedIn value of the user
  test("", () => {
    expect().toBe();
  });

  //if the user cant be located
  test("", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(console.log).toHaveBeenCalledWith(
      "Username or password is incorrect"
    );
  });
  //if the password is incorrrect
  test("", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(console.log).toHaveBeenCalledWith(
      "Username or password is incorrect"
    );
  });
});

// logoutUser tests
describe("logoutUser method tests", () => {
  scooterApp.logoutUser("JoeBloggs");

  //console logs 'the user is logged out'
  test("", () => {
    scooterApp.loginUser("JoeBloggs", "test123");
    expect(console.log).toHaveBeenCalledWith("the user is logged out");
  });

  //can locate the user
  test("", () => {
    expect().toBe();
  });
  // updates the .loggedIn value of the user
  test("", () => {
    expect().toBe();
  });

  //If the user cannot be located, throw no such user is logged in error
  test("", () => {
    expect(() => {
      //something;
    }).toThrow("no such user is logged in");
  });
});

// create scooter
describe("createScooter method tests", () => {
  scooterApp.createScooter("London");

  // console.logs 'created new scooter'
  test("", () => {
    scooterApp.loginUser("JoeBloggs", "test123");
    expect(console.log).toHaveBeenCalledWith("the user is logged out");
  });

  // updates the .stations object with this scooter as a scooter in that stations list
  test("", () => {
    expect().toBe();
  });

  //station index station.length - 1 should be instance of Scooter
  test("", () => {
    expect().toBeInstanceOf(Scooter);
  });

  //If the station cannot be located, throw no such station error
  test("", () => {
    expect(() => {
      //something;
    }).toThrow("no such station");
  });
});

// dock scooter
describe("dockScooter method tests", () => {
  const scooter = new Scooter("Liverpool");
  scooterApp.dockScooter(scooter, "London");

  // Log scooter is docked to the console.
  test("", () => {
    scooterApp.dockScooter(scooter, "London");
    expect(console.log).toHaveBeenCalledWith("scooter is docked");
  });

  // updates the .stations object with this scooter as a scooter in that stations list
  test("", () => {
    expect().toBe();
  });

  //station index station.length - 1 should be instance of Scooter
  test("", () => {
    expect().toBeInstanceOf(Scooter);
  });

  //Throws 'no such station' error if the station does not exist.
  test("", () => {
    expect(() => {
      //something;
    }).toThrow("no such station");
  });

  //Throws 'scooter already at station' error if the scooter is already there.
  test("", () => {
    expect(() => {
      //something;
    }).toThrow("scooter already at station");
  });
});

// rent scooter
describe("rentScooter method tests", () => {
  const scooter1 = new Scooter("Liverpool");
  scooterApp.dockScooter(scooter1, "London");
  scooterApp.registerUser("JoeBloggs", "test123", 21);

  // Log scooter is rented to the console.
  test("", () => {
    scooterApp.rentScooter(scooter1, "JoeBloggs");
    expect(console.log).toHaveBeenCalledWith("scooter is rented");
  });

  // can locate scooter
  test("", () => {
    expect().toBe();
  });

  //Removes scooter from station
  test("", () => {
    expect().toBe();
  });

  //Throws 'scooter already rented' error if the scooter is already rented.
  test("", () => {
    expect(() => {
      //something;
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
