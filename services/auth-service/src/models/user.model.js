class User {
    constructor(username, password, refresh_token = null) {
      this.username = username;
      this.password = password;
      this.refresh_token = refresh_token;
    }
}

module.exports = User;