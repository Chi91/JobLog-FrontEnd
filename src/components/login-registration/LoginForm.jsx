import { useState } from "react"
import { useSelector } from "react-redux"
import Loading from "../Loading"
import Checkbox from "../elements/Checkbox"
import * as authenticationActions from "../../redux/authentication/authenticationActions"

export default function LoginForm(props) {

	let pending = useSelector(state => state.authentication.loginPending)
	let error = useSelector(state => state.authentication.error)

	const [rememberMe, setRememberMe] = useState(false)

	const [user, setUser] = useState({
		mail: "",
		password: ""
	})

	const handleChange = e => {
		const value = e.target.value
		const name = e.target.name

		setUser({ ...user, [name]: value })
	}

	const handleLogin = e => {
		e.preventDefault()
		authenticationActions.authenticateUser(user.mail, user.password, rememberMe)
	}

	return (
		<>
			<h2 className="modal-heading">Login</h2>

			<form className="modal-form" onSubmit={handleLogin}>
				<label htmlFor="mail">E-Mail</label>
				<input id="mail" type="email" name="mail" required onChange={handleChange} />

				<label htmlFor="password">Passwort</label>
				<input id="password" type="password" name="password" required onChange={handleChange} />

				<Checkbox label="Angemeldet bleiben" value="rememberMe" selected={rememberMe} handleOnChange={() => setRememberMe(!rememberMe)} />

				<button className="button-primary" type="submit" onClick={handleLogin}>
					{pending ? <Loading /> : "Login"}
				</button>
			</form>

			<div className="register-container">
				<p>oder</p>
				<button className="button-tertiary" onClick={() => props.changeContent("register-select")}>Registrieren</button>
			</div>

			{error ? <p className="error-message">{error}</p> : ''}
		</>
	)
}