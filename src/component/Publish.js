import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changebutton } from "../redux/actionCreators";
export default function Publish() {
	const dispatch = useDispatch();
	useEffect(() => {
		changebutton("Write");
		return () => {
			//
		};
	}, []);
	return (
		<div className="container d-flex justify-content-center align-items-center mt-5">
			<Link to="/home">Go back to home page</Link>
		</div>
	);
}
