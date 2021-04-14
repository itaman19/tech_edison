import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { auth, firestore } from "../fire";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";

export default function Articles({ articles }) {
	const dummy = useRef();
	const scrollToBottom = () => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(scrollToBottom, [articles]);
	const RederArticle = (article) => {
		const {
			id,
			description,
			email,
			title,
			imageurl,
			createdAt,
			block,
		} = article;
		if (block.find((x) => x === auth.currentUser.email)) {
			return <div></div>;
		} else {
			return (
				<div key={id} className="my-4 image_border shadow container ">
					<div className="d-flex justify-content-center">
						<img
							src={article.imageurl || "https://via.placeholder.com/350"}
							className="img-fluid"
						></img>
					</div>
					<br></br>
					<div className="mb-3  text-secondary ">
						<i>
							<span className="fas fa-info-circle mr-1"></span> by{" "}
							<b> {email}</b>
						</i>
					</div>
					<div className="d-md-flex justify-content-between">
						<h4>{article.title}</h4>
					</div>
					<div className="p-2 ">
						{description.slice(0, 265)} .......................
					</div>
					<div className="d-flex justify-content-end">
						<Link className="btn" to={`articles/${id}`}>
							<span className="text-primary">Read More .</span>
						</Link>
					</div>
				</div>
			);
		}
	};
	var articlesList;
	if (articles) {
		articlesList = articles.map((article) => {
			return <div className="">{RederArticle(article)}</div>;
		});
	}
	return (
		<div>
			<h1 ref={dummy}></h1>
			{articles.length === 0 ? (
				<h3>Noting to view ! No one has posted any assignments yet!</h3>
			) : (
				articlesList
			)}
		</div>
	);
}
