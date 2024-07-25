import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link, useOutletContext } from "react-router-dom"
import store from '../../redux/store'
import * as jobSlice from "../../redux/job/jobSlice"
import JobList from "./jobCardsCompany/JobListCompany"
import SearchForm from "../elements/SearchForm"
import { getOwnJobs } from "../../redux/job/jobActions"

export default function CJobs() {

	const company = useOutletContext()
	const jobs = useSelector(state => state.job.ownJobs)

	const [searchQuery, setSearchQuery] = useState("")

	const createJob = e => {
		store.dispatch(jobSlice.job_setOneJob({
			job: {}
		}))
	}

	useEffect(() => {

		// set link in nav to active
		document.getElementById("link-to-jobs").classList.add("active")

		//get all own job offers
		getOwnJobs(company.companyID)

		// remove active class from link when unmounting
		return () => {
			document.getElementById("link-to-jobs").classList.remove("active")
		}
		//eslint-disable-next-line
	}, [])

	let ownJobs = jobs.filter(job => {
		if (searchQuery === "") return job
		return job.jobTitle.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
	})

	let content;
	if (ownJobs.length === 0) {
		content = 'Es sind keine Jobs vorhanden'
	} else {
		content = <>
			<div className="jobList">
				<JobList jobs={ownJobs} />
			</div>
		</>
	}

	return (
		<article className="company-article" id="company-jobs">
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
			<main className="jobList">
				{content}
			</main>
		</article>
	)
}