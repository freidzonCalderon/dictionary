import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/word.css";

const Word = ({ wordInfo }) => {
	return (
		<div>
			{wordInfo.title === "" ? (
				<div></div>
			) : (
				<div className="container border mt-5">
					<h2 className="title">{wordInfo.title}</h2>
					<p className="subtitle">
						{wordInfo.partOfSpeech ? wordInfo.partOfSpeech : "Not available"} ·{" "}
						{wordInfo.phonetic ? wordInfo.phonetic : "Not available"}
					</p>
					<p className="text">{wordInfo.meaning}</p>
					<p className="example">
						{wordInfo.examples
							? `"${wordInfo.examples}"`
							: "There is no example available"}
					</p>
				</div>
			)}
		</div>
	);
};

export default Word;
