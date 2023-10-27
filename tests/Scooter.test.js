const Scooter = require("../src/Scooter");
const User = require("../src/User");

describe("Scooter type test", () => {
  const scooter = new Scooter("Liverpool");

  test("scooter class should create Scooter instance", () => {
    expect(scooter).toBeInstanceOf(Scooter);
  });
});

describe("Scooter property tests", () => {
  const scooter = new Scooter("Liverpool");
  const user = new User("JoeBloggs", "test123", 21);

  test("station should be a String", () => {
    expect(typeof scooter.station).toBe("string");
  });

  test("station should be 'Liverpool'", () => {
    expect(scooter.station).toBe("Liverpool");
  });

  test("if docked user should be the null", () => {
    expect(scooter.user).toBe(null);
  });

  test("if not docked user should be of type User and who checked out the Scooter", () => {
    scooter.rent(user);

    expect(scooter.user).toBeInstanceOf(User);

    expect(scooter.user).toEqual({
      username: "JoeBloggs",
      password: "test123",
      age: 21,
      loggedIn: false,
    });
  });

  test("charge should be a number", () => {
    expect(typeof scooter.charge).toBe("number");
  });

  test("charge should start at 100", () => {
    expect(scooter.charge).toBe(100);
  });

  test("isBroken should be a boolean", () => {
    expect(typeof scooter.isBroken).toBe("boolean");
  });

  test("isBroken should initialize as false", () => {
    expect(scooter.isBroken).toBe(false);
  });
});

describe("Scooter .rent() method tests", () => {
  const scooter = new Scooter("Liverpool");
  const user = new User("JoeBloggs", "test123", 21);

  test("if the Scooter is charged above 20% and not broken, remove it from its station.", () => {
    scooter.rent(user);
    expect(scooter.station).toBe(null);
  });

  test("if the Scooter is charged above 20% and not broken, check it out to the user.", () => {
    scooter.rent(user);

    expect(scooter.user).toBeInstanceOf(User);

    expect(scooter.user).toEqual({
      username: "JoeBloggs",
      password: "test123",
      age: 21,
      loggedIn: false,
    });
  });

  test("if the Scooter has less than 20%, throw an error scooter needs to charge", () => {
    scooter.charge = 19;

    expect(() => {
      scooter.rent(user);
    }).toThrow("scooter needs to charge");
  });

  test("if the Scooter is broken, throw an error scooter needs repair", () => {
    scooter.isBroken = true;

    expect(() => {
      scooter.rent(user);
    }).toThrow("scooter needs repair");
  });
});

describe("Scooter .dock() method tests", () => {
  const scooter = new Scooter("Liverpool");
  const user = new User("JoeBloggs", "test123", 21);

  test("dock clears out the user", () => {
    scooter.rent(user);
    scooter.dock("Liverpool");

    expect(scooter.user).toBe(null);
  });

  test("dock returns scooter to station", () => {
    scooter.rent(user);
    scooter.dock("Liverpool");

    expect(scooter.station).toBe("Liverpool");
  });
});

// BONUS: testing requestRepair method
// BONUS: charge method
