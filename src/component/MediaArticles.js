import React, { useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../fire";
import Toast from "react-bootstrap/Toast";
import { useDispatch } from "react-redux";
import { changebutton, postArticle } from "../redux/actionCreators";

export default function MediaArticles({ articles, history }) {
	const [show, setShow] = useState(false);
	const [msg, setmsg] = useState("initialState");
	const dispatch = useDispatch();
	function handleEdit(id) {
		firestore
			.collection("articles")
			.doc(id)
			.get()
			.then((data) => {
				const { email, title, description, imageurl, category } = data.data();
				dispatch(postArticle(email, title, description, imageurl, category));
				dispatch(changebutton("Edit"));
				history.push("/write/" + id);
			});
	}
	function handleDelete(id) {
		firestore
			.collection("articles")
			.doc(id)
			.delete()
			.then(() => {
				setmsg("Document successfully deleted!");
				setShow(true);
			})
			.catch((error) => {
				setmsg("Error removing document: ", error);
				setShow(true);
			});
	}
	var renderArticlesList;
	if (articles) {
		renderArticlesList = articles.map((article) => {
			return (
				<div className="my-4 image_border shadow" key={article.id}>
					<div className="media row p-1 ">
						<div className="media-body col-12 d-sm-flex justify-content-start flex-row">
							<div>
								<h5 className="mt-0">{article.title}</h5>
								<p>
									{article.description.slice(0, 200)}...........................
								</p>
								<Link className="btn" to={`articles/${article.id}`}>
									<span className="text-primary">Read More .</span>
								</Link>
							</div>
						</div>
						<img
							className=" align-self-center mr-3 col-sm-12 col-md-3 img-fluid"
							src={article.imageurl || "https:via.placeholder.com/100"}
							alt="Generic placeholder image"
						/>
					</div>
					<div className="d-flex justify-content-between">
						<p>
							<span className="fas fa-thumbs-up mr-1"></span>
							{article.liked}
						</p>
						<p>
							<span className="fas fa-thumbs-down mr-1"></span>
							{article.disliked}
						</p>
						<p>
							<span className="fas fa-ban mr-1"></span> {article.block.length}
						</p>
					</div>
					<div>
						<button
							className="btn btn-outline-success mx-2 my-2"
							onClick={() => handleEdit(article.id)}
						>
							<span class="fas fa-edit"></span>
						</button>
						<button
							className="btn btn-outline-danger mx-2 my-2"
							onClick={() => handleDelete(article.id)}
						>
							<span class="fas fa-trash"></span>
						</button>
					</div>
				</div>
			);
		});
	}

	return (
		<div className="container mt-2 scroll_yourarticles">
			<Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
				<Toast.Header>
					<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
					<strong className="mr-auto">Message</strong>
				</Toast.Header>
				<Toast.Body>{msg}</Toast.Body>
			</Toast>
			{articles ? (
				articles.length === 0 ? (
					<h3>You have not published any articles yet!</h3>
				) : (
					renderArticlesList
				)
			) : (
				""
			)}
		</div>
	);
}
