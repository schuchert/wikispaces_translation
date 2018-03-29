"use strict";

const fs = require('fs-extra');
const walk = require('walk');

const readline = require('linebyline');

var madeDirectories = [];

function handleMarkupFile(root, name, fromDir, toDir) {
	const srcDir = root;
	const destDir = srcDir.replace(fromDir, toDir);

	const srcName = `${srcDir}/${name}`;

	if(madeDirectories.indexOf(destDir) < 0) {
		fs.mkdirSync(destDir);
		madeDirectories.push(destDir);
	}

	const destName = `${destDir}/${name}.md`;
	let dest = fs.openSync(destName,'w+');
	let writeStream = fs.createWriteStream(destName);

	writeStream.once('open', (fd) => {
		let lineReader = readline(srcName);
		lineReader.on('line', function(line, lineCount, byteCount) {
			writeStream.write(line);
			writeStream.write('\n');
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
			handleMarkupFile(root, fileStats.name, fromDir, toDir);
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
