import * as ActionTypes from "../ActionTypes";

export const buttonstate = (
	state = {
		buttonstate: "Write",
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.CHANGE_BUTTON:
			return {
				...state,
				buttonstate: action.payload,
			};

		default:
			return state;
	}
};
