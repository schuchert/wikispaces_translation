"use strict";

const path = require('path');
const translate = require('./translate');
const dirs = require('./dirs');

const SRC_DIR = '/home/vagrant/schuchert';
const DEST_DIR = path.resolve('./schuchert_translated');

console.log(`SRC: ${SRC_DIR}`);
console.log(`DEST: ${DEST_DIR}`);

dirs.createParallelStructure(SRC_DIR, DEST_DIR).then(() => {
	translate.process(SRC_DIR, DEST_DIR);
});;
