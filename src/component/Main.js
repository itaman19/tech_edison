import React, { useEffect, useState } from "react";
import { auth, firestore } from "../fire";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./Header";
import Write from "./Write";
import { Route, Redirect } from "react-router-dom";
import Home1 from "./Home1";
import Publish from "./Publish";
import Article from "./Article";
import YourArticles from "./YourArticles";
import Edit from "./Edit";
import SigninWithPhone from "./SigninWithPhone";
import { useDispatch } from "react-redux";
import { userCredentials } from "../redux/actionCreators";
import Profile from "./Profile";

export default function Main(props) {
	const [user] = useAuthState(auth);

	const [email, setemail] = useState();
	const dispatch = useDispatch();

	return (
		<div>
			{user ? (
				<div>
					<Header user={email}></Header>
					<Route exact path="/home" component={Home1}></Route>
					<Route exact path="/articles/:id" component={Article}></Route>
					<Route exact path="/yourarticles" component={YourArticles}></Route>
					<Route exact path="/write/edit" component={Edit}></Route>
					<Route exact path="/write/:id?" component={Write}></Route>
					<Route exact path="/profile" component={Profile}></Route>
					<Route exact path="/publish" component={Publish}></Route>
				</div>
			) : (
				<Redirect to="/login"></Redirect>
			)}
		</div>
	);
}
