import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import axios from "axios";
import Modal from "./Modal";

function Accordion({ items, handleModalClick, handleModalExpand }) {
	const [expandedIndex, setExpandedIndex] = useState(-1);
	const [state, setState] = useState({
		expandedIndex: -1,
		apiDetails: "",
	});

	const handleExpand = () => {
		const data = state.apiDetails;
		handleModalExpand(data);
		handleModalClick();
	};

	const handleClick = (name, index) => {
		if (index === state.expandedIndex)
			setState((prevState) => {
				return {
					...prevState,
					expandedIndex: -1,
					apiDetails: "",
				};
			});
		else {
			axios.get(`https://api.apis.guru/v2/${name}.json`).then((res) => {
				const { apis } = res.data;
				console.log(Object.values(apis));
				const { info, swaggerUrl } = Object.values(apis)[0];
				// const {
				// 	title,
				// 	"x-logo": { url },
				// } = Object.values(apis)[0].info;
				const {
					title,
					"x-logo": { url },
				} = info;
				const data = { title, url };
				console.log(data, "data");
				setState((prevState) => {
					return {
						...prevState,
						expandedIndex: index,
						apiDetails: { info, swaggerUrl },
					};
				});
			});
		}
	};

	const renderedItems = items.map((name, index) => {
		const isExpanded = index === state.expandedIndex;
		const content = isExpanded && (
			<div className="accordion-div">
				<div className="image-container">
					<img
						src={state.apiDetails.info["x-logo"].url}
						className="accordion-img"
					/>
				</div>
				<p className="accordion-title">{state.apiDetails.info.title}</p>
			</div>
		);

		return (
			<div
				key={index}
				className="list-container"
				style={{
					"background-color": isExpanded
						? "rgb(34, 33, 33)"
						: "rgb(72, 96, 121)",
					width: isExpanded ? "100%" : "",
					padding: isExpanded ? "2%" : "",
					transform: isExpanded ? "translateX(-2%)" : "",
					"box-shadow": isExpanded ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "",
				}}
			>
				<div
					className="list-item"
					onClick={() => {
						handleClick(name, index);
					}}
				>
					<p>{name}</p>
					{isExpanded ? <GoChevronUp /> : <GoChevronDown />}
				</div>
				<div
					onClick={handleExpand}
					className="list-item-expand"
					style={{
						"background-color": isExpanded
							? "rgb(34, 33, 33)"
							: "rgb(72, 96, 121)",
					}}
				>
					{content}
				</div>
			</div>
		);
	});

	return renderedItems;
}

export default Accordion;
