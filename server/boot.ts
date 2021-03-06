import * as _debug from 'debug';

import server from './server';
import * as cluster from 'cluster';
import * as os from 'os';

import wait_for_couchdb from './utils/wait_for_couchdb';
import boot_db 			from './db/boot';
declare var process;

const debug = _debug('core');
const express_debug = _debug('boot:express');

if (process.env.NODE_ENV !== 'production') {
	wait_for_couchdb(boot_db);
	boot();
} else {
	const numCPUs = os.cpus().length;
	if (cluster.isMaster) {

		wait_for_couchdb(boot_db);

		for (let i = 0; i < numCPUs; i++) {
			const worker = cluster.fork();
		}

		cluster.on('exit', (deadWorker, code, signal) => {
			const worker = cluster.fork();
		});
	} else {
		boot();
	}
}

function boot() {
	debug('starting boot-sequence');

	server.listen(process.env.PORT || 80, function () {
		debug('express-server successfully booted on port ' + process.env.PORT || 80);
	});
	
	debug('finished boot-sequence');
}
