import * as ActionTypes from "./ActionTypes";

export const postArticle = (
	email,
	title,
	description,
	imageurl,
	selectCategory
) => (dispatch) => {
	dispatch({
		type: ActionTypes.ADD_ARTICLE,
		payload: { email, title, description, imageurl, selectCategory },
	});
};

export const changebutton = (buttonstate) => (dispatch) => {
	dispatch({
		type: ActionTypes.CHANGE_BUTTON,
		payload: buttonstate,
	});
};

export const editingArticleId = (id) => (dispatch) => {
	dispatch({
		type: ActionTypes.ADD_ID,
		payload: id,
	});
};
export const userCredentials = (user) => (dispatch) => {
	let prefereces = [];
	localStorage.setItem("firstName", user.firstName);
	localStorage.setItem("lastName", user.lastName);
	localStorage.setItem("phone", user.phone);
	localStorage.setItem("DOB", user.DOB);
	localStorage.setItem("sports", user.sports);
	localStorage.setItem("space", user.space);
	localStorage.setItem("politics", user.politics);
	if (user.politics) {
		prefereces.push("politics");
	}
	if (user.space) {
		prefereces.push("space");
	}
	if (user.sports) {
		prefereces.push("sports");
	}
	localStorage.setItem("preferences", JSON.stringify(prefereces));
	console.log(prefereces);
	user.prefereces = prefereces;
	dispatch({
		type: ActionTypes.USER_CREDENTIALS,
		payload: user,
	});
};
