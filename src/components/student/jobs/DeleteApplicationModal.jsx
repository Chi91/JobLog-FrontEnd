import { deleteApplication } from "../../../redux/student/studentActions"
import { useSelector } from "react-redux"
import { useState } from "react"

export default function DeleteApplicationModal({ show, handleClose, application }) {

	const accessToken = useSelector(state => state.authentication.accessToken)

	const [error, setError] = useState(null)

	const handleApplicationDelete = () => {

		deleteApplication(accessToken, application, err => {
			if (err) {
				setError(err)
			} else {
				handleClose()
			}
		})
	}

	return (
		<div className={`modal-background ${show ? "modal-open" : "modal-closed"}`} onClick={handleClose}>

			<div className="modal-container" onClick={e => e.stopPropagation()}>

				<button className="modal-close-button" onClick={handleClose}>
					<i className="fa-solid fa-xmark"></i>
				</button>

				<div className="modal-main">

					<h2 className="modal-heading">Bewerbung zurückziehen</h2>

					<div className="student-application-delete-modal-body">
						Willst du diese Bewerbung wirklich zurückziehen?

						<button className="button-secondary" onClick={handleClose}>Abbrechen</button>
						<button className="button-primary" onClick={handleApplicationDelete}>Löschen</button>
					</div>
					{error ? <p className="error-message">{error}</p> : ""}
				</div>
			</div>
		</div>
	)
}