client = require('../middlewares/postgre-connexion').client;

class MenuItem {
    menu_item_id = null;
    img = null;
    item_name = null;
    price = null;
    restaurant_id_fk = null;

    constructor(data) {
        this.menu_item_id = data.menu_item_id || null;
        this.img = data.img || null;
        this.item_name = data.item_name || null;
        this.price = data.price || null;
        this.restaurant_id_fk = data.restaurant_id_fk || null;
    }

    static async getById(id) {
        try {
            const res = await client.query('SELECT * FROM menu_items WHERE menu_item_id = $1', [id]);
            if (res.rows === undefined || res.rows.length == 0) { throw new Error('Item not found'); }
            return new MenuItem(res.rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async getByRestaurantId(restaurantId) {
        try {
            const res = await client.query('SELECT * FROM menu_items WHERE restaurant_id_fk = $1', [restaurantId]);
            if (res.rows === undefined || res.rows.length == 0) { return []; }
            return res.rows.map(row => new MenuItem(row));
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            const res = await client.query('INSERT INTO menu_items (img, item_name, price, restaurant_id_fk) VALUES ($1, $2, $3, $4) RETURNING *',
                [data.img, data.item_name, data.price, data.restaurant_id]);
            return new MenuItem(res.rows[0]);
        } catch (error) {
            throw error;
        }
    }

    async update(data) {
        try {
            console.log(data);
            const res = await client.query('UPDATE menu_items SET img = $1, item_name = $2, price = $3 WHERE menu_item_id = $4 RETURNING *',
                [data.img, data.item_name, data.price, this.menu_item_id]);
            return new MenuItem(res.rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async delete(menu_item_id) {
        try {
            const res = await client.query('DELETE FROM menu_items WHERE menu_item_id = $1 RETURNING *', [menu_item_id]);
            if (res.rows === undefined || res.rows.length == 0) { throw new Error('Item not found'); }
            return new MenuItem(res.rows[0]);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = MenuItem;