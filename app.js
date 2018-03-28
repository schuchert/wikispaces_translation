"use strict";

const fs = require('fs-extra');
const path = require('path');
const translate = require('./translate');

const SRC_DIR = '/home/vagrant/schuchert';
const DEST_DIR = path.resolve('./schuchert_translated');

console.log(`SRC: ${SRC_DIR}`);
console.log(`DEST: ${DEST_DIR}`);


fs.remove(DEST_DIR)
	.then(() => {
		fs.mkdirSync(DEST_DIR)
	})
	.then(() => {
		translate.process(SRC_DIR, DEST_DIR);
	});
