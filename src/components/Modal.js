import { useEffect } from "react";

function Modal({ handleModalClick, data }) {
	useEffect(() => {
		document.body.classList.add("overflow-hidden");

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, []);

	return (
		<div>
			<div className="modal">
				<div className="modal-content">
					<div className="modal-inner-content">
						<div className="modal-header">
							<img src={data.info["x-logo"].url} className="modal-img" />
							<h1>{data.info.title}</h1>
						</div>
						<div className="modal-text">
							<div className="modal-each-text">
								<h5>Description</h5>
								<p>{data.info.description}</p>
							</div>
							<div className="modal-each-text">
								<h5>Swagger</h5>
								<p>{data.swaggerUrl}</p>
							</div>
							<div className="modal-each-text">
								<h5>Contact</h5>
								<div className="modal-contact">
									<p>Email</p>
									<p>{data.info.contact.email}</p>
								</div>
								<div className="modal-contact">
									<p>Name</p>
									<p>{data.info.contact.name}</p>
								</div>
								<div className="modal-contact">
									<p>Url</p>
									<p>{data.info.contact.url}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="modal-btn">
					<button onClick={handleModalClick}>Explore more APIs</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
