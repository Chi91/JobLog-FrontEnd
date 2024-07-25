import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as registrationsActions from "../../redux/registration/registrationActions"
import { registration_error } from "../../redux/registration/registrationSlice"
import { authenticateUser } from "../../redux/authentication/authenticationActions"

import Loading from "./../Loading"

export default function RegisterStudent(props) {

	const dispatch = useDispatch()

	let pending = useSelector(state => state.registration.pending)
	let error = useSelector(state => state.registration.error)

	const [user, setUser] = useState({
		email: "",
		password: ""
	})

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

	const handleSubmit = e => {
		e.preventDefault()

		registrationsActions.saveStudent(user.email, user.password, (err, userObj) => {
			if (err) {
				dispatch(registration_error(err))
			} else if (userObj) {
				authenticateUser(user.email, user.password)
			} else {
				dispatch(registration_error("Nutzer konnte nicht gespeichert werden"))
			}
		})
	}

	return (
		<>
			<h2 className="modal-heading">Student registrieren</h2>

			<form className="modal-form" onSubmit={handleSubmit}>
				<label htmlFor="email">E-Mail</label>
				<input id="email" type="email" name="email" required onChange={handleChange} />

				<label htmlFor="password">Passwort</label>
				<input id="password" type="password" name="password" required onChange={handleChange} />

				<button className="button-primary" type="submit" onClick={handleSubmit}>
					{pending ? <Loading /> : "Registrieren"}
				</button>
			</form>

			{error ? <p className="error-message">{error}</p> : ''}
		</>
	)
}