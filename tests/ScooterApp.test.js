const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

const scooterApp = new ScooterApp();
// ScooterApp tests here

// property tests
describe("registerUser method tests", () => {
  test("Should return instance of User", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(response).toBeInstanceOf(User);
  });
});

// method tests

describe("registerUser method tests", () => {
  test("Should return instance of User", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(response).toBeInstanceOf(User);
  });
});

// loginuser
describe("loginUser method tests", () => {
  test("", () => {
    expect().toBe();
  }); //INHERITED ?
});

// logoutuser
describe("logoutUser method tests", () => {
  test("", () => {
    expect().toBe();
  }); //INHERITED ?
});

// create scooter

// dock ccooter

// rent scooter

// dock scooter
