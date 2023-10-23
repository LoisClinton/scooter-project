const Scooter = require("../src/Scooter");
const User = require("../src/User");

//typeof scooter === object
describe("scooter object", () => {
  test("Scooter class should create Scooter instance", () => {
    const scooter = new Scooter("Liverpool");
    expect(scooter).toBeInstanceOf(Scooter);
  });
});

// Scooter property tests here
describe("Scooter property tests", () => {
  // test station
  test("station should be a String", () => {
    expect(typeof scooter.station).toBe("string");
  });

  // test user
  test("if not docked user should be the User who checked out the Scooter", () => {
    expect(scooter.user).toBe("");
  });

  test("if docked user should be the null", () => {
    expect(scooter.user).toBe("null");
  });

  // test serial
  test("serial should be a number", () => {
    expect(scooter.serial).toBe("number");
  });

  // test nextSerial
  test("nextSerial should initialize at 1", () => {
    expect(scooter.serial).toBe(1);
  });

  test("nextSerial should be one more that serial", () => {
    expect(scooter.nextSerial).toBe(2);
  });

  test("nextSerial should increment", () => {
    expect(scooter.nextSerial).toBe(3);
  });

  // test charge
  test("charge should start at 100", () => {
    expect(scooter.charge).toBe(100);
  });

  // test isBroken
  test("isBroken should initialize as false", () => {
    expect(scooter.isBroken).toBe(false);
  });

  test("", () => {
    expect().toBe();
  });
});

// Scooter method tests
describe("Scooter method tests", () => {
  // test rent
  test("If the Scooter is charged above 20% and not broken, remove it from its station, check it out to the user.", () => {
    expect().toBe();
  });

  test("If the Scooter has less than 20%, throw an error scooter needs to charge", () => {
    expect(() => {
      scooter.rent(user);
    }).toThrow("scooter needs to charge");
  });

  test("If the Scooter is broken, throw an error scooter needs repair", () => {
    expect(() => {
      scooter.rent(user);
    }).toThrow("scooter needs repair");
  });

  // test dock
  test("Return the scooter to the station. Be sure to clear out the user, so they dont get charged unfairly!", () => {
    expect().toBe();
  });
  //requestRepair method
  //charge method
});
