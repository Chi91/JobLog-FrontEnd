import { useState } from "react"

import LoginForm from "./LoginForm"
import RegisterSelect from "./RegisterSelect"
import RegisterStudent from "./RegisterStudent"
import RegisterCompany from "./RegisterCompany"
import Modal from "../elements/Modal"

export default function LoginRegisterModal({ show, closeHandler }) {

	const [content, setContent] = useState()

	return (
		<Modal classes="login-modal" show={show} footerComponents={<></>} closeHandler={closeHandler}>
			{(() => {
				switch (content) {

					case "register-select":
						return <RegisterSelect changeContent={setContent} />
					case "register-student":
						return <RegisterStudent changeContent={setContent} />
					case "register-company":
						return <RegisterCompany changeContent={setContent} />
					default:
						return <LoginForm changeContent={setContent} />
				}
			})()}
		</Modal>
	)
}