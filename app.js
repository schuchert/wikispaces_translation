const fs = require('fs-extra');

const SRC_DIR = '~/schuchert'
const DEST_DIR = './schuchert_translated'

fs.removeSync(DEST_DIR);
fs.mkdirSync(DEST_DIR);
