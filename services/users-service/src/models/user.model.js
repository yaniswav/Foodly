client = require('../middlewares/postgre-connexion').client;
const bcrypt = require('bcrypt');

class User {
    user_id = null;
    firstname = null;
    lastname = null;
    email = null;
    password = null;
    sponsorship_code = null;
    role = null;
    created_at = null;
    api_key = null;

    constructor(data) {
        this.user_id = data.user_id || null;
        this.firstname = data.firstname || null;
        this.lastname = data.lastname || null;
        this.email = data.email || null;
        this.role = data.role;
        this.password = bcrypt.hashSync(data.password, 10) || null;
        this.sponsorship_code = data.sponsorship_code || [...Array(10)].map(() => Math.random().toString(36)[2]).join('');
        this.created_at = data.created_at || new Date().toLocaleDateString('en-US', 'YYYY-MM-DD');
        this.api_key = data.api_key || [...Array(16)].map(() => Math.random().toString(36)[2]).join('');
    }

    static async getById(id) {
        try {
            const res = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);
            if (res.rows === undefined || res.rows.length == 0) { throw new Error('User not found'); }
            return new User(res.rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async testIfExists(id = null, email = null) {
        try {
            const res = await client.query(
                'SELECT * FROM users WHERE user_id = $1 OR email = $2',
                [id, email]
            );
            if (res.rows.length > 0) {
                return true; // id or email already exists
            }
            return false; // id and email are available
        } catch (error) {
            throw error;
        }
    }

    async save() {
        try {
            const res = await client.query(
                'INSERT INTO users (firstname, lastname, email, password, sponsorship_code, role, created_at, api_key) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [this.firstname, this.lastname, this.email, this.password, this.sponsorship_code, this.role, this.created_at, this.api_key]
            );
            return new User(res.rows[0]);
        } catch (error) {
            throw error;
        }
    }

    async update(userId, data) {
        try {
            const fields = Object.keys(data).map((key, index) => `${key} = $${index + 1}`).join(', ');
            const values = Object.values(data);
            values.push(userId); // Add userId to the end of the values array
            const query = `UPDATE users SET ${fields} WHERE user_id = $${values.length} RETURNING *`;
            
            const res = await client.query(query, values);
            if (res.rows.length === 0) {
                throw new Error('User not found or no changes made');
            }
            return new User(res.rows[0]);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = User;