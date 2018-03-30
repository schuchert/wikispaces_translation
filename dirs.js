'use strict';

const walk = require('walk');
const fs = require('fs-extra');
const path = require('path');


function findDirectoriesIn(fromDir) {
	var dirs = [];

	var promise = new Promise((resolve, reject) => {
		const walker = walk.walk(fromDir);

		walker.on('directory', (root, fileStats, next) => {
			let relativeBaseName = root.replace(fromDir, '');
			let relativeDirectory = relativeBaseName + '/' + fileStats.name;
			dirs.push(relativeDirectory);
			next();
		});

		walker.on('end', () => {
			resolve(dirs);
		});
	});

	return promise;
}

function removeOldToStructure(toDir) {
	fs.removeSync(toDir);
}

function buildToStructure(directories, toDir) {
	['', ...directories].forEach((dir) => {
		fs.mkdirSync(path.join(toDir, dir));
	});
}

function createParallelStructure(fromDir, toDir) {
	return findDirectoriesIn(fromDir).then((dirs) => {
		removeOldToStructure(toDir);
		buildToStructure(dirs, toDir);
	});
}

exports.createParallelStructure = createParallelStructure;
