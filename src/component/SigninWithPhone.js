import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, firestore } from "../fire";
import firebase from "firebase/app";

export default function SigninWithPhone() {
	const [phone, setphone] = useState();
	const [err, seterr] = useState("");
	function handleLogin(e) {
		e.preventDefault();
		alert("hii");

		setphone("");
		seterr("");
	}

	const setUpRecaptcha = () => {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible",
				callback: function (response) {
					console.log("Captcha Resolved");
					onSignInSubmit();
				},
				defaultCountry: "IN",
			}
		);
	};

	const onSignInSubmit = (e) => {
		e.preventDefault();
		setUpRecaptcha();
		let phoneNumber = "+91" + phone;
		console.log(phoneNumber);
		let appVerifier = window.recaptchaVerifier;
		firebase
			.auth()
			.signInWithPhoneNumber(phoneNumber, appVerifier)
			.then(function (confirmationResult) {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
				// console.log(confirmationResult);
				console.log("OTP is sent");
				onSubmitOtp();
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const onSubmitOtp = () => {
		let otpInput = prompt("Enter the otp sent to youe mobile");
		console.log(otpInput);
		let optConfirm = window.confirmationResult;
		// console.log(codee);
		optConfirm
			.confirm(otpInput)
			.then(function (result) {
				// User signed in successfully.
				// console.log("Result" + result.verificationID);
				let user = result.user;
				console.log(user);
				return;
			})
			.then(() => {
				firestore
					.collection("users")
					.where("phone", "==", phone)
					.then((doc) => {
						console.log(doc.data().id);
					});
				window.location.reload();
			})
			.catch(function (error) {
				alert("Incorrect OTP");
			});
	};
	return (
		<div className="main d-flex justify-content-center align-items-center">
			<form className="login_box d-flex justify-content-center align-items-center flex-column col-10 col-md-6 col-lg-4 p-4">
				<div id="recaptcha-container"></div>
				<p className="text-danger">{err}</p>
				<h3 className="mb-4">Log In</h3>
				<div className="input-group mb-3 d-flex align-items-center">
					<div className="input-group-prepend">
						<span className="fas fa-phone-alt mr-2"></span>
					</div>
					<input
						type="number"
						className="form-control"
						placeholder="Enter your phone number"
						value={phone}
						onChange={(e) => setphone(e.target.value)}
					/>
					<p className="col-sm-12 text-danger">{err}</p>
				</div>

				<div className="form-group row d-flex justify-content-between">
					<Link className="mx-4 text-primary" to="/login">
						Login With email and password
					</Link>
				</div>
				<button
					id="sign-in-button"
					className="btn btn-primary my-2"
					onClick={(e) => onSignInSubmit(e)}
					disabled={!phone}
				>
					Sign In
				</button>
			</form>
		</div>
	);
}
