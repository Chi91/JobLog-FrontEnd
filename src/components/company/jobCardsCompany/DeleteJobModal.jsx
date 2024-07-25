import { useSelector } from "react-redux"
import Loading from "../../Loading"

export default function DeleteJobModal({ show, handleClose, handleDelete, jobID, jobTitle }) {

	let pending = useSelector(state => state.job.deletePending)
	let error = useSelector(state => state.job.error)

	return (
		<div className={`modal-company-background ${show ? "modal-open" : "modal-closed"} delete-job-modal`} onClick={handleClose}>
			<div id="modal-container-company" onClick={e => e.stopPropagation()}>

				<button id="modal-close-button" onClick={handleClose}>
					<i className="fa-solid fa-xmark"></i>
				</button>

				<div id="modal-main-company">
					<div id="flexHelper">
						<p id="text">
							Willst du den Job <b>{jobID}</b> - <b>{jobTitle}</b> wirklich löschen?
						</p>
						<button className="button-primary" type="submit" onClick={() => handleDelete(jobID)}>
							{pending ? <Loading /> : 'Löschen'}
						</button>
						<button className="button-secondary" type="reset" id="cancel-button" onClick={handleClose}>
							Abbrechen
						</button>

						{error ? <p className="error-message">{error}</p> : ''}
					</div>
				</div>
			</div>
		</div>
	)
}