'use strict';

const MAX_PRODUCT_SHOWN = 50;
const _ = require('lodash');
const Product = require('../models/product');

class ProductCatalog {
	constructor(opts, ProductModel) {
		opts = opts || {};
		this.maxProductShown = opts.maxProductShown || MAX_PRODUCT_SHOWN;
		this.product = ProductModel || Product;
	}
	add(data, callback) {
		this.Product.create(data, callback);
	}
	edit(sku, data, callback) {
		// remove sku; this should not change,
		// add a new product if it needs to change
		delete data.sku;

		this.Product.findBySKU(sku, (err, product) => {
			if (err) {
				return callback(err);
			}

			_.assign(product, data);
			// tell mongoose to increment the doc version '__v'
			product.increment();
			product.save(callback);
		});
	}
	list(query, limit, skip, callback) {
		if (typeof query === 'function') {
			callback = limit;
			limit = this.maxProductShown;
			skip = 0;
		}
		//make sure we only allow retrivin 50 products from the catalog
		if (+limit > this.maxProductShown) {
			limit = this.maxProductShown;
		}
		this.Product.find(query).limit(limit).skip(skip).exec(callback);
	}
	details(sku, callback) {
		this.Product.findBySKU(sku, callback);
	}
	detailsBySlug(slug, callback) {
		this.Product.findBySlug(slug, callback);
	}
	Remove a product:
	remove(sku, callback) {
		this.Product.findBySKU(sku, (err, product) => {
			if (err) {
				return callback(err);
			}

			product.remove(callback);
		});
	}
}

module.exports = ProductCatalog;
