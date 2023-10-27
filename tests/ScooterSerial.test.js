const Scooter = require("../src/Scooter");
const User = require("../src/User");

// Serial tests in seperate test suite to avoid interferance
describe("Scooter serial & nextSerial property tests", () => {
  const scooter = new Scooter("Liverpool");

  test("serial should be a number", () => {
    expect(typeof scooter.serial).toBe("number");
  });

  test("static nextSerial should be number", () => {
    expect(typeof Scooter.nextSerial).toBe("number");
  });

  test("serial should be 1", () => {
    expect(scooter.serial).toBe(1);
  });

  test("static nextSerial should be 2", () => {
    expect(Scooter.nextSerial).toBe(2);
  });

  test("nextSerial should be one more that serial", () => {
    const result = Scooter.nextSerial - scooter.serial;
    expect(result).toBe(1);
  });

  test("nextSerial should increment when creating another Scooter instance", () => {
    const scooter2 = new Scooter("London");

    expect(scooter2.serial).toBe(2);
    expect(Scooter.nextSerial).toBe(3);
  });
});
