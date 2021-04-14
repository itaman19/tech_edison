import React, { useState } from "react";
import firebase from "firebase/app";
import { auth, firestore } from "../fire";
import Toast from "react-bootstrap/Toast";
import { Link } from "react-router-dom";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { userCredentials } from "../redux/actionCreators";

export default function Signup(props) {
	// Collect details like first name, last name, phone, email, DOB, password, confirm password, article preferences.
	const [firstName, setfirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const [email, setemail] = useState("");
	const [phone, setphone] = useState("");
	const [date, setdate] = useState("");
	const [password, setpassword] = useState("");
	const [confirmpassword, setconfirmpassword] = useState("");
	const [errEmail, seterrEmail] = useState("");
	const [errPassword, seterrPassword] = useState("");
	const [show, setShow] = useState(false);
	const [err, seterr] = useState("");
	const [sports, setsports] = useState(false);
	const [politics, setpolitics] = useState(false);
	const [space, setspace] = useState(false);
	const dispatch = useDispatch();
	const handleSignup = (e) => {
		e.preventDefault();
		seterrEmail("");
		seterrPassword("");
		let phoneCheck = /^[6-9][0-9]{9}$/gm;
		if (!phoneCheck.test(phone)) {
			seterr(
				"Enter a valid phone number! if you are entering +91 no need to enter +91"
			);
			setShow(1);
			return;
		}
		if (password !== confirmpassword) {
			seterr("Reentered password dosen't match");
			setShow(1);
			return;
		}
		if (date === "") {
			seterr("Please enter your date of birth");
			setShow(1);
			return;
		}
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((cred) => {
				firestore
					.collection("users")
					.doc(cred.user.uid)
					.set({
						firstName,
						lastName,
						DOB: date,
						phone,
						sports,
						space,
						politics,
						createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					})
					.then(() => {
						firestore
							.collection("users")
							.doc(cred.user.uid)
							.get()
							.then((doc) => {
								dispatch(userCredentials(doc.data()));
							});
					});
			})
			.then(() => {
				alert("signup successfull login with your mail and password!");
				window.location.reload();
			})
			.catch((err) => {
				switch (err.code) {
					case "auth/invalid-email":
					case "auth/user-already-in-use":
						seterrEmail(err.message);
						break;
					case "auth/weak-password":
						seterrPassword(err.message);
						break;
				}
			});
	};

	return (
		<div className="signup d-flex justify-content-center align-items-center">
			<form className="containerl login_box d-flex justify-content-center align-items-center flex-column col-10 col-md-6 col-lg-4 p-4 ">
				<h3 className="mb-4">Sign Up</h3>
				<div className="col">
					<Toast
						onClose={() => setShow(false)}
						show={show}
						delay={3000}
						autohide
					>
						<Toast.Header>
							<img
								src="holder.js/20x20?text=%20"
								className="rounded mr-2"
								alt=""
							/>
							<strong className="mr-auto">Message</strong>
						</Toast.Header>
						<Toast.Body>{err}</Toast.Body>
					</Toast>
				</div>
				<p className="text-danger">
					**You have to fill all fields then only you can press signup button
				</p>

				<div className="input-group mb-3 d-flex align-items-center">
					<div className="input-group-prepend">
						<span className="fas fa-user mr-2"></span>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="Enter first name"
						value={firstName}
						onChange={(e) => setfirstName(e.target.value)}
						required
					/>
					<p className="col-sm-12 text-danger">{errEmail}</p>
				</div>
				<div className="input-group mb-3 d-flex align-items-center">
					<div className="input-group-prepend">
						<span className="fas fa-user mr-2"></span>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="Enter last name"
						value={lastName}
						onChange={(e) => setlastName(e.target.value)}
						required
					/>
					<p className="col-sm-12 text-danger">{errEmail}</p>
				</div>
				<div className="input-group mb-3 d-flex align-items-center">
					<div className="input-group-prepend">
						<span className="fas fa-at mr-2"></span>
					</div>
					<input
						type="email"
						className="form-control"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setemail(e.target.value)}
						required
					/>
					<p className="col-sm-12 text-danger">{errEmail}</p>
				</div>
				<div className="input-group mb-3 d-flex align-items-center">
					<div className="input-group-prepend">
						<span className="fas fa-phone-alt mr-2"></span>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="Enter your phone no"
						value={phone}
						onChange={(e) => setphone(e.target.value)}
						required
					/>
					<p className="col-sm-12 text-danger">{errEmail}</p>
				</div>
				<div className="input-group d-flex align-items-center">
					<small>select your date of birth</small>
				</div>
				<div className="input-group mb-3 d-flex align-items-center">
					<div className="input-group-prepend">
						<span className="fas fa-calendar mr-2"></span>
					</div>
					<input
						type="date"
						className="form-control"
						placeholder="Enter your date of birth"
						value={date}
						onChange={(e) => setdate(e.target.value)}
						required
					/>
					<br></br>
					<p className="col-sm-12 text-danger">{errEmail}</p>
				</div>

				<div className="input-group mb-3 d-flex align-items-center">
					{
						//sports, politics, space
					}
					<div class="checkbox mr-2">
						<label>
							<input
								type="checkbox"
								value={sports}
								onChange={() => setsports(!sports)}
							/>
							Sports
						</label>
					</div>
					<div class="checkbox mr-2">
						<label>
							<input
								type="checkbox"
								value={politics}
								onChange={() => setpolitics(!politics)}
							/>
							Poilitics
						</label>
					</div>
					<div class="checkbox mr-2">
						<label>
							<input
								type="checkbox"
								value={space}
								onChange={() => setspace(!space)}
							/>
							Space
						</label>
					</div>
					<p>Select preferences based on which articles are displayed </p>
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
						required
					/>
					<p className="col-sm-12 text-danger">{errPassword}</p>
				</div>
				<div className="input-group mb-3 d-flex align-items-center">
					<div className="input-group-prepend">
						<span className="fas fa-lock mr-2" />
					</div>
					<input
						type="password"
						className="form-control"
						placeholder="re-enter password"
						value={confirmpassword}
						onChange={(e) => setconfirmpassword(e.target.value)}
						required
					/>
					<p className="col-sm-12 text-danger">{errPassword}</p>
				</div>
				<div className="form-group row d-flex justify-content-between">
					<Link
						className="mx-4 text-primary"
						to="/login"
						onClick={() => auth.signOut()}
					>
						Already have an account? Login
					</Link>
				</div>
				<button
					className="btn btn-primary"
					onClick={(e) => handleSignup(e)}
					disabled={
						!phone ||
						!email ||
						!firstName ||
						!lastName ||
						!password ||
						!confirmpassword
					}
				>
					Sign Up
				</button>
			</form>
		</div>
	);
}
