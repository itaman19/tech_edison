import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { article } from "./reducer/article";
import { buttonstate } from "./reducer/button";
import { id } from "./reducer/id";
import ReduxThunk from "redux-thunk";
import { logger } from "redux-logger";
import { user } from "./reducer/user";
const initialState = {};
const reducer = combineReducers({
	article,
	buttonstate,
	id,
	user,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const ConfigureStore = () => {
	const store = createStore(
		reducer,
		initialState,
		composeEnhancers(applyMiddleware(ReduxThunk, logger))
	);

	return store;
};
