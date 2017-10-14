import { assign } 	   from 'lodash';
import * as express 	from 'express';
import * as nano 	   from 'nano';

import { Request } 		from '../middleware/auth';
const _nano = nano( process.env.DB_HOST || 'http://localhost:5984' );
const _db = _nano.db.use( process.env.DB || 'lumidb' );

export function create() {
	return (req: Request, res: express.Response, next: express.NextFunction) => {
		_db.insert( req.doc , (err, body) => {
			if (err) { res.status(500).json(err); return; }
			_db.get(body.id, (err, body) => {
				if (err) { res.status(500).json(err); return; }				
				res.status(201).json(body);
			});
		});
	};
}

export function read() {
	return (req: express.Request, res: express.Response, next: express.NextFunction) => {
		_db.get(req.params._id, (err, body) => {
			if (err) { res.status(500).json(err); return; }				
			res.status(200).json(body);
		});
	};
}

export function update(_update: Object) {
	return (req: express.Request, res: express.Response, next: express.NextFunction) => {

		_db.get( req.params._id , (err, body) => {
			if (err) { res.status(500).json(err); return; }
			const updated_doc = assign({}, body, _update);
	
			_db.insert(updated_doc, (err, body) => {
				if (err) { res.status(500).json(err); return; }				
				res.status(200).json(body);
			});
	
		});
	};
}

export function destroy() {
	return (req: express.Request, res: express.Response, next: express.NextFunction) => {
		_db.get(req.params._id, (err, body) => {
			if (err) { res.status(500).json(err); return; }				
			
			_db.destroy(req.params._id, body._rev, (err, body) => {
				if (err) { res.status(500).json(err); return; }				
				res.status(200).end();
			});
			
		});
	};
}