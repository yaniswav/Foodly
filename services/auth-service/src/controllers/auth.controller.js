const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user.model");

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
	jwt.verify(token, process.env.ACCESS_JWT_KEY, async (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: "Unauthorized!" });
		} else {
			const verify = await User.testIfExists(decoded.email);
			if (verify) {
				return res.status(200).json({ message: "You can access ! lv: " + decoded.role });
			} else {
				return res.status(404).json({ message: "Permission rejected !" });
			}
		}
	});
};

exports.login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.login(email, password);

	if (user) {
		const accessToken = jwt.sign({ email: user.email, role: user.role, exp: Math.floor(Date.now() / 1000) + 60 * 120 }, process.env.ACCESS_JWT_KEY);
		const refreshToken = jwt.sign({ email: user.email, role: user.role, exp: Math.floor(Date.now() / 1000) + 60 * 240 }, process.env.REFRESH_JWT_KEY);

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

		return res.status(200).json({ "user": user, "access_tocken": accessToken, "access_token_expiresIn": Math.floor(Date.now() / 1000) + 120, "refresh_token_expiresIn": Math.floor(Date.now() / 1000) + 360 });
	} else {
		return res.status(401).json({ message: "Invalid credentials" });
	}
};