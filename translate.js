"use strict";

const fs = require('fs-extra');
const walk = require('walk');

const readline = require('linebyline');

function handleMarkupFile(src, dest) {
	fs.copy(src, dest, err => {
		if (err) return console.error(err);
	});
}

/*
function handleMarkupFile2(src, dest) {
	const destName = `${dest}.md`;

	console.log(destName);
	let destfs.openSync(destName);
	let writeStream = fs.createWriteStream(destName);

	writeStream.once('open', (fd) => {
		let lineReader = readline(src);
		lineReader.on('line', function(line, lineCount, byteCount) {
			writeStream.write(line);
		}).on('close', function() {
			writeStream.end();
		}).on('error', function(e) {
			console.error(e);
		});
	});

	writeStream.on('error', (e) => {
		console.error(e);
	});
}
*/


function process(fromDir, toDir) {
	const markupRe = /[^.]$/;
	const options = {
		followLinks: false
	};
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
		if (src.match(markupRe)) {
			handleMarkupFile(src, dest);
		} else {
			fs.copy(src, dest, err => {
				if (err) return console.error(err);
			});
		}
		next();
	});

	walker.on('end', function() {
		console.log('Walker all done');
	});
}

exports.process = process;
