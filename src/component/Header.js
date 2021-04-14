import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth, firestore } from "../fire";
import firebase from "firebase/app";
import { Redirect } from "react-router-dom";
import { changebutton, postArticle, redirect } from "../redux/actionCreators";

import Toast from "react-bootstrap/Toast";
import ToastHeader from "react-bootstrap/ToastHeader";
import ToastBody from "react-bootstrap/ToastBody";

export default function Header({ user, history }) {
	const { firstName } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [err, seterr] = useState();

	const { buttonstate } = useSelector((state) => state.buttonstate);
	const { id } = useSelector((state) => state.id);

	var { title, description, imageurl, email, category } = useSelector(
		(state) => state.article
	);

	//const [buttonstate, dispatch(changebutton] = useSt)ate("Write");

	const [show, setShow] = useState(false);

	const toggleValue = () => {
		if (buttonstate === "Write") {
			dispatch(changebutton("Publish"));
			return;
		}
		if (buttonstate === "Publish") {
			if (!title || !description || title === " " || description === " ") {
				seterr("please fill out all the fields");
				setShow(true);
				dispatch(changebutton("Write"));
				return;
			}
			const articlesRef = firestore.collection("articles");
			articlesRef.add({
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				title,
				description,
				imageurl,
				email,
				category,
				liked: 0,
				disliked: 0,
				block: [],
			});
			seterr("published successfully");
			setShow(true);
			dispatch(changebutton("Write"));
			dispatch(postArticle("", "", "", ""));
			return;
		}
		if (buttonstate === "Edit") {
			if (!title || !description || title === " " || description === " ") {
				seterr("please fill out all the fields");
				setShow(true);
				dispatch(changebutton("Write"));
				return;
			}
			firestore.collection("articles").doc(id).update({
				title,
				description,
				category,
				imageurl,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			});
			alert("edited successfully");
			dispatch(postArticle("", "", "", ""));

			return;
		}
	};
	useEffect(() => {
		return () => {};
	}, [title, description]);

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light ">
				<Link
					className="navbar-brand"
					to="/home"
					onClick={() => dispatch(changebutton("Write"))}
				>
					<b className="text-primary">TECHEDISON</b> | Hello {`"${firstName}"`}
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse " id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link
								className="nav-link "
								to={`${
									buttonstate === "Write"
										? "/write"
										: buttonstate === "Edit"
										? "/home"
										: "/publish"
								}`}
								onClick={toggleValue}
							>
								<input
									class="btn btn-primary"
									type="button"
									value={buttonstate}
								></input>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link "
								to="/yourarticles"
								onClick={() => dispatch(changebutton("Write"))}
							>
								<button type="button" class="btn btn-outline-primary">
									<b>Your Articles</b>
								</button>
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link " to="/profile">
								<button
									type="button"
									class="btn btn-outline-primary"
									onClick={() => dispatch(changebutton("Write"))}
								>
									<b>Your Profile</b>
								</button>
							</Link>
						</li>

						<li className="nav-item">
							<Link className="nav-link " href="#">
								<button
									type="button"
									class="btn"
									onClick={() => {
										auth.signOut();
										localStorage.clear();
										window.location.href = "/login";
									}}
								>
									<b>Logout</b>
								</button>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
			<Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
				<Toast.Header>
					<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
					<strong className="mr-auto">Message</strong>
				</Toast.Header>
				<Toast.Body>{err}</Toast.Body>
			</Toast>
		</div>
	);
}
