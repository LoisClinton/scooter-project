const Scooter = require("../src/Scooter");
const User = require("../src/User");

// typeof scooter === object;
describe("scooter object", () => {
  const scooter = new Scooter("Liverpool");

  test("Scooter class should create Scooter instance", () => {
    expect(scooter).toBeInstanceOf(Scooter);
  });
});

// Scooter  other property tests here
describe("Scooter property tests", () => {
  const scooter = new Scooter("Liverpool");
  const user = new User("JoeBloggs", "test123", 21);

  // test station
  test("station should be a String", () => {
    expect(typeof scooter.station).toBe("string");
  });
  test("station should be 'Liverpool'", () => {
    expect(scooter.station).toBe("Liverpool");
  });

  // test user (initialised)
  test("if docked user should be the null", () => {
    expect(scooter.user).toBe(null);
  });

  // test user (after method call)
  test("if not docked user should be the User who checked out the Scooter", () => {
    scooter.rent(user);
    expect(scooter.user).toEqual({
      username: "JoeBloggs",
      password: "test123",
      age: 21,
      loggedIn: false,
    });
  });

  // test charge (initialised)
  test("charge should be a number", () => {
    expect(typeof scooter.charge).toBe("number");
  });
  test("charge should start at 100", () => {
    expect(scooter.charge).toBe(100);
  });

  // test isBroken (initialised)
  test("isBroken should be a boolean", () => {
    expect(typeof scooter.isBroken).toBe("boolean");
  });
  test("isBroken should initialize as false", () => {
    expect(scooter.isBroken).toBe(false);
  });
});

// Scooter method tests
describe("Scooter method tests", () => {
  const scooter = new Scooter("Liverpool");
  const user = new User("JoeBloggs", "test123", 21);

  // test rent
  test("If the Scooter is charged above 20% and not broken, remove it from its station.", () => {
    scooter.rent(user);
    expect(scooter.station).toBe(null);
  });
  test("If the Scooter is charged above 20% and not broken, check it out to the user.", () => {
    scooter.rent(user);
    expect(scooter.user).toEqual({
      username: "JoeBloggs",
      password: "test123",
      age: 21,
      loggedIn: false,
    });
  });
  test("If the Scooter has less than 20%, throw an error scooter needs to charge", () => {
    scooter.charge = 19;
    expect(() => {
      scooter.rent(user);
    }).toThrow("scooter needs to charge");
  });
  test("If the Scooter is broken, throw an error scooter needs repair", () => {
    scooter.isBroken = true;
    expect(() => {
      scooter.rent(user);
    }).toThrow("scooter needs repair");
  });
  //requestRepair method                                //NEEDS EDITING
  //charge method                                       //NEEDS EDITING
});

describe("Scooter dock method tests", () => {
  const scooter = new Scooter("Liverpool");
  const user = new User("JoeBloggs", "test123", 21);
  // test dock
  test("dock clears out the user", () => {
    scooter.rent(user); //rent first
    scooter.dock("Liverpool");
    const result = scooter.user;
    expect(result).toBe(null);
  });

  test("dock returns scooter to station", () => {
    scooter.rent(user); //rent first
    scooter.dock("Liverpool");
    const result = scooter.station;
    expect(result).toBe("Liverpool");
  });
});
