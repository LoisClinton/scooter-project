class User {
  // User code here
  constructor(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }

  login(password) {
    //check if password is the same as this instance of password
    if (password === this.password) {
      this.loggedIn = true;
    } else {
      // if it isnt the same throw error
      throw new Error("incorrect password");
    }
  }

  logout() {
    this.loggedIn = false;
  }
}

module.exports = User;
