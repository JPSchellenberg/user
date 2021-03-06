import { assign } 		from 'lodash';

import { UI }						from './types';

import {
	UI_DIALOG_CLOSE,
	UI_DIALOG_OPEN,
	UI_LEFT_DRAWER_CLOSE,
	UI_OPEN_LEFT_DRAWER,
	UI_RIGHT_DRAWER_CLOSE,
	UI_RIGHT_DRAWER_OPEN,
} from '../action-types';

const initialState: UI = {
	left_drawer_show: false,
	right_drawer_show: false,
	dialog_show: false,
};

export default function(state: UI = initialState, action): UI {

	switch (action.type) {

		case UI_OPEN_LEFT_DRAWER:
			return assign({}, state, { left_drawer_show: true });

		case UI_LEFT_DRAWER_CLOSE:
			return assign({}, state, { left_drawer_show: false });

		case UI_DIALOG_OPEN:
			return assign({}, state, { dialog_show: true });

		case UI_DIALOG_CLOSE:
			return assign({}, state, { dialog_show: false });

		case UI_RIGHT_DRAWER_OPEN:
			return assign({}, state, { right_drawer_show: true });

		case UI_RIGHT_DRAWER_CLOSE:
			return assign({}, state, { right_drawer_show: false });

		default:
			return state;

	}

}
