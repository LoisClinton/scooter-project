const Scooter = require("../src/Scooter");
const User = require("../src/User");

// Serial tests seperate to avoid interferance
describe("Scooter class serial number tests", () => {
  const scooter = new Scooter("Liverpool");

  // test nextSerial and serial first to avoid interferance
  test("serial should be one and nextSerial should be 2", () => {
    const answer = { current: scooter.serial, next: Scooter.nextSerial };
    expect(answer.current).toBe(1);
    expect(answer.next).toBe(2);
  });
  test("nextSerial should be one more that serial", () => {
    const answer = { current: scooter.serial, next: Scooter.nextSerial };
    const result = answer.next - answer.current;
    console.log(answer.next, answer.current);
    expect(result).toBe(1);
  });

  test("nextSerial should increment", () => {
    const scooter2 = new Scooter("London");
    expect(Scooter.nextSerial).toBe(3);
  });

  test("nextSerial should be number", () => {
    expect(typeof Scooter.nextSerial).toBe("number");
  });

  test("serial should be a number", () => {
    expect(typeof scooter.serial).toBe("number");
  });
});
