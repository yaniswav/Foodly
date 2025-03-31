const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
    id_i: String,
    user_id: String,
    restaurant_id: String,
    delivery_id: String,

    status_restorant: String,
    status_delivery: String,
    total_price: Number,
    created_at: {
        type: Date,
        default: Date.now,
    },
    address: {
        address: String,
        city: String,
        zip: String,
    },
    payment: {
        amout: Number,
        payment_method: {
            type: String,
            enum: ['cash', 'card'],
            default: 'card',
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending',
        },
    },
    items: [
        {
            title: String,
            price: Number,
            quantity: Number,
        },
    ],
});

// OrderSchema.methods.speak = function speak() {
//     const greeting = this.title
//         ? 'Meow name is ' + this.title
//         : 'I don\'t have a name';
//     console.log(greeting);
// };

const Order = model('orders', OrderSchema);
module.exports = Order;


// Body Example

// {
//     "id_i": "String",
//     "user_id": "String",
//     "restaurant_id": "String",
//     "delivery_id": "String",

//     "status_restorant": "String",
//     "status_delivery": "String",
//     "total_price": 1,
//     "created_at": "2025-04-11",
//     "address": {
//         "address": "String",
//         "city": "String",
//         "zip": "String"
//     },
//     "payment": {
//         "amout": 1,
//         "payment_method": "cash",
//         "status": "pending"
//     },
//     "items": [
//         {
//             "title": "String",
//             "price": 1,
//             "quantity": 1
//         },
//       {
//             "title": "String2",
//             "price": 2,
//             "quantity": 2
//         }
//     ]
// }