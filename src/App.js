import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./components/Modal";

function App() {
	const [isSidebarOpened, setIsSidebarOpened] = useState(false);
	const [nameList, setNameList] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState("");

	const handleModalClick = () => {
		setShowModal(!showModal);
	};

	const handleModalExpand = (obj) => {
		setModalContent(obj);
	};

	// pull api names and cache data into nameList state once page loads

	useEffect(() => {
		const getApiData = async () => {
			const result = await axios.get("https://api.apis.guru/v2/providers.json");
			const { data } = result.data;
			setNameList(data);
		};
		getApiData();
	}, []);

	const handleClick = () => {
		setIsSidebarOpened(!isSidebarOpened);
	};

	const onExit = () => {
		setIsSidebarOpened(false);
	};

	if (!isSidebarOpened) {
		document.querySelector("body").classList.add("hide-overflow");
	} else {
		document.querySelector("body").classList.remove("hide-overflow");
	}

	return (
		<div>
			<div className="container">
				{showModal ? (
					<Modal
						handleModalClick={handleModalClick}
						data={modalContent}
					></Modal>
				) : (
					""
				)}
				<button className="explore-button" onClick={handleClick}>
					Explore web APIs
				</button>
			</div>
			<Sidebar
				isSidebarOpened={isSidebarOpened}
				nameList={nameList}
				onExit={onExit}
				handleModalClick={handleModalClick}
				handleModalExpand={handleModalExpand}
			/>
		</div>
	);
}

export default App;
