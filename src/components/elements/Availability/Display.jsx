import React, { useState } from "react"
import { useEffect } from "react"
import { getSlots } from "./getSlots"

export default function AvailabilityDisplay({ availability }) {

	const [timeslots, setTimeslots] = useState([])

	useEffect(() => {
		if (availability && availability.length !== 0) {
			setTimeslots(getSlots(availability))
		}
	}, [availability])

	if (timeslots.length !== 0) {
		return (
			<div className="availability-display">
				{timeslots.map(day => {
					if (day.length !== 0) {
						return (

							day.map((slot, i) => {
								switch (slot.day) {
									case 1: return i === 0 ? <React.Fragment key={i}><p>Mo</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
									case 2: return i === 0 ? <React.Fragment key={i}><p>Di</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
									case 3: return i === 0 ? <React.Fragment key={i}><p>Mi</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
									case 4: return i === 0 ? <React.Fragment key={i}><p>Do</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
									case 5: return i === 0 ? <React.Fragment key={i}><p>Fr</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
									case 6: return i === 0 ? <React.Fragment key={i}><p>Sa</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
									case 7: return i === 0 ? <React.Fragment key={i}><p>So</p><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment> : <React.Fragment key={i}><p className="timeslot">{slot.beginn} - {slot.end}</p></React.Fragment>
									default: return <p>Keine Zeiten hinterlegt</p>
								}
							})
						)
					} else {
						return null
					}
				})}
			</div>
		)
	} else {
		return <p>Keine Zeiten hinterlegt</p>
	}
}