import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function Jobcard(props) {

	const applications = useSelector(state => state.student.applications)
	const allCompanies = useSelector(state => state.company.allCompanies)
	const thisCompany = allCompanies?.filter(comp => comp.companyID === props.job.companyID)[0]

	let avatar
	const profilePic = thisCompany?.profilPic
	const picData = profilePic?.data
	if (profilePic && picData) {
		avatar = (
			<img alt={`Das Logo von ${thisCompany.companyName}`} src={`data:${profilePic.mimetype};base64,${picData}`} />
		)
	} else {
		avatar = (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.05 24.05">
				<path d="M6.02,22.02H3.53c-.82,0-1.5-.67-1.5-1.5V3.53c0-.83,.67-1.5,1.5-1.5H14.53c.83,0,1.5,.68,1.5,1.5v2.5" />
				<path d="M22.02,10.52v10c0,.83-.68,1.5-1.5,1.5h-3.5V14.02h-4v8h-3.5c-.82,0-1.5-.67-1.5-1.5V10.52c0-.82,.67-1.5,1.5-1.5h11c.83,0,1.5,.68,1.5,1.5Z" />
			</svg>
		)
	}

	return (
		<Link to={`/student/jobs/joboffer?jobID=${props.job.jobID}`}>
			<article className="jobcard">
				<header>
					<h3>{props.job.jobTitle}</h3>

					<figure>{avatar}</figure>
				</header>

				<main>
					<span className="hours">
						<i className="fa-regular fa-clock"></i>
						{props.job.weeklyHours + "h"}
					</span>
					<span className="salary">
						<i className="fa-regular fa-money-bill-1" />
						{props.job.salaryPerHour + "€"}
					</span>
					<span className="vacation">
						<i className="fa-solid fa-plane-departure" />
						{props.job.vacation + " " + (props.job.vacation > 1 ? "Tage" : "Tag")}
					</span>

					{/* check if student applied to this job */}
					{applications.some(appl => appl.jobID === props.job.jobID) ? <i className="fa-solid fa-check applied"></i> : ""}
					<p className="button-tertiary">Mehr Info</p>
				</main>
			</article>
		</Link>
	)
}