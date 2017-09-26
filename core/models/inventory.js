'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Mixed = Schema.Types.Mixed;

const InventorySchema = new Schema({
	sku: { type: String },
	status: { type: String, default: 'available' },
	qty: { type: Number, default: 0 },
	carted: { type: [
		{ type: {
			sku: { type: String },
			qty: { type: Number, default: 1 },
			order: { type: ObjectId, ref: 'Order' },
			product: { type: ObjectId, ref: 'Product' }
		}
	}
	]},
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', InventorySchema);