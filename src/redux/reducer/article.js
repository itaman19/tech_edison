import * as ActionTypes from "../ActionTypes";

export const article = (
	state = {
		email: "",
		title: "",
		description: "",
		imageurl: "",
		category: "",
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_ARTICLE:
			return {
				...state,
				email: action.payload.email,
				title: action.payload.title,
				description: action.payload.description,
				imageurl: action.payload.imageurl,
				category: action.payload.selectCategory,
			};

		default:
			return state;
	}
};
