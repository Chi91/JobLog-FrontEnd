import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { getApplicationsForJob } from "../../redux/job/jobActions"
import { getStudentObject } from "../../redux/student/studentActions"
import Section from "../elements/Section"
import Slider from "../elements/Slider"
import JobCardCompany from "./jobCardsCompany/JobCardCompany"
import StudentList from "./studentCards/StudentList"

export default function CApplications() {

	const accessToken = useSelector(state => state.authentication.accessToken)
	const ownJobs = useSelector(state => state.job.ownJobs)
	const [searchQuery, setSearchQuery] = useState("")
	const [applications, setApplications] = useState([])
	const [applStudents, setApplStudents] = useState([])

	useEffect(() => {

		// reset students that may be in state
		setApplStudents([])

		// set link in nav to active
		document.getElementById("link-to-applications").classList.add("active")

		// remove active class from link when unmounting
		return () => {
			document.getElementById("link-to-applications").classList.remove("active")
		}
	}, [])

	// get students for given applications
	useEffect(() => {

		applications.forEach(application => {
			getStudentObject(application.studentID, (error, student) => {
				setApplStudents(current => [...current, student])
			})
		})
	}, [applications])

	const showApplications = (e, jobID) => {

		// clear students from other application
		setApplStudents([])
		
		getApplicationsForJob(jobID, accessToken, (error, applications) => {
			setApplications(Array.from(applications))
		})

		// remove active class from other jobcards
		const jobcards = document.querySelectorAll("#company-applications-ownjobs-slider .jobcard")
		jobcards.forEach(card => card.classList.remove("active"))

		e.target.closest(".jobcard").classList.add("active")
	}

	return (
		<>
			<Section id="company-applications-ownjobs-slider" label="Eigene Angebote" searchform={true} searchChangeHandler={e => setSearchQuery(e.target.value)}>
				<Slider>
					{ownJobs && ownJobs.length > 0 ? (
						ownJobs.filter(job => {
							if (searchQuery === "") return job
							return job.jobTitle.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
						}).map((job, i) => {
							return (
								<div key={i} onClick={e => showApplications(e, job.jobID)}>
									<JobCardCompany job={job} bodyClickable={false} />
								</div>
							)
						})
					) : <p>Sie haben noch keine Jobangebote eingestellt.</p>}
				</Slider>
			</Section>

			<Section label="Bewerbungen">
				<StudentList students={applStudents} />
			</Section>
		</>
	)
}