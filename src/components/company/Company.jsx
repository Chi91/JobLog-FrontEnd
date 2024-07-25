import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import Logo from "../../assets/LogoAssets/Logo_WhiteOnTransparent_400x400px.png"
import { user_logout } from "../../redux/authentication/authenticationActions"
import { getSingleCompany } from "../../redux/company/companyActions"
import { getOwnJobs } from "../../redux/job/jobActions"

/* import CHomePublic from "./CHomePublic" */

export default function Company() {

	const accessToken = useSelector(state => state.authentication.accessToken)
	const user = useSelector(state => state.authentication.user)
	const company = useSelector(state => state.company.singleCompany)

	useEffect(() => {
		document.querySelector("body").setAttribute("id", "company-body")

		if (accessToken) {
			getSingleCompany(user.id)
		}
		//eslint-disable-next-line
	}, [])

	// load ownJobs
	useEffect(() => {
		if (company) getOwnJobs(company.companyID)
	}, [company])

	const logout = () => {
		user_logout();
	}

	if (user && user.type === "company") {
		return (
			<div id="company-flex-helper">
				<header id="company-header">
					<div id="company-header-logo">
						<img className="logo-medium" src={Logo} alt="Das Logo der App JobLog" />
						<p id="header-title">
							JOBLOG
						</p>
					</div>
					<nav id="company-nav" role="navigation">
						<ul>
							<li>
								<Link id="link-to-home" to="home" className={!accessToken ? 'disabled' : ''}>
									<i className="fa-solid fa-house"></i>
									Home
								</Link>
							</li>
							<li>
								<Link id="link-to-profile" to="profile" className={!accessToken ? 'disabled' : ''}>
									<i className="fa-solid fa-user"></i>
									Profil
								</Link>

							</li>
							<li>
								<Link id="link-to-jobs" to="jobs" className={!accessToken ? 'disabled' : ''}>
									<i className="fa-solid fa-briefcase"></i>
									Jobs
								</Link>
							</li>
							<li>
								<Link id="link-to-applications" to="applications" className={!accessToken ? 'disabled' : ''}>
									<i className="fa-solid fa-inbox"></i>
									Bewerbungen
								</Link>
							</li>
							<li>
								<button id="link-to-logout" onClick={logout} className={!accessToken ? 'disabled' : ''}>
									<i className="fa-solid fa-right-from-bracket"></i>
									Abmelden
								</button>
							</li>
						</ul>
					</nav>
				</header>

				<main id="company-main">
					{accessToken ? <Outlet context={company} /> : <p>"test"</p>}
				</main>
			</div>
		)
	} else {

		let currentURL = encodeURIComponent(window.location.href)

		// hard redirect to reset state, but with currentURL as param
		window.location.href = "/?after_login=" + currentURL
	}
}