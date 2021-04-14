import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { auth, firestore } from "../fire";
import MediaArticles from "./MediaArticles";

export default function YourArticles({ history }) {
	const { email } = auth.currentUser;

	const [articles1] = useCollectionData(
		firestore.collection("articles").where("email", "==", email),
		{ idField: "id" }
	);

	const [articles, setarticles] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);

	const articlesPerPage = 10;
	const pagesVisited = pageNumber * articlesPerPage;

	const displayarticles = articles.slice(
		pagesVisited,
		pagesVisited + articlesPerPage
	);

	const pageCount = Math.ceil(articles.length / articlesPerPage);

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};
	useEffect(() => {
		if (articles1) {
			setarticles(articles1);
		}
		return () => {
			//;
		};
	}, [articles1]);
	return (
		<div className="container">
			<div className="d-flex border-top border-bottom p-2 mt-2">
				<b>YOUR SUBMITED ARTICLE</b>
			</div>
			<MediaArticles
				articles={displayarticles}
				history={history}
			></MediaArticles>
			<div className="my-3">
				<ReactPaginate
					previousLabel={"Previous"}
					nextLabel={"Next"}
					pageCount={pageCount}
					onPageChange={changePage}
					containerClassName={"paginationBttns"}
					previousLinkClassName={"previousBttn"}
					nextLinkClassName={"nextBttn"}
					disabledClassName={"paginationDisabled"}
					activeClassName={"paginationActive"}
				/>
			</div>
		</div>
	);
}
