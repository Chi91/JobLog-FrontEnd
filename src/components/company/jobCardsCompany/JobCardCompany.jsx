import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { job_setOneJob, job_setAllOwnJobs, job_error, job_editJob } from "../../../redux/job/jobSlice"
import DeleteJobModal from "./DeleteJobModal"
import { deleteJob } from "../../../redux/job/jobActions"
import { useState } from "react"

export default function JobCardCompany({ job, bodyClickable = true }) {

	const dispatch = useDispatch()
	const accessToken = useSelector(state => state.authentication.accessToken)

	const [showModal, setShowModal] = useState(false)

	let ownJobs = useSelector(state => state.job.ownJobs)

	const handleMove = e => {
		dispatch(job_setOneJob({
			job: job
		}))

		dispatch(job_editJob({
			editedJob: job
		}))
	}

	const showDeleteModal = e => {

		e.preventDefault()
		setShowModal(true)
	}

	const hideDeleteModal = e => {

		e.preventDefault()
		setShowModal(false)
	}

	const handleDelete = id => {

		deleteJob(accessToken, id, err => {
			if (err) return dispatch(job_error(err))

			let ownJobsCopy = ownJobs.filter(job => job.jobID !== id)
			dispatch(job_setAllOwnJobs({ ownJobs: ownJobsCopy }))
			setShowModal(false)
		})
	}

	const content = (
		<>
			<div id="sliderHelper" className="sliderHelper">
				<div id={"JobItem-" + job.jobID} className="job-card-company jobcard">
					<div id="name">
						{/* Moves to Job overview Page */}
						<h3>{job.jobTitle}</h3>
					</div>
					<div id="weeklyHours">
						<i className="fa-regular fa-clock" />
						<span>
							{job.weeklyHours} h
						</span>
					</div>
					<div id="edit">
						<Link to={`/company/jobs/jobEdit?jobID=${job.jobID}site=0`} id="edit-button" onClick={handleMove}>
							<i className="fa-solid fa-pencil" />
						</Link>
					</div>
					<div id="delete" onClick={showDeleteModal}>
						<i className="fa-solid fa-trash-can" />
					</div>
					<div id="salaryPerHour">
						<i className="fa-regular fa-money-bill-1" />
						<span>
							{job.salaryPerHour} €/h
						</span>
					</div>
					<div id="vacation">
						<i className="fa-solid fa-plane-departure" />
						<span>
							{job.vacation} Tage
						</span>
					</div>
				</div>
			</div>
			{showModal ? <DeleteJobModal show={showModal} handleClose={hideDeleteModal} handleDelete={handleDelete} jobID={job.jobID} jobTitle={job.jobTitle} /> : ""}
		</>
	)

	if (bodyClickable) {
		return (
			<Link to={`/company/jobs/joboffer?jobID=${job.jobID}`}>
				{content}
			</Link>
		)
	} else {
		return content
	}
}
