import { useSelector } from "react-redux";
import { useState } from "react";
import Loading from "../../Loading";
import { updateCompany } from "../../../redux/company/companyActions"

export default function CDataEditorAbout(props) {

	const company = props.company;
	let pending = useSelector(state => state.company.pending)
	let error = useSelector(state => state.company.error)
	let accessToken = useSelector(state => state.authentication.accessToken)

	const [editMode, setEditMode] = useState(false)
	const [aboutText, setAboutText] = useState({ description: company && company.companyDescription ? company.companyDescription : "" })

	const editCompanyDescription = e => {

		e.preventDefault()
		setEditMode(true)
	}

	const handleChange = e => {
		let value = e.target.value

		setAboutText(prevalue => {
			return {
				...prevalue,
				description: value
			}
		})
	}

	const handleSubmit = e => {

		e.preventDefault()

		const data = {
			companyDescription: aboutText.description
		}

		updateCompany(company, accessToken, data)
		if (!error) setEditMode(false)
	}

	let content
	if (!editMode) {
		content = <p>{company ? company.companyDescription : ""}</p>
	}
	else {
		content = (
			<textarea onChange={handleChange}>
				{company ? company.companyDescription : ""}
			</textarea>
		)
	}

	let button
	if (!editMode) {
		button =
			<button className="company-edit-button" onClick={editCompanyDescription}>
				<i className="fa-solid fa-pencil"></i>
			</button>
	} else {
		button =
			<button className="company-edit-button" onClick={handleSubmit}>
				<i className="fa-regular fa-floppy-disk"></i>
			</button>
	}

	return (
		<article id="company-data" className={`company-article ${editMode ? "edit-mode" : ''}`}>
			<header>
				<h2>Über uns</h2>
				{pending ? <Loading /> : button}
			</header>

			<main>
				{content}
			</main>

			{error ? <p className="error-message">{error}</p> : ''}
		</article>
	)
}