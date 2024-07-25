import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import React, { useEffect } from "react"
import { getSingleJob } from "../../../redux/job/jobActions"
import { getSingleCompany } from "../../../redux/company/companyActions"
import { useSelector } from "react-redux"
import ApplicationModal from "./ApplicationModal"
import { useState } from "react"
import DeleteApplicationModal from "./DeleteApplicationModal"
import Button from "../../elements/Button"

export default function SSingleJobView() {

	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const jobID = searchParams.get("jobID")

	const job = useSelector(state => state.job.job)
	const company = useSelector(state => state.company.singleCompany)

	const allApplications = useSelector(state => state.student.applications)
	const application = allApplications.filter(appl => appl.jobID === jobID)[0]
	const hasApplied = application ? true : false

	const [showApplicationModal, setShowApplicationModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)

	useEffect(() => {
		// set link in nav to active
		document.getElementById("link-to-jobs").classList.add("active")

		return (() => {
			document.getElementById("link-to-jobs").classList.remove("active")
		})
	}, [])

	// get job
	useEffect(() => {
		getSingleJob(jobID)
	}, [jobID])

	// get company when job is fetched
	useEffect(() => {
		if (job) getSingleCompany(job.companyID)
	}, [job])

	if (!jobID) {
		return <Navigate to="../jobs" />
	}

	return (
		<>
			<div className="sticky">
				<button className="back-button" onClick={() => navigate(-1)}>
					<i className="fa-solid fa-chevron-left"></i>
					<span>zurück</span>
				</button>

				<div className="job-overview">
					<h2>{job && job.jobTitle ? job.jobTitle : ''}</h2>
					<p>{job && job.companyName ? job.companyName : ''}</p>
					{hasApplied ? <i className="fa-solid fa-check applied-check"></i> : ""}
					{hasApplied ? (
						<>
							<Button
								label="Bewerbung ändern"
								icon={<i className="fa-solid fa-pencil" />}
								iconPos="right"
								buttonStyle="primary applied"
								clickHandler={() => setShowApplicationModal(true)}
							/>

							<button id="delete-application" onClick={() => setShowDeleteModal(true)}>
								<i className="fa-regular fa-trash-can"></i>
							</button>
						</>
					) : (
						<Button
							label="Bewerben"
							buttonStyle="primary"
							clickHandler={() => setShowApplicationModal(true)}
						/>
					)}
				</div>
			</div>

			<div className="student-jobview-main">
				<h3 className="student-jobview-heading">Stellenbeschreibung</h3>

				<p className="job-summary">{job && job.jobSummary ? job.jobSummary : ''}</p>

				<h3 className="student-jobview-heading">Hardfacts</h3>

				<i className="fa-regular fa-clock"></i>
				<p>{job && job.jobType && job.weeklyHours ? job.jobType + " / " + job.weeklyHours + "h pro Woche" : ''}</p>

				<i className="fa-regular fa-money-bill-1" />
				<p>{job && job.salaryPerHour ? job.salaryPerHour + "€ / h" : ''}</p>

				<i className="fa-solid fa-plane-departure" />
				<p>{job && job.vacation ? job.vacation + " " + (job.vacation > 1 ? "Tage" : "Tag") : ''}</p>

				<i className="fa-regular fa-star"></i>
				<p>{job && job.benefits ? job.benefits : ''}</p>

				<h3 className="student-jobview-heading">Zeitslots</h3>
				{job && job.weeklyTimeSlots ? job.weeklyTimeSlots.map((elem, i) => {
					switch (elem.day) {
						case 1: return <React.Fragment key={i}><p>Montag</p><p>{elem.beginn} - {elem.end}</p></React.Fragment>
						case 2: return <React.Fragment key={i}><p>Dienstag</p><p>{elem.beginn} - {elem.end}</p></React.Fragment>
						case 3: return <React.Fragment key={i}><p>Mittwoch</p><p>{elem.beginn} - {elem.end}</p></React.Fragment>
						case 4: return <React.Fragment key={i}><p>Donnerstag</p><p>{elem.beginn} - {elem.end}</p></React.Fragment>
						case 5: return <React.Fragment key={i}><p>Freitag</p><p>{elem.beginn} - {elem.end}</p></React.Fragment>
						case 6: return <React.Fragment key={i}><p>Samstag</p><p>{elem.beginn} - {elem.end}</p></React.Fragment>
						case 7: return <React.Fragment key={i}><p>Sonntag</p><p>{elem.beginn} - {elem.end}</p></React.Fragment>
						default: return <p>Keine verfügbaren Zeiten gefunden</p>
					}
				}) : ''}

				<h3 className="student-jobview-heading">Kontakt</h3>

				<i className="fa-regular fa-user"></i>
				<p>{company && company.contactPerson ? company.contactPerson : '-'}</p>

				<i className="fa-solid fa-phone"></i>
				<p>{company && company.phone ? company.phone : '-'}</p>

				<i className="fa-solid fa-envelope"></i>
				<p>{company && company.email ? company.email : '-'}</p>

				<i className="fa-solid fa-earth-europe"></i>
				<p>{company && company.homePage ? <a target="_blank" rel="noreferrer" href={company.homePage}>{company.homePage}</a> : '-'}</p>
			</div>

			{showApplicationModal ? <ApplicationModal show={showApplicationModal} jobID={jobID} application={application} handleClose={() => setShowApplicationModal(false)} /> : ""}
			{showDeleteModal ? <DeleteApplicationModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} application={application} /> : ""}
		</>
	)
}