import * as shortid from 'shortid';

import {
	Collection,
	CollectionMeta,
} 	from './types';

import * as API from './api';

import {
	COLLECTION_CREATEMETA_ERROR,
	COLLECTION_CREATEMETA_REQUEST,
	COLLECTION_CREATEMETA_SUCCESS,

	COLLECTION_GET_ERROR,
	COLLECTION_GET_REQUEST,
	COLLECTION_GET_SUCCESS,

	COLLECTION_SUBMIT_ERROR,
	COLLECTION_SUBMIT_REQUEST,
	COLLECTION_SUBMIT_SUCCESS,

	COLLECTION_RESET_REQUEST,
	COLLECTION_RESET_SUCCESS,
	COLLECTION_RESET_ERROR

}							from '../action-types';

export function get_collections() {
	return {
		types: [COLLECTION_GET_REQUEST, COLLECTION_GET_SUCCESS, COLLECTION_GET_ERROR],
		api: API.get_collections()
	};
}

export function collection_create_meta(collection_id: string, id: string = shortid()) {
	return {
		types: [COLLECTION_CREATEMETA_REQUEST, COLLECTION_CREATEMETA_SUCCESS, COLLECTION_CREATEMETA_ERROR],
		api: API.post_collectionmeta(collection_id),
		payload: { id, collection_id }
	};
}

export function submit_collection(collection_meta_id: string, id: string = shortid()) {
	return {
		types: [COLLECTION_SUBMIT_REQUEST, COLLECTION_SUBMIT_SUCCESS, COLLECTION_SUBMIT_ERROR],
		api: API.submit_collection(collection_meta_id),
		payload: { payload: { collection_meta_id } }
	};
}

export function reset_collection(collection_meta_id: string) {
	return {
		types: [COLLECTION_RESET_REQUEST, COLLECTION_RESET_SUCCESS, COLLECTION_RESET_ERROR],
		api: API.reset_collection(collection_meta_id),
		payload: { payload: { collection_meta_id } }
	};
}