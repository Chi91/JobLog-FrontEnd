import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SearchForm from "../elements/SearchForm"
import Jobcard from "./jobs/Jobcard"

export default function SApplications() {

	const [searchQuery, setSearchQuery] = useState("")
	const allJobs = useSelector(state => state.job.allJobs)
	const applications = useSelector(state => state.student.applications)

	useEffect(() => {
		document.getElementById("link-to-applications").classList.add("active")

		return (() => {
			document.getElementById("link-to-applications").classList.remove("active")
		})
	})

	return (
		<>
			<SearchForm handleOnChange={e => setSearchQuery(e.target.value)} />

			<article className="student-article" id="student-my-applications">
				<header>
					<h2>Meine Bewerbungen</h2>
				</header>
				<main>
					{applications.length !== 0 ? allJobs.filter(job => applications.some(appl => appl.jobID === job.jobID)).filter(appliedJob => {
						if (searchQuery === "") return appliedJob
						return appliedJob.jobTitle.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
					}).map((appJob, i) => {
						return <Jobcard key={i} job={appJob} />
					}) : <p>Du hast noch keine Bewerbungen verschickt.</p>}
				</main>
			</article>

			<article className="student-article" id="student-diret-joboffers">
				<header>
					<h2>Direkte Angebote</h2>
				</header>
				<main>
					{/* TODO: direkte Stellenagebote implementieren */}
				</main>
			</article>
		</>
	)
}