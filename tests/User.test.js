const User = require("../src/User");

// User tests here
describe("User property tests", () => {
  const user = new User("Joe Bloggs", "test123", 21);

  // test username
  test("username should be a string", () => {
    expect(typeof user.username).toBe("string");
  });
  // test password
  test("password should be a string", () => {
    expect(typeof user.password).toBe("string");
  });
  // test age
  test("age should be a number", () => {
    expect(typeof user.age).toBe("number");
  });
  // test loggedIn
  test("user is not logged in by default", () => {
    expect(user.loggedIn).toBe(false);
  });
});

describe("User method tests", () => {
  const user = new User("Joe Bloggs", "test123", 21);

  // test login
  test("If password is correct, login should set loggedIn to true.", () => {
    user.login("test123");
    expect(user.loggedIn).toBe(true);
  });
  test("If password is incorrect, throw an 'incorrect password' error.", () => {
    expect(() => {
      user.login("tEst123");
    }).toThrow("incorrect password");
  });
  // test logout
  test("logout method should change loggedIn to false.", () => {
    user.logout();
    expect(user.loggedIn).toBe(false);
  });
});
