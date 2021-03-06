import * as request from 'superagent';

declare var window;

export function get_collections() {
	return request
	.get('/api/user/assignments')
	.set('x-auth',  window.localStorage.jwt_token || window.jwt_token || '');	
}

export function post_collectionmeta(collection_id: string) {
	return request
	.post('/api/user/v0/collectionmeta')
	.send({ collection_id })
	.set('x-auth',  window.localStorage.jwt_token || window.jwt_token || '');
}

export function submit_collection(collection_meta_id: string) {
	return request
	.put('/api/user/v0/collectionmeta/' + collection_meta_id + '/submit')
	.set('x-auth',  window.localStorage.jwt_token || window.jwt_token || '');
}

export function reset_collection(collection_meta_id: string) {
	return request
	.put('/api/user/collection/' + collection_meta_id + '/reset')
	.set('x-auth',  window.localStorage.jwt_token || window.jwt_token || '');	
}