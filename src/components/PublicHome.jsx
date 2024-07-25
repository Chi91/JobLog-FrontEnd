import logo from "../assets/images/Logo_white.svg"
import LoginRegisterModal from "./login-registration/LoginRegisterModal"
import { useEffect } from "react"
import { useState } from "react"

export default function PublicHome() {

	const [showLoginModal, setShowLoginModal] = useState(false)

	useEffect(() => {
		document.querySelector("body").setAttribute("id", "public-body")
	}, [])

	return (
		<>
			<header id="site-header">

				<div className="logo-with-text">
					<img className="logo-medium" src={logo} alt="JobLog Logo" />
					<p>JobLog</p>
				</div>

				<p>Der richtige Job zur richtigen Zeit</p>
			</header>

			<main id="site-content">
				<p>
					JobLog ist die ideale Lösung für Firmen und Studierende, sich auf Werkstudenten-, Minijob- und
					Festanstellungen zu bewerben. Mit JobLog findest du einen Job, der zu dir und deinen
					Bedürfnissen passt. Im Vordergrund steht dabei deine Verfügbarkeit.
				</p>
				<p>
					Unser Service für Unternehmen beinhaltet vor allem die Vereinfachung des Bewerbungsprozesses.
					Benötigte Dokumente werden mit einem Klick für Sie freigegeben. Über das Profil der Bewerber
					können sie auch direkt kontaktiert werden.
				</p>

				<p className="bold-paragraph">Eins noch - Sagen sie uns wer sie sind.</p>
			</main>

			<footer id="site-footer">

				<button className="button-primary" onClick={() => setShowLoginModal(true)}>
					<i className="fa-solid fa-right-to-bracket" /> Login or Register
				</button>
			</footer>

			{showLoginModal ? <LoginRegisterModal show={showLoginModal} closeHandler={() => setShowLoginModal(false)} /> : ""}
		</>
	)
}