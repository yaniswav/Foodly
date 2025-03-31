const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const User_DB = [];

exports.authenticate = (req, res) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format!" });
  }
  token = tokenParts[1];
  jwt.verify(token, process.env.ACCESS_JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    } else {
      const verify = User_DB.find((u) => u.username === decoded.username);
      if (verify) {
        return res.status(200).json({ message: "You can access !" });
      } else {
        return res.status(404).json({ message: "Permission rejected !" });
      }
    }
  });
};

exports.register = (req, res) => {
  var newUser = new User(req.body.username, bcrypt.hashSync(req.body.password, 10));
  User_DB.push(newUser);
  return res.status(201).json({
    "msg": "New User created !"
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = User_DB.find((u) => u.username === username && bcrypt.compareSync(password, u.password));
  if (user) {
    const accessToken = jwt.sign({ username: user.username, exp: Math.floor(Date.now() / 1000) + 60 * 120 }, process.env.ACCESS_JWT_KEY);
    const refreshToken = jwt.sign({ username: user.username, exp: Math.floor(Date.now() / 1000) + 60 * 240 }, process.env.REFRESH_JWT_KEY);
    user.refresh_token = refreshToken;
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: Math.floor(Date.now() / 1000) + 120
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: Math.floor(Date.now() / 1000) + 360,
      path: '/token'
    });

    return res.status(200).json({ "access_tocken": accessToken, "access_token_expiresIn": Math.floor(Date.now() / 1000) + 120, "refresh_token_expiresIn": Math.floor(Date.now() / 1000) + 360 });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

exports.refresh = (req, res) => {
  let refreshToken = req.headers["authorization"];

  if (!refreshToken) {
    return res.status(401).send({ message: "No refresh token provided!" });
  }

  const refreshTokenParts = refreshToken.split(" ");

  if (refreshTokenParts.length !== 2 || refreshTokenParts[0] !== "Bearer") {
    return res.status(401).send({ message: "Invalid refresh token format!" });
  }

  refreshToken = refreshTokenParts[1];

  jwt.verify(refreshToken, process.env.REFRESH_JWT_KEY, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).send({ message: "Refresh token expired!" });
      } else {
        return res.status(401).send({ message: "Invalid refresh token!" });
      }
    }
    const user = User_DB.find((u) => u.username === decoded.username);
    if (user.refresh_token !== refreshToken) return res.status(403).send({ message: "Token provided is not same at stored in database" });
    const newAccessToken = jwt.sign({ username: decoded.username }, process.env.ACCESS_JWT_KEY);
    res.json({ accessToken: newAccessToken });
  });
};