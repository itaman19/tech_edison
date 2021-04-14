import React, { useState } from "react";
import firebase from "firebase/app";
import { auth, firestore } from "../fire";
import { Link } from "react-router-dom";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { userCredentials } from "../redux/actionCreators";

export default function Login(props) {
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [errEmail, seterrEmail] = useState("");
	const [errPassword, seterrPassword] = useState("");
	const [sent, setsent] = useState("");
	const dispatch = useDispatch();
	const handleLogin = (e) => {
		e.preventDefault();
		seterrEmail("");
		seterrPassword("");
		setsent("");

		auth
			.signInWithEmailAndPassword(email, password)
			.then((credentials) => {
				setsent("Login Successfull");
				console.log(credentials.user);
				firestore
					.collection("users")
					.doc(credentials.user.uid)
					.get()
					.then((doc) => {
						dispatch(userCredentials(doc.data()));
					})
					.then(() => {
						props.history.push("/home");
					});
			})
			.catch((err) => {
				switch (err.code) {
					case "auth/invalid-email":
					case "auth/user-disabled":
					case "auth/user-not-found":
						seterrEmail(err.message);
						break;
					case "auth/wrong-password":
						seterrPassword(err.message);
						break;
				}
			});
	};

	function sendPasswordReset(e) {
		e.preventDefault();
		setsent("");
		seterrEmail("");
		if (email) {
			// [START auth_send_password_reset]
			firebase
				.auth()
				.sendPasswordResetEmail(email)
				.then(() => {
					setsent("An email for password reset sent successfully ");
				})
				.catch((err) => {
					switch (err.code) {
						case "auth/invalid-email":
						case "auth/user-disabled":
						case "auth/user-not-found":
							seterrEmail(err.message);
							break;
					}
				});
			// [END auth_send_password_reset]
		} else {
			seterrEmail("Please enter email first");
			return;
		}
	}

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			props.history.push("/home");
		}
	});

	return (
		<div className="main d-flex justify-content-center align-items-center">
			<form className="login_box d-flex justify-content-center align-items-center flex-column col-10 col-md-6 col-lg-4 p-4">
				<p className="text-success">{sent}</p>
				<h3 className="mb-4">Log In</h3>
				<div className="input-group mb-3 d-flex align-items-center">
					<div className="input-group-prepend">
						<span className="fas fa-user mr-2"></span>
					</div>
					<input
						type="email"
						className="form-control"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setemail(e.target.value)}
					/>
					<p className="col-sm-12 text-danger">{errEmail}</p>
				</div>
				<div className="input-group mb-3 d-flex align-items-center">
					<div className="input-group-prepend">
						<span className="fas fa-lock mr-2" />
					</div>
					<input
						type="password"
						className="form-control"
						placeholder="password"
						value={password}
						onChange={(e) => setpassword(e.target.value)}
					/>
					<p className="col-sm-12 text-danger">{errPassword}</p>
				</div>

				<div className="form-group row d-flex justify-content-between">
					<Link
						className="mx-4 text-primary"
						onClick={(e) => sendPasswordReset(e)}
					>
						Forgot Password?
					</Link>
					<Link className="mx-4 text-primary" to="/signup">
						Not a member yet?
					</Link>
				</div>

				<button
					className="btn btn-primary my-2"
					onClick={(e) => handleLogin(e)}
					disabled={!email || !password}
				>
					Sign In
				</button>
			</form>
		</div>
	);
}
