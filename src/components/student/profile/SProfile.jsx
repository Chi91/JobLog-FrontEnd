import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import SDataEditor from "./SDataEditor"
import AvailabilityEditor from "../../elements/Availability/Editor"
import { updateAvatar, addDocument, deleteDocuments, addAvailability, deleteAvailability } from "../../../redux/student/studentActions"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { student_error } from "../../../redux/student/studentSlice"
import Checkbox from "../../elements/Checkbox"
import Jobcard from "../jobs/Jobcard"

export default function SProfile() {

	const accessToken = useSelector(state => state.authentication.accessToken)
	const student = useOutletContext()
	const dispatch = useDispatch()
	const allJobs = useSelector(state => state.job.allJobs)
	const applications = useSelector(state => state.student.applications)
	const documents = useSelector(state => state.student.singleStudent.fileStorage)
	const availability = useSelector(state => state.student.singleStudent.availability)
	const [errors, setErrors] = useState({
		availability: null
	})

	// states
	const [documentsToDelete, setDocumentsToDelete] = useState({ selection: [] })

	// refs for opening upload dialogs
	const avatarUpload = useRef(null)
	const documentUpload = useRef(null)

	useEffect(() => {

		// set link in nav to active
		document.getElementById("link-to-profile").classList.add("active")

		// remove active class from link when unmounting
		return () => {
			document.getElementById("link-to-profile").classList.remove("active")
		}
		//eslint-disable-next-line
	}, [])

	// handle clicks for hidden file uploads
	const handleUploadClick = e => {

		e.preventDefault()

		// check where the click came from
		if (e.target.closest("button").id === "change-avatar-button") {

			// open file dialog for avatar
			avatarUpload.current.click()
		} else if (e.target.closest("button").id === "upload-document-button") {

			// open file dialog for documents
			documentUpload.current.click()
		}
	}

	const uploadAvatar = e => {

		e.preventDefault()

		const fileObj = e.target.files && e.target.files[0]
		if (!fileObj) return

		// reset file input
		e.target.value = null

		// send image to backend
		updateAvatar(accessToken, student.studentID, fileObj)
	}

	const uploadDocument = e => {

		e.preventDefault()

		const doc = e.target.files && e.target.files[0]
		if (!doc) return

		// reset file input
		e.target.value = null

		// send documents to backend
		addDocument(accessToken, student.studentID, doc)
	}

	const handleChangeChb = e => {
		const documentID = e.target.value
		const delDocs = documentsToDelete.selection

		let index = delDocs.indexOf(documentID)

		if (index > -1) {
			delDocs.splice(index, 1)
		} else {
			delDocs.push(documentID)
		}

		setDocumentsToDelete({
			selection: delDocs
		})
	}

	const handleDeleteDocuments = e => {

		e.preventDefault()

		if (documentsToDelete.selection.length === 0) return dispatch(student_error("Es wurden keine Dokumente ausgewählt"))
		deleteDocuments(accessToken, student.studentID, documentsToDelete.selection, () => {
			setDocumentsToDelete({ selection: [] })
		})
	}

	const checkCrossedSlots = (newSlot, callback) => {

		availability.forEach(oldSlot => {
			if (oldSlot.day === newSlot.day) {
				if ((newSlot.beginn < oldSlot.beginn && (newSlot.end >= oldSlot.beginn && newSlot.end <= oldSlot.end)) ||
					(newSlot.beginn < oldSlot.end && (newSlot.beginn >= oldSlot.beginn && oldSlot.end <= newSlot.end)) ||
					newSlot.beginn === oldSlot.end || newSlot.end === oldSlot.beginn || (newSlot.beginn >= oldSlot.beginn && newSlot.end <= oldSlot.end)) {
					return callback(oldSlot, null)
				}
			}
		})

		return callback(null, "No Error")
	}

	const saveAvailability = newSlot => {

		// check if time is correct
		if (newSlot.beginn && newSlot.end) {

			//prevent crossing slots
			let indecator = null;
			checkCrossedSlots(newSlot, (crossingSlot, helper) => {
				if (crossingSlot != null) {
					indecator = crossingSlot;
				}
			})

			if (indecator) {
				setErrors({ availability: `Überschneidung mit Slot um ${indecator.beginn} - ${indecator.end}` })
				return
			}

			// send error if "--" has been selected
			if (newSlot.beginn.includes("--") || newSlot.end.includes("--")) {
				setErrors({ availability: "Bitte eine gültige Uhrzeit auswählen" })
				return
			}

			// send error if beginn is after end
			if (newSlot.beginn > newSlot.end) {
				setErrors({ availability: "Endzeit kann nicht vor dem Beginn liegen" })
				return
			}

			// start and end-time should not be the same
			if (newSlot.beginn === newSlot.end) {
				setErrors({ availability: "Start- und Endzeit können nicht die selbe sein." })
				return
			}

			// push new availability to original availability
			addAvailability(accessToken, student.studentID, newSlot, () => {
				setErrors({ availability: null })
			})
		} else {

			// send error because beginn or end is missing
			return setErrors({ availability: "Anfangs- oder Endzeit ungültig" })
		}
	}

	const handleDeleteAvailability = slotID => {
		deleteAvailability(accessToken, student.studentID, slotID)
	}

	let avatar
	const profilePic = student?.profilPic
	const picData = profilePic?.data
	if (profilePic && picData) {
		avatar = (
			<img alt="Profilbild" src={`data:${profilePic.mimetype};base64,${picData}`} />
		)
	} else {
		avatar = (
			<span className="fa-stack fa-lg">
				<i className="fa fa-circle fa-stack-2x"></i>
				<i className="fa-solid fa-user txt-clr fa-stack-1x" />
			</span>
		)
	}

	return (
		<>
			<form className="upload-avatar">
				<input className="hidden-input" ref={avatarUpload} type="file" name="picFile" onChange={uploadAvatar} accept="image/*" />
				<figure className="profile-pic">
					<figcaption>
						<button id="change-avatar-button" onClick={handleUploadClick}>
							Ändern
						</button>
					</figcaption>
					{avatar}
				</figure>

				<h2>{(student && student.firstname ? student.firstname : "") + (student && student.lastname ? " " + student.lastname : "")}</h2>
			</form>

			{student ? <SDataEditor student={student} /> : ''}

			{student ? <AvailabilityEditor availability={availability} onSaveHandler={saveAvailability} deleteHandler={handleDeleteAvailability} label="Meine Verfügbarkeiten" id="student-availability" classes="student-article" /> : ''}
			{errors.availability ? <p className="error-message">{errors.availability}</p> : ""}

			<article id="student-documents" className="student-article">
				<header>
					<h2>Meine Dokumente</h2>
					<form>
						<input className="hidden-input" ref={documentUpload} type="file" name="uploadFile" onChange={uploadDocument} accept="application/pdf" />
						<button className="student-delete-button" onClick={handleDeleteDocuments}>
							<i className="fa-regular fa-trash-can"></i>
						</button>
						<button id="upload-document-button" className="student-plus-button" onClick={handleUploadClick}>
							<i className="fa-solid fa-plus"></i>
						</button>
					</form>
				</header>
				<main>
					{documents.map((file, i) => {
						return (
							<Checkbox key={i} value={file._id} label={file.name} selected={documentsToDelete.selection.includes(file._id)} handleOnChange={handleChangeChb} />
						)
					})}
				</main>
			</article>

			<article id="student-my-applications" className="student-article">
				<header>
					<h2>Meine Bewerbungen</h2>
				</header>
				<main>
					{applications.length !== 0 ? allJobs.filter(job => applications.some(appl => appl.jobID === job.jobID)).map((appJob, i) => {
						return <Jobcard key={i} job={appJob} />
					}) : <p>Du hast noch keine Bewerbungen verschickt.</p>}
				</main>
			</article>
		</>
	)
}