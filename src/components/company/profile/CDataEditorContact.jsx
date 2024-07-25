import { useSelector } from "react-redux"
import { useState } from "react"
import Loading from "../../Loading"
import { updateCompany } from "../../../redux/company/companyActions"

export default function CDataEditorContact(props) {

	const company = props.company
	const accessToken = useSelector(state => state.authentication.accessToken)
	let pending = useSelector(state => state.company.pending)
	let error = useSelector(state => state.company.error)

	const [editMode, setEditMode] = useState(false)
	const [user, setUser] = useState({
		contactPerson: company.contactPerson ? company.contactPerson : "",
		phone: company && company.phone ? company.phone : "",
		applicationEmail: company && company.applicationEmail ? company.applicationEmail : "",
		homePage: company && company.homePage ? company.homePage : ""
	})

	const handleSubmit = e => {
		
		e.preventDefault()

		const data = {
			contactPerson: user.contactPerson,
			phone: user.phone,
			applicationEmail: user.applicationEmail,
			homePage: user.homePage
		}

		updateCompany(company, accessToken, data);
		if (!error) setEditMode(false);
	}

	const editCompanyContact = e => {
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

	// determine if content should be editable or not
	let content
	if (!editMode) {
		content =
			<>
				<i className="fa-solid fa-user" />
				<span id="name">{company && company.contactPerson ? company.contactPerson : '-'}</span>
				<i className="fa-solid fa-phone" />
				<span id="tel">{company && company.phone ? company.phone : '-'}</span>
				<i className="email fa-solid fa-envelope" />
				<span id="email">{company && company.applicationEmail ? company.applicationEmail : '-'}</span>
				<i className="fa-solid fa-globe" />
				<span id="web">{company && company.homePage ? <a target="_blank" rel="noreferrer" href={company.homePage}>{company.homePage}</a> : '-'}</span>
			</>
	} else {
		content =
			<>
				<form className="company-data-editor" onSubmit={handleSubmit}>

					<i className="fa-solid fa-user" />
					<label htmlFor="contactPerson">Vorname</label>
					<input type="text" id="contactPerson" name="contactPerson" value={user.contactPerson} onChange={handleChange} />

					<i className="fa-solid fa-phone" />
					<label htmlFor="phone">Telefon</label>
					<input type="tel" id="phone" name="phone" value={user.phone} onChange={handleChange} />

					<i className="fa-solid fa-envelope"></i>
					<label htmlFor="applicationEmail">E-Mail</label>
					<input type="text" id="applicationEmail" name="applicationEmail" value={user.applicationEmail} onChange={handleChange} />

					<i className="fa-solid fa-globe" />
					<label htmlFor="homePage">Homepage</label>
					<input type="text" id="homePage" name="homePage" value={user.homePage} onChange={handleChange} />

					{/* hidden submit button to submit form with enter key */}
					<button className="hidden-submit-button" type="submit"></button>
				</form>
			</>
	}

	let button
	if (!editMode) {
		button =
			<button className="company-edit-button" onClick={editCompanyContact}>
				<i className="fa-solid fa-pencil"></i>
			</button>
	} else {
		button =
			<button className="company-edit-button" onClick={handleSubmit}>
				<i className="fa-regular fa-floppy-disk"></i>
			</button>
	}

	return (
		<>
			<article id="company-data-contact" className={`company-article ${editMode ? "edit-mode" : ''}`}>
				<header>
					<h2>Kontakt</h2>
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