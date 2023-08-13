import { useEffect } from "react";

function Modal({ children, handleModalClick }) {
	useEffect(() => {
		document.body.classList.add("overflow-hidden");

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, []);

	return (
		<div>
			<div className="modal">
				<div className="modal-content">{children}</div>
				<div className="modal-btn">
					<button onClick={handleModalClick}>Explore more APIs</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
