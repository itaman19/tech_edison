import * as ActionTypes from "../ActionTypes";

export const id = (
	state = {
		id: "",
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_ID:
			return {
				...state,
				id: action.payload,
			};

		default:
			return state;
	}
};
