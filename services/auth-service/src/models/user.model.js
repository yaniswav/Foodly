client = require('../middlewares/postgre-connexion').client;
const bcrypt = require('bcrypt');

class User {
	email = null;
	role = null;

	constructor(email, role) {
		this.email = email;
		this.role = role;
	}

	static async login(email, password) {
		try {
			const res = await client.query('SELECT * FROM users WHERE email = $1', [email]);

			if (res.rows.length > 0) {
				const user = res.rows[0];
				const isPasswordValid = bcrypt.compareSync(password, user.password);
				if (!isPasswordValid) {
					return false;
				}
				else {
					return new User(user.email, user.role);
				}
			} else {
				return false;
			}
		} catch (error) {
			throw error;
		}
	}

	static async testIfExists(email) {
		try {
			const res = await client.query('SELECT role FROM users WHERE email = $1', [email]);
			if (res.rows.length > 0) {
				return true;
			}
			return false;
		} catch (error) {
			throw error;
		}
	}
};

module.exports = User;