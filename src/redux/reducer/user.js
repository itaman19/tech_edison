import * as ActionTypes from "../ActionTypes";

export const user = (
	state = {
		firstName: localStorage.getItem("firstName"),
		lastName: localStorage.getItem("lastName"),
		DOB: localStorage.getItem("DOB"),
		phone: localStorage.getItem("phone"),
		space: JSON.parse(localStorage.getItem("space")),
		sports: JSON.parse(localStorage.getItem("sports")),
		politics: JSON.parse(localStorage.getItem("politics")),
		prefereces: JSON.parse(localStorage.getItem("preferences")),
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.USER_CREDENTIALS:
			return {
				...state,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				DOB: action.payload.DOB,
				phone: action.payload.phone,
				prefereces: action.payload.prefereces,
				space: action.payload.space,
				sports: action.payload.sports,
				politics: action.payload.politics,
			};

		default:
			return state;
	}
};
