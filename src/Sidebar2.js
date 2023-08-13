import { useEffect, useState } from "react";
import axios from "axios";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import Accordion from "./Accordion";
import Modal from "./Modal";

function Sidebar({ nameList, onExit, handleModalClick, handleModalExpand }) {
	// const [nameList, setNameList] = useState([]);
	const [expandedIndex, setExpandedIndex] = useState(-1);

	const handleClick = (index) => {
		if (index === expandedIndex) setExpandedIndex(-1);
		else setExpandedIndex(index);
	};

	// useEffect(
	//     async () => {
	//  const result = await axios.get("https://api.apis.guru/v2/providers.json");
	//  const { data } = result.data;
	//  setNameList(data);
	// }, []);

	console.log(nameList);
	return (
		<div>
			<div
				onClick={onExit}
				style={{
					position: "fixed",
					"background-color": "black",
					opacity: "0.8",
					inset: "0",
				}}
			></div>
			<div className="sidebar">
				<h3>Select Provider</h3>
				<div>
					<Accordion
						items={nameList}
						handleModalClick={handleModalClick}
						handleModalExpand={handleModalExpand}
					/>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
