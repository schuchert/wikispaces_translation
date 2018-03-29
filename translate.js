"use strict";

const fs = require('fs-extra');
const walk = require('walk');
const readline = require('linebyline');

function handleMarkupFile(root, name, fromDir, toDir) {
	const srcDir = root;
	const destDir = srcDir.replace(fromDir, toDir);

	const srcName = `${srcDir}/${name}`;

	const destName = `${destDir}/${name}.md`;
	let dest = fs.openSync(destName,'w+');
	let writeStream = fs.createWriteStream(destName);

	writeStream.once('open', (fd) => {
		let lineReader = readline(srcName);
		lineReader.on('line', function(line, lineCount, byteCount) {
			var m;
			if(m = line.match('^([=]+) *(.*[^=])=+$')) {
				line = m[1].replace(/=/g, '#') + ' ' + m[2];
			}
			if(line.match(/^\[\[code\]\]$/)) {
				line = '```'
			}
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
	const markupRe = /mainSpace$/;
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

		if (root.match(markupRe)) {
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
