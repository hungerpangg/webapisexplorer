import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

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

	useEffect(async () => {
		const result = await axios.get("https://api.apis.guru/v2/providers.json");
		const { data } = result.data;
		setNameList(data);
	}, []);

	const handleClick = () => {
		setIsSidebarOpened(!isSidebarOpened);
	};

	const onExit = () => {
		setIsSidebarOpened(false);
	};

	console.log(isSidebarOpened, "isSidebaropened");

	if (!isSidebarOpened) {
		document.querySelector("body").classList.add("hide-overflow");
	} else {
		document.querySelector("body").classList.remove("hide-overflow");
	}

	return (
		<div>
			<div className="container">
				{showModal ? (
					<Modal handleModalClick={handleModalClick}>
						<div className="modal-inner-content">
							<div className="modal-header">
								<img
									src={modalContent.info["x-logo"].url}
									className="modal-img"
								/>
								<h1>{modalContent.info.title}</h1>
							</div>
							<div className="modal-text">
								<div className="modal-each-text">
									<h5>Description</h5>
									<p>{modalContent.info.description}</p>
								</div>
								<div className="modal-each-text">
									<h5>Swagger</h5>
									<p>{modalContent.swaggerUrl}</p>
								</div>
								<div className="modal-each-text">
									<h5>Contact</h5>
									<div className="modal-contact">
										<p>Email</p>
										<p>{modalContent.info.contact.email}</p>
									</div>
									<div className="modal-contact">
										<p>Name</p>
										<p>{modalContent.info.contact.name}</p>
									</div>
									<div className="modal-contact">
										<p>Url</p>
										<p>{modalContent.info.contact.url}</p>
									</div>
								</div>
							</div>
						</div>
					</Modal>
				) : (
					""
				)}
				<button class="explore-button" onClick={handleClick}>
					Explore web APIs
				</button>
			</div>
			{/* {isSidebarOpened ? (
				<Sidebar
					nameList={nameList}
					onExit={onExit}
					handleModalClick={handleModalClick}
					handleModalExpand={handleModalExpand}
				/>
			) : (
				""
			)} */}
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
