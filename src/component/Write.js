import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, storage } from "../fire";
import { editingArticleId, postArticle } from "../redux/actionCreators";
import Toast from "react-bootstrap/Toast";

export default function Write({ match }) {
	const [show, setShow] = useState(false);
	const [msg, setmsg] = useState("");
	var { title, description, imageurl, category } = useSelector(
		(state) => state.article
	);
	const [editingtitle, seteditingtitle] = useState(title);
	const [editingdescription, seteditingdescription] = useState(description);
	const [image, setimage] = useState();
	const [editingimageurl, seteditingimageurl] = useState(imageurl);
	const [errimage, seterrimage] = useState("");
	const [selectCategory, setselectCategory] = useState(
		category ? category : "sports"
	);

	const imageUpload = (files) => {
		seterrimage("");
		var file = files[0];

		setimage(file);
	};
	const uploadImage = (e) => {
		e.preventDefault();
		//console.log(image);
		if (!image) {
			seterrimage("please select an image");
			return;
		}
		setmsg("please wait uploading image");
		setShow(true);

		const uploadTask = storage.ref(`/images/${image.name}`).put(image);
		uploadTask.on(
			"state_changed",
			(snapShot) => {
				//takes a snap shot of the process as it is happening
				console.log(snapShot);
			},
			(err) => {
				//catches the errors
				setmsg(err);
				setShow(true);
			},
			() => {
				// gets the functions from storage refences the image storage in firebase by the children
				// gets the download url then sets the image from firebase as the value for the imgUrl key:
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then((fireBaseUrl) => {
						seteditingimageurl(fireBaseUrl);
					});
				setmsg("uploaded successfully");
				setShow(true);
			}
		);
	};
	const dispatch = useDispatch();

	useEffect(() => {
		const { email } = auth.currentUser;
		dispatch(
			postArticle(
				email,
				editingtitle,
				editingdescription,
				editingimageurl,
				selectCategory
			)
		);
		if (match.params.id) {
			dispatch(editingArticleId(match.params.id));
		}
		return () => {
			//
		};
	}, [editingtitle, editingdescription, editingimageurl, selectCategory]);
	return (
		<div className="container d-flex align-items-center justify-content-center flex -column mt-5">
			<form className="form col-12 col-md-8 d-flex align-items-center flex-column p-1">
				<div>
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
						<Toast.Body>{msg}</Toast.Body>
					</Toast>
				</div>
				<div className="form-group col-sm-12 col-12  ">
					<label for="title" className="row">
						<b>TITLE</b>
					</label>
					<input
						className="row col-12 col-sm-12 my-3 form-control"
						type="text"
						id="title"
						value={editingtitle}
						onChange={(e) => seteditingtitle(e.target.value)}
					/>
				</div>
				<div className="form-group col-12 col-sm-12 ">
					<label for="description" className="row">
						<b>DESCRIPTION</b>
					</label>
					<textarea
						className="row col-12 col-sm-12 form-control"
						type="text-area"
						id="description"
						value={editingdescription}
						onChange={(e) => seteditingdescription(e.target.value)}
						rows="10"
					/>
				</div>
				<div className="form-group col-12 col-sm-12 ">
					<label for="select" className="row">
						<b>Select the category type</b>
					</label>
					<select
						value={selectCategory}
						id="select"
						onChange={(e) => {
							setselectCategory(e.target.value);
						}}
					>
						<option value="sports">sports</option>
						<option value="space">space</option>
						<option value="politics">politics</option>
					</select>
				</div>

				<div class="form-group col-12 col-sm-12  ">
					<input
						className="row"
						type="file"
						onChange={(e) => imageUpload(e.target.files)}
						accept="image/x-png,image/gif,image/jpeg"
					/>
					<button className="my-2 row btn btn-primary" onClick={uploadImage}>
						Upload Image
					</button>
					<br></br>
					<p className="text-danger">{errimage}</p>
					<img
						src={editingimageurl || "https://via.placeholder.com/350"}
						className="img-fluid row rounded float-left"
						alt="Image"
					></img>
				</div>
			</form>
		</div>
	);
}
