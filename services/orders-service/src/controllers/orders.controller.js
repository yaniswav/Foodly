const Order = require("../models/orders.model");

/**
 * @lib {get} /order Get order by ID
 * @apiName GetOrderById
 * @apiGroup Orders
 * @apiParam {String} id Order ID.
 * @apiSuccess {Object} order Order details.
 * @apiError {String} message Error message.
 */
exports.getById = async (req, res) => {
    try {
        const order = await Order.find({ id_i: req.query.id }).exec();
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @lib {get} /ordersByUserId Get all orders by user ID
 * @apiName GetAllOrdersByUserId
 * @apiGroup Orders
 * @apiParam {String} id User ID.
 * @apiSuccess {Array} orders List of orders.
 * @apiError {String} message Error message.
 */
exports.getAllByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.query.id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @lib {get} /ordersByRestoId?id Get all orders by restaurant ID
 * @apiName GetAllOrdersByRestaurantId
 * @apiGroup Orders
 * @apiSuccess {Array} orders List of orders.
 * @apiError {String} message Error message.
 */
exports.getAllByRestaurantId = async (req, res) => {
    try {
        const orders = await Order.find({ restaurant_id: req.query.id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @lib {post} /orders Create a new order
 * @apiName CreateOrder
 * @apiGroup Orders
 * @apiBody {Object} order Order details.
 * @apiSuccess {Object} order Created order details.
 * @apiError {String} message Error message.
 */
exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @lib {delete} /orders/:id Delete order by ID
 * @apiName DeleteOrderById
 * @apiGroup Orders
 * @apiParam {String} id Order ID.
 * @apiSuccess {Object} message Deletion result.
 * @apiError {String} message Error message.
 */
exports.deleteById = async (req, res) => {
    try {
        const order = await Order.deleteOne({ id_i: req.params.id });
        res.json({ message: order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @lib {patch} /orders/status/:id Update order status
 * @apiName UpdateOrderStatus
 * @apiGroup Orders
 * @apiParam {String} id Order ID.
 * @apiBody {String} [payment_status] Payment status.
 * @apiBody {String} [status_restorant] Restaurant status.
 * @apiBody {String} [status_delivery] Delivery status.
 * @apiSuccess {Array} order_result Updated order details.
 * @apiError {String} message Error message.
 */
exports.updateStatus = async (req, res) => {
    try {
        const { payment_status, status_restorant, status_delivery } = req.body;

        let order_result = [];
        if (payment_status && payment_status !== "") {
            order_result[0] = await Order.updateOne(
                { id_i: req.params.id },
                { "payment.status": payment_status },
                { new: true }
            );
        }
        if (status_restorant && status_restorant !== "") {
            order_result[1] = await Order.updateOne(
                { id_i: req.params.id },
                { status_restorant: status_restorant },
                { new: true }
            );
        }
        if (status_delivery && status_delivery !== "") {
            order_result[2] = await Order.updateOne(
                { id_i: req.params.id },
                { status_delivery: status_delivery },
                { new: true }
            );
        }

        if (order_result.length == 0) {
            return res.status(400).json({ message: "No status to update" });
        }
        res.status(201).json(order_result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};