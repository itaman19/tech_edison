import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Media } from "reactstrap";
import firebase from "firebase/app";
import Toast from "react-bootstrap/Toast";

import { auth, firestore } from "../fire";
import { userCredentials } from "../redux/actionCreators";

export default function Profile() {
	const dispatch = useDispatch();
	const {
		firstName,
		lastName,
		DOB,
		phone,
		space,
		sports,
		politics,
	} = useSelector((state) => state.user);
	const [editedFirstName, seteditedFirstName] = useState("");
	const [editedLastName, seteditedLastName] = useState("");
	const [editedDOB, seteditedDOB] = useState("");
	const [editedPhone, seteditedPhone] = useState("");
	const [editedSpace, seteditedSpace] = useState("");
	const [editedSports, seteditedSports] = useState("");
	const [editedPolitics, seteditedPolitics] = useState("");
	const [err, seterr] = useState("");
	const [show, setShow] = useState(false);
	const handleUpdate = (e) => {
		e.preventDefault();
		seterr("");
		firestore
			.collection("users")
			.doc(auth.currentUser.uid)
			.update({
				firstName: editedFirstName,
				lastName: editedLastName,
				DOB: editedDOB,
				phone: editedPhone,
				space: editedSpace,
				sports: editedSports,
				politics: editedPolitics,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.then(() => {
				firestore
					.collection("users")
					.doc(auth.currentUser.uid)
					.get()
					.then((doc) => {
						dispatch(userCredentials(doc.data()));
					});
			});

		seterr("Updated Successfully");
		setShow(true);
	};
	function sendPasswordReset(e) {
		e.preventDefault();
		if (auth.currentUser.email) {
			// [START auth_send_password_reset]
			firebase
				.auth()
				.sendPasswordResetEmail(auth.currentUser.email)
				.then(() => {
					seterr("An email for password reset sent successfully ");
					setShow(true);
				})
				.catch((err) => {
					switch (err.code) {
						case "auth/invalid-email":
						case "auth/user-disabled":
						case "auth/user-not-found":
							seterr(err.message);
							setShow(true);
							break;
					}
				});
			// [END auth_send_password_reset]
		} else {
			seterr("Please enter email first");
			setShow(true);
			return;
		}
	}

	useEffect(() => {
		if (firstName) {
			seteditedFirstName(firstName);
		}
		if (lastName) {
			seteditedLastName(lastName);
		}
		if (DOB) {
			seteditedDOB(DOB);
		}
		if (phone) {
			seteditedPhone(phone);
		}
		seteditedSpace(space);
		seteditedSports(sports);
		seteditedPolitics(politics);
		return () => {};
	}, []);
	return (
		<div className="container">
			<div className=" separation row d-flex justify-content-center mt-4 heading flex-row ">
				<h2>My profile</h2>
			</div>

			<div className=" d-flex align-items-center justify-content-center flex -column mt-5">
				<form className="form col-12 col-md-8 d-flex align-items-center flex-column p-1">
					<div className="form-group col-sm-12 col-12  ">
						<label for="title" className="row">
							<b>First Name</b>
						</label>
						<input
							id="title"
							type="text"
							value={editedFirstName}
							className="form-control row col-12 col-sm-12 my-3"
							onChange={(e) => seteditedFirstName(e.target.value)}
						></input>
					</div>
					<div className="form-group col-sm-12 col-12  ">
						<label for="title" className="row">
							<b>Last Name</b>
						</label>
						<input
							id="lastname"
							type="text"
							value={editedLastName}
							className="form-control row col-12 col-sm-12 my-3"
							onChange={(e) => seteditedLastName(e.target.value)}
						></input>
					</div>
					<div className="form-group col-sm-12 col-12  ">
						<label for="email" className="row">
							<b>Mail</b>
						</label>
						<input
							id="email"
							type="text"
							value={auth.currentUser.email}
							className="form-control row col-12 col-sm-12 my-3"
						></input>
					</div>
					<div className="form-group col-sm-12 col-12  ">
						<label for="phone" className="row">
							<b>Phone Number</b>
						</label>
						<input
							id="phone"
							type="text"
							value={editedPhone}
							className="form-control row col-12 col-sm-12 my-3"
							onChange={(e) => seteditedPhone(e.target.value)}
						></input>
					</div>
					<div className="form-group col-sm-12 col-12  ">
						<label for="phone" className="row">
							<b>Date of birth :</b>
						</label>
						<input
							id="date"
							type="date"
							value={editedDOB}
							className="form-control row col-12 col-sm-12 my-3"
							onChange={(e) => seteditedDOB(e.target.value)}
						></input>
					</div>
					<div className="form-group col-sm-12 col-12">
						{
							//sports, politics, space
						}
						<b>Select preferences based on which articles are displayed </b>
						<div class="checkbox mr-2">
							<label>
								<input
									type="checkbox"
									value={editedSports}
									onChange={() => seteditedSports(!editedSports)}
									checked={editedSports ? true : false}
								/>
								Sports
							</label>
						</div>
						<div class="checkbox mr-2">
							<label>
								<input
									type="checkbox"
									value={editedPolitics}
									onChange={() => seteditedPolitics(!editedPolitics)}
									checked={editedPolitics ? true : false}
								/>
								Poilitics
							</label>
						</div>
						<div class="checkbox mr-2">
							<label>
								<input
									type="checkbox"
									value={editedSpace}
									onChange={() => seteditedSpace(!editedSpace)}
									checked={editedSpace ? true : false}
								/>
								Space
							</label>
						</div>
					</div>
					<div className="form-group col-sm-12 col-12">
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
					<button className="btn btn-primary mb-3" onClick={handleUpdate}>
						Update your profile
					</button>

					<button
						className="btn btn-danger mb-3"
						onClick={(e) => sendPasswordReset(e)}
					>
						{" "}
						Change Password
					</button>
				</form>
			</div>
		</div>
	);
}
