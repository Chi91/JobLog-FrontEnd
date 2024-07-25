import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { getSingleStudent, getMyApplications } from "../../redux/student/studentActions"
import { user_logout } from "../../redux/authentication/authenticationActions"
import { getCourses, getFields } from "../../redux/data/dataActions"

import logo from '../../assets/images/Logo_white.svg'

import { getAllJobs } from "../../redux/job/jobActions"
import { getCompanies } from "../../redux/company/companyActions"

export default function Student() {

	const accessToken = useSelector(state => state.authentication.accessToken)
	const user = useSelector(state => state.authentication.user)
	const student = useSelector(state => state.student.singleStudent)

	// asign student-body id to body
	useEffect(() => {
		document.querySelector("body").setAttribute("id", "student-body")
	}, [])

	useEffect(() => {
		if (accessToken) {
			getSingleStudent(user.id)
			getAllJobs()
			getMyApplications(accessToken, user.id)
			getCourses()
			getFields()
			getCompanies()
		}
		//eslint-disable-next-line
	}, [accessToken])

	const handleLogout = () => {
		user_logout()
	}

	if (user && user.type === "student") {
		return (
			<>
				<nav id="student-nav" role="navigation">
					<ul>
						<li>
							<Link id="link-to-home" to="home" className={!accessToken ? 'disabled' : ''}>
								<i className="fa-solid fa-house"></i>
							</Link>
						</li>
						<li>
							<Link id="link-to-jobs" to="jobs" className={!accessToken ? 'disabled' : ''}>
								<i className="fa-solid fa-briefcase"></i>
							</Link>
						</li>
						<li>
							<Link id="link-to-applications" to="applications" className={!accessToken ? 'disabled' : ''}>
								<i className="fa-solid fa-inbox"></i>
							</Link>
						</li>
						<li>
							<Link id="link-to-profile" to="profile" className={!accessToken ? 'disabled' : ''}>
								<i className="fa-solid fa-user"></i>
							</Link>
						</li>
					</ul>
				</nav>

				<header id="student-header">
					<img alt="JobLog Logo" src={logo} />
					<button id="student-logout-button" onClick={handleLogout}>
						<i className="fa-solid fa-right-from-bracket"></i>
					</button>
				</header>

				<main id="student-main">
					<Outlet context={student} />
				</main>
			</>
		)
	} else {

		let currentURL = encodeURIComponent(window.location.href)

		// hard redirect to reset state, but with currentURL as param
		window.location.href = "/?after_login=" + currentURL
	}
}