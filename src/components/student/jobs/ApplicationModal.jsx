import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import Checkbox from "../../elements/Checkbox"
import { newApplication, editApplication, addDocument } from "../../../redux/student/studentActions"
import { useEffect } from "react"
import Button from "../../elements/Button"

export default function ApplicationModal({ show, jobID, application, handleClose }) {

	const accessToken = useSelector(state => state.authentication.accessToken)
	const studentID = useSelector(state => state.student.singleStudent.studentID)
	const documents = useSelector(state => state.student.singleStudent.fileStorage)
	const [view, setView] = useState("choose")
	const [documentsToShare, setDocumentsToShare] = useState({ selection: [] })
	const [error, setError] = useState({ errMessage: null })
	const documentUpload = useRef(null)

	// determine if student has already applied to this job offer
	useEffect(() => {

		if (application) {
			setDocumentsToShare({
				selection: documents.filter(doc => application.visibleDocuments.includes(doc._id)).map(doc => doc._id.toString())
			})
		}
		//eslint-disable-next-line
	}, [])

	const handleChangeChb = e => {
		const documentID = e.target.value
		const docShare = documentsToShare.selection

		let index = docShare.indexOf(documentID)

		if (index > -1) {
			docShare.splice(index, 1)
		} else {
			docShare.push(documentID)
		}

		setDocumentsToShare({ selection: docShare })
	}

	const sendApplication = () => {

		newApplication(accessToken, jobID, studentID, documentsToShare.selection, err => {
			if (err) {
				setError({ errMessage: err })
			} else {
				setError({ errMessage: null })
				setView("success")
			}
		})
	}

	const updateApplication = () => {

		editApplication(accessToken, application.applicationID, documentsToShare.selection, error => {
			if (error) {
				setError({ errMessage: error })
			} else {
				setError({ errMessage: null })
				setView("success")
			}
		})
	}

	const uploadDocument = e => {

		e.preventDefault()

		const doc = e.target.files && e.target.files[0]
		if (!doc) return

		// reset file input
		e.target.value = null

		// send documents to backend
		addDocument(accessToken, studentID, doc)
	}

	let content
	if (view === "choose") {
		content = (
			<>
				<p>Wähle deine Bewerbungsdokumente</p>
				<div>
					{documents.length !== 0 ? documents.map((file, i) => {
						return (
							<Checkbox key={i} value={file._id} label={file.name} selected={documentsToShare.selection.includes(file._id)} handleOnChange={handleChangeChb} />
						)
					}) : (
						<>
							<p>Du hast noch keine Dokumente hochgeladen</p>
							<form>
								<input className="hidden-input" ref={documentUpload} type="file" name="uploadFile" onChange={uploadDocument} accept="application/pdf" />
								<Button
									label="Upload"
									icon={<i className="fa-solid fa-plus"></i>}
									iconPos="left"
									buttonStyle="primary"
									clickHandler={() => documentUpload.current.click()}
								/>
							</form>
						</>
					)}
				</div>
				<Button
					label="Auswählen"
					buttonStyle="primary"
					clickHandler={() => setView("confirm")}
				/>
			</>
		)
	} else if (view === "confirm") {
		content = (
			<>
				<p>Diese Dokumente freigeben</p>
				<div>
					{documentsToShare.selection.length !== 0 ? documents.filter(file => documentsToShare.selection.includes(file._id)).map((file, i) => {
						return (
							<p key={i}>{file.name}</p>
						)
					}) : "Es werden keine Dokumente freigegeben"}
				</div>
				{application ? <button className="button-primary" onClick={updateApplication}>Bewerbung anpassen</button> : <button className="button-primary" onClick={sendApplication}>Bewerben</button>}
			</>
		)
	} else if (view === "success") {
		content = (
			<>
				<p>Deine Bewerbung wurde abgeschickt</p>
				<Button
					label="Ok"
					buttonStyle="primary"
					clickHandler={() => handleClose()}
				/>
			</>
		)
	}

	return (
		<div className={`modal-background ${show ? "modal-open" : "modal-closed"}`} onClick={handleClose}>

			<div className="modal-container" onClick={e => e.stopPropagation()}>

				<button className="modal-close-button" onClick={handleClose}>
					<i className="fa-solid fa-xmark"></i>
				</button>

				<div className="modal-main">

					<h2 className="modal-heading">Bewerben</h2>

					<div className="student-application-modal-body">
						{content}
					</div>

					{error.errMessage ? <p className="error-message">{error.errMessage}</p> : ""}
				</div>
			</div>
		</div>
	)
}