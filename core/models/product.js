'use strict';

const mongoose = require('mongoose');
const Money = require('./money').schema;
const commonHelper = require('../helpers/common');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Mixed = Schema.Types.Mixed;

const ProductSchema = new Schema({
	sku: { type: String, required: true },
	category: { type: String },
	title: { type: String, required: true },
	summary: { type: String },
	description: { type: String },
	slug: { type: String },
	images: { type: [
		{
			caption: { type: String },
			filename: { type: String }
		}
		]},
	price: { type: Money },
	details: { type: Mixed },
	active: { type: Boolean, default: false }
});
ProductSchema.pre('save', function(next) {
	this.slug = commonHelper.createSlug(this.title);
	next();
});

module.exports = mongoose.model('Product', ProductSchema);