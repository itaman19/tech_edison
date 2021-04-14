import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, firestore } from "../fire";
import Toast from "react-bootstrap/Toast";
import { useDispatch } from "react-redux";
import { changebutton, postArticle } from "../redux/actionCreators";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function TopArticles() {
	const [articles] = useCollectionData(
		firestore.collection("articles").orderBy("liked", "desc").limit(3),
		{ idField: "id" }
	);

	var renderArticlesList;
	if (articles) {
		renderArticlesList = articles.map((article) => {
			if (article.block.find((x) => x === auth.currentUser.email)) {
				return <div></div>;
			} else {
				return (
					<div className="my-4 image_border shadow" key={article.id}>
						<div className="media row p-1 ">
							<i className="col-12 text-secondary mb-1">
								<span className=" fas fa-info-circle mr-1"></span> by{" "}
								<b> {article.email}</b>
							</i>
							<div className="media-body col-12 d-sm-flex justify-content-start flex-row">
								<div>
									<h5 className="mt-0">{article.title}</h5>
									<Link className="btn" to={`articles/${article.id}`}>
										<span className="text-primary">Read More .</span>
									</Link>
								</div>
							</div>
							<img
								className="align-self-center mr-3 col-sm-12 col-md-3 img-fluid "
								src={article.imageurl || "https:via.placeholder.com/100"}
								alt="Generic placeholder image"
							/>
						</div>
					</div>
				);
			}
		});
	}

	useEffect(() => {
		return () => {
			//
		};
	}, []);
	return (
		<div className="mt-1">
			{articles
				? articles.length === 0
					? "Nothing to display"
					: renderArticlesList
				: ""}
		</div>
	);
}
