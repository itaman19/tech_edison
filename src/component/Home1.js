import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../fire";
import { changebutton } from "../redux/actionCreators";

import Articles from "./Articles";
import TopArticles from "./TopArticles";

export default function Home1() {
	const { prefereces } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	var articlesRef = firestore.collection("articles");
	var query = articlesRef.where(
		"category",
		"in",
		prefereces ? prefereces : [""]
	);

	var [articles1] = useCollectionData(query, { idField: "id" });

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
		dispatch(changebutton("Write"));
		if (articles1) {
			setarticles(articles1.reverse());
		}
		return () => {
			//;
		};
	}, [articles1]);
	return (
		<div className="container">
			<div className="row d-flex justify-content-between mt-4">
				<div className="col-12 col-md-8  my-2 ">
					<div className="scroll">
						<Articles articles={displayarticles}></Articles>
					</div>
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

				<div className="col-12 col-md-4 my-2">
					<div className="border-top border-bottom p-2">TOP ARTICLES</div>
					<div>
						<TopArticles></TopArticles>{" "}
					</div>
				</div>
			</div>
		</div>
	);
}
