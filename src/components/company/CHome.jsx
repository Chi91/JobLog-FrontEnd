import StudentList from "./studentCards/StudentList"

import * as studentActions from "../../redux/student/studentActions"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link, useOutletContext } from "react-router-dom"
import store from '../../redux/store'
import * as jobSlice from "../../redux/job/jobSlice"
import JobList from "./jobCardsCompany/JobListCompany"
import SearchForm from "../elements/SearchForm"
import { getOwnJobs } from "../../redux/job/jobActions"
import { getCourses, getFields } from "../../redux/data/dataActions"
import banner from "../../assets/images/CookieBanner.png"
import logo from "../../assets/images/Logo_white.svg"

export default function CHome() {

	//Used in Filter Search
	const [searchQuery, setSearchQuery] = useState("")

	const company = useOutletContext()
	const companyID = company ? company.companyID : ""
	const allStudents = useSelector(state => state.student.allStudents)
	const jobs = useSelector(state => state.job.ownJobs)

	const createJob = () => {
		store.dispatch(jobSlice.job_editJob({
			editedJob: {}
		}))
	}

	useEffect(() => {

		// get all students for StudentList
		studentActions.getStudents()

		//getFields
		getFields();

		//getCourses
		getCourses();

		// set link in nav to active
		document.getElementById("link-to-home").classList.add("active")

		// remove active class from link when unmounting
		return () => {
			document.getElementById("link-to-home").classList.remove("active")
		}
	}, [])

	useEffect(() => {
		//getOwnJobs after creating a job
		getOwnJobs(companyID)
	}, [companyID])

	let ownJobs = jobs.filter(job => {
		if (searchQuery === "") return job
		return job.jobTitle.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
	})

	let content;
	if (ownJobs.length === 0) {
		content = 'Es sind keine Jobs vorhanden'
	} else {
		content = <>
			<i id="arrow-left" className="fa-solid fa-angle-left control" />
			<div id="joblist">
				<JobList jobs={ownJobs} />
			</div>
			<i id="arrow-right" className="fa-solid fa-angle-right control" />
		</>
	}

	return (
		<>
			<div id="info-slider-private-home">
				<img alt="Infobanner mit der Information, dass cookies verwendet werden." src={logo} />
				<p>Der <b>richtige</b> Job zur <b>richtigen</b> Zeit</p>		
			</div>

			<article className="company-article" id="company-ownjobs-slider">
				<header>
					<h2>
						Eigene Angebote
					</h2>
					<Link id="link-to-job-edit" to={`/company/jobs/jobEdit?jobID=new`} onClick={createJob}>
						<i id="add-icon" className="fa-solid fa-square-plus" />
					</Link>

					<SearchForm
						padding={false}
						handleOnChange={e => setSearchQuery(e.target.value)}
					/>
				</header>

				<main>
					{content}
				</main>
			</article>

			<article className="company-article" id="company-interesting-persons">
				<header>
					<h2>
						Interessante Personen
					</h2>
				</header>

				<main>
					<StudentList students={allStudents} />
				</main>
			</article>
		</>
	)
}