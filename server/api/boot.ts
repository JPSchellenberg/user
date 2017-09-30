import * as express 	from 'express';
import * as nano 		from 'nano';
import * as bodyParser	from 'body-parser';
import boot_assignments from './assignments';
import boot_collection 	from './collection';
import boot_auth 		from './auth';

export default function boot(server: express.Application, db: nano) {

	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({
		extended: true
	})); 

	boot_assignments(server, db);
	boot_collection(server, db);
	boot_auth(server, db);

	server.use(express.static( __dirname + '/../client'));
	
}