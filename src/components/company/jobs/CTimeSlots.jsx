import React, { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"

import { Link, useSearchParams } from "react-router-dom"

export default function CTimeSLots() {
	
	const [searchParams] = useSearchParams()
    const id = searchParams.get("jobID")

	let button =
		<Link to={`/company/jobs/jobEdit?jobID=${id}&site=4`} id="edit-button">
			<i className="fa-solid fa-pencil" />
		</Link>

	//eslint-disable-next-line
	let ownJobs = useSelector(state => state.job.ownJobs)
	let selectedJob;
	ownJobs.forEach(ownJob => {
		if(ownJob.jobID === id){
			selectedJob = ownJob
		}
	})
	let availability = selectedJob.weeklyTimeSlots

	const [timeSlots, setTimeSlots] = useState([])

	useEffect(() => {
		//set timeslots
		getSlots(availability)
		//eslint-disable-next-line
	}, [])

	const getSlots = (availability) => {

		if (availability !== undefined) {

			let monday = []
			let tuesday = []
			let wednesday = []
			let thursday = []
			let friday = []
			let saturday = []
			let sunday = []

			availability.forEach((entry => {
				switch (entry.day) {
					case 1:
						monday.push(entry)
						break;
					case 2:
						tuesday.push(entry)
						break;
					case 3:
						wednesday.push(entry)
						break;
					case 4:
						thursday.push(entry)
						break;
					case 5:
						friday.push(entry)
						break;
					case 6:
						saturday.push(entry)
						break;
					case 7:
						sunday.push(entry)
						break;
					default: break;
				}
			}))

			let week = [
				monday,
				tuesday,
				wednesday,
				thursday,
				friday,
				saturday,
				sunday
			]

			// sort arrays
			week.forEach(day => {
				// only do something if there are slots at this day
				if (day.length !== 0) {

					day.sort((a, b) => {
						if (a.beginn === b.beginn) {
							return 0;
						}
						else {
							return (a.beginn < b.beginn) ? -1 : 1;
						}
					})
				}
			})

			setTimeSlots(week)
		}
	}

	return (
		<>
			<article id="company-data-job-timeSlots" className="company-article">
				<header>
					<h2>Zeitslots</h2>
					{button}
				</header>

				<main>
					{timeSlots.map(day => {
						if (day.length !== 0) {
							return (

								day.map((slot, i) => {
									switch (slot.day) {
										case 1: return i === 0 ? <React.Fragment key={i}><p>Montag</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
										case 2: return i === 0 ? <React.Fragment key={i}><p>Dienstag</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
										case 3: return i === 0 ? <React.Fragment key={i}><p>Mittwoch</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
										case 4: return i === 0 ? <React.Fragment key={i}><p>Donnerstag</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
										case 5: return i === 0 ? <React.Fragment key={i}><p>Freitag</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
										case 6: return i === 0 ? <React.Fragment key={i}><p>Samstag</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
										case 7: return i === 0 ? <React.Fragment key={i}><p>Sonntag</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
										default: return <p>Keine Zeiten hinterlegt</p>
									}
								})
							)
						} else {
							return null
						}
					})}
				</main>
			</article>
		</>
	)
}