"use strict";

const fs = require('fs-extra');
const walk = require('walk');

const process = function(fromDir, toDir) {
	const options = { followLinks: false };
	const walker = walk.walk(fromDir, options);

	walker.on('errors', function(root, nodeStatsArray, next) {
		console.log(`Error: ${root}`);
		next();
	});

	walker.on('names', function(root, nodeNamesArray) {
		console.log(`names: ${root} ` + nodeNamesArray.length);
	});

	walker.on('file', function(root, fileStats, next) {
		const src = root + '/' + fileStats.name;
		const dest = src.replace(fromDir, toDir);
		fs.copy(src, dest, err => { if(err) return console.error(err); });
		next();
	});

	walker.on('end', function() {
		console.log('Walker all done');
	});
}

exports.process = process;
