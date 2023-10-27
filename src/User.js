class User {
  constructor(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }

  login(password) {
    // check if password passed in is the same
    if (password === this.password) {
      this.loggedIn = true;
    } else {
      // if it isnt, then throw error
      throw new Error("incorrect password");
    }
  }

  logout() {
    this.loggedIn = false;
  }
}

module.exports = User;
