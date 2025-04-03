client = require('../middlewares/postgre-connexion').client;

class Restaurant {
    restaurant_id = null;
    user_id = null;
    restaurant_name = null;
    location = null;
    created_at = null;
    siret = null;
    keywords = null;

    constructor(data) {
        this.restaurant_id = data.restaurant_id || null;
        this.user_id = data.user_id || null;
        this.restaurant_name = data.restaurant_name || null;
        this.location = data.location || null;
        this.created_at = data.created_at || new Date().toLocaleDateString('en-US', 'YYYY-MM-DD');
        this.siret = data.siret || "";
        this.keywords = data.keywords || "";
    }

    static async getById(id) {
        try {
            const res = await client.query('SELECT * FROM restaurants WHERE restaurant_id = $1', [id]);
            if (res.rows === undefined || res.rows.length == 0) { throw new Error('Restaurant not found'); }
            return new Restaurant(res.rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async getByUserId(userId) {
        try {
            const res = await client.query('SELECT * FROM restaurants WHERE user_id = $1', [userId]);
            if (res.rows === undefined || res.rows.length == 0) { throw new Error('No restaurants found for this user'); }
            return res.rows.map(row => new Restaurant(row));
        } catch (error) {
            throw error;
        }
    }

    static async getByKeywords(keywords, page = 1, limit = 10) {
        try {
            const keywordArray = keywords.split(',').map(keyword => `%${keyword.trim()}%`);
            const query = `
                SELECT * FROM restaurants 
                WHERE ${keywordArray.map((_, index) => `(keywords LIKE $${index + 1} OR restaurant_name LIKE $${index + 1})`).join(' OR ')} LIMIT ${limit} OFFSET ${(page - 1) * limit}
            `;
            const res = await client.query(query, keywordArray);
            if (res.rows === undefined || res.rows.length == 0) {
                return [];
            }
            return res.rows.map(row => new Restaurant(row));
        } catch (error) {
            throw error;
        }
    }

    async save() {
        try {
            const res = await client.query(
                'INSERT INTO restaurants (user_id, restaurant_name, location, created_at, siret, keywords) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [this.user_id, this.restaurant_name, this.location, this.created_at, this.siret, this.keywords]
            );
            return new Restaurant(res.rows[0]);
        } catch (error) {
            throw error;
        }
    }

    async update(restaurantId, data) {
        try {
            const res = await client.query(
                'UPDATE restaurants SET user_id = $1, restaurant_name = $2, location = $3, created_at = $4, siret = $5, keywords = $6 WHERE restaurant_id = $7 RETURNING *',
                [data.user_id, data.restaurant_name, data.location, data.created_at, data.siret, data.keywords, restaurantId]
            );
            if (res.rows === undefined || res.rows.length == 0) { throw new Error('Restaurant not found'); }
            return new Restaurant(res.rows[0]);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Restaurant;