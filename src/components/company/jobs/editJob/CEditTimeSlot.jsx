import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TimeInputModal from "../../../elements/Availability/TimeInputModal";
import { job_availability_error } from "../../../../redux/job/jobSlice";
import { getSlots } from "../../../elements/Availability/getSlots";

export default function CEditTimeSlots({ job, handleSubmitEdit }) {

	const [timeSlots, setTimeSlots] = useState([])
	const [availability, setAvailability] = useState(job.weeklyTimeSlots ? job.weeklyTimeSlots : [])
	const [showFromModal, setShowFromModal] = useState(false)
	const [showToModal, setShowToModal] = useState(false)

	const [dayToEdit, setDayToEdit] = useState(0)
	const [newAvailability, setNewAvail] = useState({
		beginn: "00:00",
		end: "00:00"
	})

	const dispatch = useDispatch()

	useEffect(() => {
		// set timeslots
		setTimeSlots(getSlots(availability))
		handleSubmitEdit("slots", availability);

		//eslint-disable-next-line
	}, [availability])

	useEffect(() => {
		//disable button at first render if availability is given
		let mo = false;
		job.weeklyTimeSlots.forEach(slot => {
			if(slot.day === 1){
				mo = true;
			}
		})

        if (mo || availability[0].day === 1) {
            let addButton = document.getElementById("add-button");
			if(addButton !== undefined){
				addButton.classList.add("disabled")
        }
	}
		//eslint-disable-next-line
    },[])

	let currentlySavedTimeslots
	if (timeSlots[dayToEdit] && timeSlots[dayToEdit].length !== 0) {
		currentlySavedTimeslots =
			timeSlots[dayToEdit].map((slot, i) => {
				return (
					<span key={i}>
						{slot.beginn} - {slot.end}
						<button className="delete-timeslot-button" onClick={e => handleDelete(e, slot._id)}>
							<i className="fa-solid fa-xmark"></i>
						</button>
					</span>
				)
			})
	} else {
		currentlySavedTimeslots = <p className="no-timeslots">Keine Kernarbeitzeiten hinterlegt</p>
	}

	const handleSubmit = (e, day, availObj) => {

		e.preventDefault()

		// check if availObj is correct
		if (availObj.beginn && availObj.end) {

			// send error if "--" has been selected
			if (availObj.beginn.includes("--") || availObj.end.includes("--")) return dispatch(job_availability_error("Bitte eine gültige Uhrzeit auswählen"))

			// send error if beginn is after end
			if (availObj.beginn > availObj.end) return dispatch(job_availability_error("Endzeit kann nicht vor dem Beginn sein"))

			// construct new availability object
			const newAvailObj = {
				day: day + 1,
				beginn: availObj.beginn,
				end: availObj.end
			}

			// push new availability to original availability
			setAvailability(current => [...current, newAvailObj]);

			//disable button after adding time slot
			let addButton = document.getElementById("add-button");
			addButton.classList.add("disabled")

		} else {
			// send error because beginn or end is missing
			return dispatch(job_availability_error("Anfangs- oder Endzeit ungültig"))
		}
	}

	const handleDelete = (e, slotID) => {

		e.preventDefault()

		setAvailability(previousAvailability =>
			previousAvailability.filter(slot => {
				return slot._id !== slotID
			}),
		)

		//enable button after removing time slot
		let addButton = document.getElementById("add-button");
		addButton.classList.remove("disabled")
	}

	const handleSwitch = (i) => {
		setDayToEdit(i);

		if (timeSlots[i].length === 0) {
			let addButton = document.getElementById("add-button");
			addButton.classList.remove("disabled")
		}
		else {
			let addButton = document.getElementById("add-button");
			addButton.classList.add("disabled")
		}
	}

	return (
		<>
			<article id="job-availability-editor">
				<div id="cae-header">
					<ul>
						{timeSlots.map((slot, i) => {
							return (
								<li key={i} className={`${timeSlots[i].length !== 0 ? 'has-timeslots' : ''} ${dayToEdit === i ? 'active' : ''}`}>
									<button onClick={() => handleSwitch(i)}>
										{(() => {
											switch (i) {
												case 0: return "Mo"
												case 1: return "Di"
												case 2: return "Mi"
												case 3: return "Do"
												case 4: return "Fr"
												case 5: return "Sa"
												case 6: return "So"
												default: return "Should not happen"
											}
										})()}
									</button>
								</li>
							)
						})}
					</ul>
				</div>

				<div id="cae-main">
					<div className="currently-saved-timeslots">
						{currentlySavedTimeslots}
					</div>
					<form className="job-availability-time-form" onSubmit={e => handleSubmit(e, dayToEdit, newAvailability)}>
						<p>Von</p>
						<input type="text" value={newAvailability.beginn} onClick={() => setShowFromModal(true)} readOnly />
						<TimeInputModal
							show={showFromModal}
							label="Von"
							saveHandler={(output) => setNewAvail({ ...newAvailability, beginn: output })}
							closeHandler={() => setShowFromModal(false)}
							defaultTime={newAvailability.beginn}
						/>
						<p>Bis</p>
						<input type="text" value={newAvailability.end} onClick={() => setShowToModal(true)} readOnly />
						<TimeInputModal
							show={showToModal}
							label="Bis"
							saveHandler={output => setNewAvail({ ...newAvailability, end: output })}
							closeHandler={() => setShowToModal(false)}
							defaultTime={newAvailability.end}
						/>

						<button id="add-button" className="button-secondary" type="submit" onClick={e => handleSubmit(e, dayToEdit, newAvailability)}>
							Hinzufügen
						</button>
					</form>
				</div>
			</article>
		</>
	)
}