import Button from "./Button";

export default function Modal({ show, classes = "", label, children, footerComponents, saveHandler, closeHandler }) {

	return (
		<div className={`modal-background ${show ? "modal-open" : "modal-closed"}`} onClick={closeHandler}>

			<article className={`modal ${classes}`} onClick={e => e.stopPropagation()}>

				<header>
					{label ? <h2>{label}</h2> : ""}

					<button type="button" className="modal-close-button" onClick={closeHandler}>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</header>

				<main>{children}</main>

				<footer>
					{footerComponents ? footerComponents : (
						<>
							<Button
								buttonStyle="secondary"
								label="Abbrechen"
								clickHandler={closeHandler}
							/>
							<Button
								buttonStyle="primary"
								label="Ok"
								clickHandler={saveHandler}
							/>
						</>
					)}
				</footer>
			</article>
		</div>
	)
}