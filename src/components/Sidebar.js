import { useState } from "react";
import Accordion from "./Accordion";

function Sidebar({
	nameList,
	onExit,
	isSidebarOpened,
	handleModalClick,
	handleModalExpand,
}) {
	const [expandedIndex, setExpandedIndex] = useState(-1);

	const handleClick = (index) => {
		if (index === expandedIndex) setExpandedIndex(-1);
		else setExpandedIndex(index);
	};

	return (
		<div>
			<div
				className={`sidebar-bg ${isSidebarOpened ? "active" : ""}`}
				onClick={onExit}
				style={{
					position: "fixed",
					backgroundColor: "black",
					opacity: "0.8",
					inset: "0",
				}}
			></div>
			<div className={`sidebar ${isSidebarOpened ? "active" : ""}`}>
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
