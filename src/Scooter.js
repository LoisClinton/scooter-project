class Scooter {
  // auto-incremented every instance creation
  static nextSerial = 1;

  constructor(station) {
    this.station = station; // station is the only value passsed in
    this.user = null;
    this.charge = 100;
    this.isBroken = false;
    // auto-incrementing on instance creation
    const temp = Scooter.nextSerial;
    this.serial = temp;
    Scooter.nextSerial++;
  }

  rent(user) {
    if (this.isBroken) {
      throw new Error("scooter needs repair");
    } else if (this.charge < 20) {
      throw new Error("scooter needs to charge");
    } else {
      this.station = null;
      this.user = user;
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }

  // BONUS TO ADD:
  // recharge()
  // requestRepair()
}

module.exports = Scooter;
