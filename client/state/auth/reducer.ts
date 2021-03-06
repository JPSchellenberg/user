import {
	assign,
	unionBy,
} 		from 'lodash';

import { Auth } from './types';

import {
	AUTH_GET_SESSION_SUCCESS,
	AUTH_LOGIN_ERROR,
	AUTH_LOGIN_SUCCESS,
	AUTH_REGISTER_ERROR
} from '../action-types';

const initialState: Auth = {
	is_authed: false,
	response: 0
};

export default function(state: Auth = initialState, action): Auth {
	switch (action.type) {

		case AUTH_GET_SESSION_SUCCESS:
			return assign({}, state, { is_authed: true });

		case AUTH_LOGIN_ERROR:
		case AUTH_REGISTER_ERROR:
			return assign({}, state, { response: action.payload.status });

		case '@@INIT':
			return initialState;

		default:
			return state;
	}
}
