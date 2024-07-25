import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { useOutletContext, Link } from "react-router-dom"
import JobList from "./jobCardsCompany/JobListCompany"
import CDataEditorAbout from "./profile/CDataEditorAbout"
import CDataEditorContact from "./profile/CDataEditorContact"
import store from "../../redux/store"
import * as jobSlice from "../../redux/job/jobSlice"
import SearchForm from "../elements/SearchForm";
import { getOwnJobs } from "../../redux/job/jobActions";
import { updateAvatar } from "../../redux/company/companyActions";

export default function CompanyProfile() {

	const accessToken = useSelector(state => state.authentication.accessToken)
	const company = useOutletContext()
	const jobs = useSelector(state => state.job.ownJobs)
	const avatarUpload = useRef(null)

	const [searchQuery, setSearchQuery] = useState("")

	const createJob = e => {
		store.dispatch(jobSlice.job_setOneJob({
			job: {}
		}))
	}

	useEffect(() => {

		// set link in nav to active
		document.getElementById("link-to-profile").classList.add("active")

		//get all jobs
		getOwnJobs(company.companyID)

		// remove active class from link when unmounting
		return () => {
			document.getElementById("link-to-profile").classList.remove("active")
		}
		//eslint-disable-next-line
	}, [])

	const uploadAvatar = e => {

		e.preventDefault()

		const fileObj = e.target.files && e.target.files[0]
		if (!fileObj) return

		// reset file input
		e.target.value = null

		// send image to backend
		updateAvatar(accessToken, company.companyID, fileObj)
	}

	let avatar
	const profilePic = company?.profilPic
	const picData = profilePic?.data
	if (profilePic && picData) {
		avatar = (
			<img alt="Profilbild" src={`data:${profilePic.mimetype};base64,${picData}`} />
		)
	} else {
		avatar = (
			<span className="fa-stack fa-lg">
				<i className="fa fa-circle fa-stack-2x" />
				<i className="fa-solid fa-building txt-clr fa-stack-1x" />
			</span>
		)
	}

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
		<>
			<div id="company-profile-header">
				<form className="upload-avatar">
					<input className="hidden-input" ref={avatarUpload} type="file" name="picFile" onChange={uploadAvatar} accept="image/*" />
					<figure className="profile-pic">
						<figcaption>
							<button type="button" id="change-avatar-button" onClick={() => avatarUpload.current.click()}>
								Ändern
							</button>
						</figcaption>
						{avatar}
					</figure>
				</form>

				<h1>{company ? company.companyName : ""}</h1>
			</div>

			<div className="flex-helper row company-profile">
				{company ? <CDataEditorAbout company={company} /> : ""}
				{company ? <CDataEditorContact company={company} /> : ""}
			</div>

			<article className="company-article" id="company-profile-own-offers">
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
		</>
	)
}