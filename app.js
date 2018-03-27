"use strict";

const fs = require('fs-extra');
const path = require('path');

const SRC_DIR = '~/schuchert'
const DEST_DIR = './schuchert_translated'

fs.remove(DEST_DIR)
	.then(() => { fs.mkdirSync(DEST_DIR) })
	.then(() => {
		console.log('done');
	});
