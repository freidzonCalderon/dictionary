import "bootstrap/dist/css/bootstrap.min.css";
import "./css/dictionaryForm.css";

import { SlMagnifier } from "react-icons/sl";
import axios from "axios";

import React, { useState } from "react";
import Word from "./Word";

const DictionaryForm = () => {
	const [word, setWord] = useState("");
	const [wordInfo, setWordInfo] = useState({
		title: "",
		partOfSpeech: "",
		phonetic: "",
		meaning: "",
		examples: "",
	});
	const [error, setError] = useState(false);

	const getWord = (word) => {
		axios
			.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
			.then((res) => {
				setWordInfo({
					...wordInfo,
					title: res.data[0].word,
					partOfSpeech: res.data[0].meanings[0].partOfSpeech,
					phonetic: res.data[0].phonetic,
					meaning: res.data[0].meanings[0].definitions[0].definition,
					examples: res.data[0].meanings[0].definitions[0].example,
				});
				setError(false);
			})
			.catch((err) => {
				setError(true);
				console.log("WORD DOES NOT EXIST", err);
			});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		getWord(word);

		setWord("");
	};
	return (
		<div>
			<div className="container text-center mt-5">
				<h1 className="title">English Dictionary</h1>

				<form onSubmit={submitHandler}>
					<input
						className="mt-3 inputText"
						type="text"
						name="text"
						id="text"
						placeholder="Type a word... "
						onChange={(e) => {
							setWord(e.target.value);
						}}
						value={word}
					/>
					<button type="submit">
						<SlMagnifier />
					</button>
				</form>
			</div>

			{!error ? (
				<Word wordInfo={wordInfo} />
			) : (
				<div className="container text-center mt-5">
					<h2>Word does not exist</h2>
				</div>
			)}
		</div>
	);
};

export default DictionaryForm;
