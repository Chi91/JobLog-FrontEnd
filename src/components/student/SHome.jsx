import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import SearchForm from "../elements/SearchForm"
import FilterOverlay from "./jobs/FilterOverlay"
import Jobcard from "./jobs/Jobcard"
import { getJobsWithFilter } from "../../redux/job/jobActions"

export default function SHome() {

	const allJobs = useSelector(state => state.job.allJobs)
	const prefilteredJobs = useSelector(state => state.job.prefilteredJobs)
	const [searchQuery, setSearchQuery] = useState("")
	const studentID = useSelector(state => state.student.singleStudent?.studentID)
	const globalSearchFilter = useSelector(state => state.data.searchFilter)
	const [showFilterOverlay, setShowFilterOverlay] = useState(false)
	const [filtered, setFiltered] = useState(
		globalSearchFilter.timeMatch ||
		globalSearchFilter.courseIDs?.length > 0 ||
		globalSearchFilter.fieldIDs?.length > 0
	)
	const [preload, setPreload] = useState(true)
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		// set link in nav to active
		document.getElementById("link-to-home").classList.add("active")

		// remove active class from link when unmounting
		return () => {
			document.getElementById("link-to-home").classList.remove("active")
		}
	})

	// prevent animations on pageload
	useEffect(() => {
		setTimeout(() => {
			setPreload(false)
		}, 600)
	}, [])

	// update shown jobs based on searchparams
	useEffect(() => {

		const timeMatch = searchParams.get("timeMatch")
		const courseIDs = searchParams.get("courseIDs")
		const fieldIDs = searchParams.get("fieldIDs")

		if (!timeMatch && !courseIDs && !fieldIDs) return

		let urlFilter = {}
		if (timeMatch) urlFilter.studentID = studentID
		if (courseIDs) urlFilter.course = courseIDs
		if (fieldIDs) urlFilter.field = fieldIDs

		getJobsWithFilter(urlFilter)
	}, [searchParams, studentID])

	const handleFilterOverlay = () => {
		if (!showFilterOverlay) {
			setShowFilterOverlay(true)
		} else {

			setFiltered(globalSearchFilter.timeMatch || globalSearchFilter.courseIDs?.length !== 0 || globalSearchFilter.fieldIDs?.length > 0)

			// set searchfilters in URL hence issuing db request
			let helper = {}

			for (const [key, value] of Object.entries(globalSearchFilter)) {
				if (!value || (Array.isArray(value) && value.length === 0)) continue

				if (Array.isArray(value)) {
					let stringValue = value.toString()
					helper[key] = stringValue
				} else {
					helper[key] = value
				}
			}

			setSearchParams(helper)
			setShowFilterOverlay(false)
		}
	}

	let jobLoop
	if (filtered && prefilteredJobs.length !== 0) {
		jobLoop = prefilteredJobs.filter(job => {
			if (searchQuery === "") return job
			return job.jobTitle.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
		}).map((job, i) => {
			return <Jobcard key={i} job={job} />
		})
	} else if (filtered && prefilteredJobs.length === 0) {
		jobLoop = <p>Mit den eingestellten Filtern wurden keine passenden Jobs gefunden.</p>
	} else {
		jobLoop = allJobs.filter(job => {
			if (searchQuery === "") return job
			return job.jobTitle.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
		}).map((job, i) => {
			return <Jobcard key={i} job={job} />
		})
	}

	return (
		<>
			<SearchForm
				handleOnChange={e => setSearchQuery(e.target.value)}
				showFilter={true}
				isFiltered={filtered}
				toggleFilterOverlay={handleFilterOverlay}
			/>
			<FilterOverlay
				preload={preload}
				show={showFilterOverlay}
				handleFilter={handleFilterOverlay}
			/>

			<article id="student-recent-searches" className="student-article">
				<header>
					<h2>Meine Suchen</h2>
					<form>
						<button className="student-plus-button" onClick={e => e.preventDefault()}>
							<i className="fa-solid fa-floppy-disk"></i>
						</button>
					</form>
				</header>
				<main>
					{jobLoop}
				</main>
			</article>
		</>
	)
}