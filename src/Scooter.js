class Scooter {
  // nextSerial set to 1
  static nextSerial = 1;

  constructor(station) {
    // station is the only value passsed in
    this.station = station;
    // initialised values
    this.user = null;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user) {
    if (this.isBroken === true) {
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

  // TO ADD:
  // recharge()
  // requestRepair()
}

module.exports = Scooter;
