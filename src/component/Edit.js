import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changebutton } from "../redux/actionCreators";
export default function Edit() {
	const dispatch = useDispatch();
	return (
		<div className="container d-flex justify-content-center align-items-center flex-column mt-5">
			<Link to="/home" onClick={() => dispatch(changebutton("Write"))}>
				Go back to home page
			</Link>
			<Link to="/yourarticles" onClick={() => dispatch(changebutton("Write"))}>
				Go back to Your Articles page
			</Link>
		</div>
	);
}
