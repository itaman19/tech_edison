import React, { useEffect, useState } from "react";
import { auth, firestore } from "../fire";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

export default function Article({ history, match }) {
	const [article, setarticle] = useState({});
	var number = 0;
	firestore
		.collection("articles")
		.doc(match.params.id)
		.get()
		.then((data) => {
			setarticle(data.data());
		});
	const incrementLiked = (liked) => {
		firestore
			.collection("articles")
			.doc(match.params.id)
			.update({
				liked: liked + 1,
			});
	};
	const incrementdisLiked = (disliked) => {
		firestore
			.collection("articles")
			.doc(match.params.id)
			.update({
				disliked: disliked + 1,
			});
	};
	const blockArticle = (block) => {
		firestore
			.collection("articles")
			.doc(match.params.id)
			.update({
				block: [...block, auth.currentUser.email],
			});
		alert("you have blocked this article");
		history.push("/home");
	};

	return (
		<div className="container my-3">
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
						<li class="breadcrumb-item">
							<Link to="/home">Home</Link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							article
						</li>
					</ol>
				</nav>
			</div>
			<div className="d-flex justify-content-center image_border">
				<img
					src={article.imageurl || "https://via.placeholder.com/350"}
					className="article_img img-fluid"
				></img>
			</div>
			<br></br>
			<div className="border-bottom d-md-flex justify-content-between ">
				<h4 className="mb-4">{article.title}</h4>
			</div>
			<div className="my-2 border-bottom d-md-flex justify-content-between">
				<div>
					<h4 className="d-flex align-items-center mb-0">
						<button
							className="btn tbn-outline btn-lg"
							onClick={() => incrementLiked(article.liked)}
						>
							<span className="fas fa-heart"></span>
						</button>
						{article.liked}
					</h4>
					<i>like this article to make it popular</i>
				</div>
				<div>
					<h4 className="d-flex align-items-center mb-0">
						<button
							className="btn tbn-outline btn-lg"
							onClick={() => incrementdisLiked(article.disliked)}
						>
							<span className="fas fa-thumbs-down"></span>
						</button>
						{article.disliked}
					</h4>
				</div>
				<div>
					<h4 className="d-flex align-items-center mb-0">
						<button
							className="btn tbn-outline btn-lg"
							onClick={() => blockArticle(article.block)}
						>
							<span className="fas fa-ban"></span>
						</button>
					</h4>
					<i>block this article</i>
				</div>
			</div>
			<div className="p-2">{article.description}</div>
			<div className="mt-4 d-flex justify-content-center  text-secondary">
				<i>
					<span className="fas fa-portrait mr-1"></span> by{" "}
					<b> {article.email}</b>
				</i>
			</div>
		</div>
	);
}
