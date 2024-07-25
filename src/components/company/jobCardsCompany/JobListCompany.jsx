import React from "react"
import JobCard from "./JobCardCompany"

export default function JobList({ jobs }) {

	return (
		<>
			{jobs.map((job, i) => {
				return <JobCard key={i} job={job} />
			})}
		</>
	)
}