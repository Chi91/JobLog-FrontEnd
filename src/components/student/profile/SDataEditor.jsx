import { useState } from "react"
import { useSelector } from "react-redux"
import Loading from "../../Loading"
import { updateStudent } from "../../../redux/student/studentActions"
import Select from "react-select"

export default function SDataEditor(props) {

	const accessToken = useSelector(state => state.authentication.accessToken)
	const student = props.student
	let pending = useSelector(state => state.student.pending)
	let error = useSelector(state => state.student.error)
	let courses = useSelector(state => state.data.courses)

	const [editMode, setEditMode] = useState(false)

	const [user, setUser] = useState({
		firstname: student.firstname ? student.firstname : '',
		lastname: student.lastname ? student.lastname : '',
		courseID: student.courseID ? student.courseID : '',
		email: student.email,
		phone: student.phone ? student.phone : ''
	})

	const editStudentData = e => {

		e.preventDefault()
		setEditMode(true)
	}

	const handleChange = e => {
		let value = e.target.value
		let name = e.target.name

		setUser(prevalue => {
			return {
				...prevalue,
				[name]: value
			}
		})
	}

	const handleChangeSelect = value => {
		setUser(current => {
			return {
				...current,
				courseID: value
			}
		})
	}

	const handleSubmit = e => {

		e.preventDefault()

		updateStudent(
			accessToken,
			props.student.studentID,	// studentID
			user.courseID,				// courseID
			null,						// fieldID
			user.firstname,				// firstname
			user.lastname,				// lastname
			null,						// password
			user.phone,					// phone
			user.email,					// email
			null,						// availability
			null,						// savedSearches
			null,						// favoriteCompanies
			null						// profilPic
		)

		if (!error) setEditMode(false)
	}

	// determine if content should be editable or not
	let content
	if (!editMode) {
		content =
			<>
				<i className="fa-solid fa-user"></i>
				<p>{(student && student.firstname ? student.firstname + " " : '') + (student && student.lastname ? student.lastname : '')}</p>
				<i className="fa-solid fa-graduation-cap"></i>
				<p>{student && student.courseID ? student.courseID : '-'}</p>
				<i className="fa-solid fa-envelope"></i>
				<p>{student ? student.email : ''}</p>
				<i className="fa-solid fa-phone"></i>
				<p>{student && student.phone ? student.phone : '-'}</p>
			</>
	} else {
		content =
			<>
				<form className="student-data-editor" onSubmit={handleSubmit}>

					<i className="fa-solid fa-user" />
					<label htmlFor="firstname">Vorname</label>
					<input type="text" id="firstname" name="firstname" value={user.firstname} onChange={handleChange} />
					<label htmlFor="lastname">Nachname</label>
					<input type="text" id="lastname" name="lastname" value={user.lastname} onChange={handleChange} />

					<i className="fa-solid fa-graduation-cap"></i>

					<label htmlFor="courseID">Studiengang</label>
					<Select options={courses} onChange={opt => handleChangeSelect(opt.value)} className="course-select" unstyled placeholder={<div className="select-placeholder">Suchen...</div>} />

					<i className="fa-solid fa-envelope"></i>
					<label htmlFor="email">E-Mail</label>
					<input type="text" id="email" name="email" value={user.email} onChange={handleChange} />

					<i className="fa-solid fa-phone"></i>
					<label htmlFor="phone">Telefonnummer</label>
					<input type="tel" id="phone" name="phone" value={user.phone} onChange={handleChange} />

					{/* hidden submit button to submit form with enter key */}
					<button className="hidden-submit-button" type="submit"></button>
					<button className="button-primary" onClick={handleSubmit}>Speichern</button>
				</form>
				
			</>
	}

	// determine correct button to show in header
	let button
	if (!editMode) {
		button =
			<button className="student-edit-button" onClick={editStudentData}>
				<i className="fa-solid fa-pencil"></i>
			</button>
	} else {
		button =
			<button className="student-edit-button" onClick={handleSubmit}>
				<i className="fa-regular fa-floppy-disk"></i>
			</button>
	}

	return (
		<>
			<article id="student-data" className={`student-article ${editMode ? "edit-mode" : ''}`}>
				<header>
					<h2>Meine Daten</h2>
					{pending ? <Loading /> : button}
				</header>

				<main>
					{content}
				</main>
				{error ? <p className="error-message">{error}</p> : ''}
			</article>
		</>
	)
}