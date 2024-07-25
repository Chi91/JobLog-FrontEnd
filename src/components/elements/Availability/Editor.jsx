import { useEffect, useState } from "react"
import TimeInputModal from "./TimeInputModal"
import { getSlots } from "./getSlots"
import AvailabilityDisplay from "./Display"

export default function AvailabilityEditor({ availability, onSaveHandler, deleteHandler, label, classes, id }) {

	const [dayToEdit, setDayToEdit] = useState(0)
	const [timeslots, setTimeslots] = useState([])
	const [editMode, setEditMode] = useState(false)
	const [times, setTimes] = useState({
		beginn: "00:00",
		end: "00:00"
	})
	const [showFromModal, setShowFromModal] = useState(false)
	const [showToModal, setShowToModal] = useState(false)

	useEffect(() => {
		if (availability && availability.length !== 0) {
			setTimeslots(getSlots(availability))
		}
	}, [availability])

	const handleSave = () => {
		onSaveHandler({
			day: dayToEdit + 1,
			beginn: times.beginn,
			end: times.end
		})
	}

	let currentlySavedTimeslots
		if (timeslots[dayToEdit] && timeslots[dayToEdit].length !== 0) {
			currentlySavedTimeslots =
				timeslots[dayToEdit].map((slot, i) => {
					return (
						<span key={i}>
							{slot.beginn} - {slot.end}
							<button className="delete-timeslot-button" onClick={() => deleteHandler(slot._id)}>
								<i className="fa-solid fa-xmark"></i>
							</button>
						</span>
					)
				})
	} else {
		currentlySavedTimeslots = <p className="no-timeslots">Keine Zeiten hinterlegt</p>
	}

	return (
		<article
			{...id ? id = { id } : ""}
			className={(classes ? classes : "") + (editMode ? " edit-mode" : "")}
		>
			<header>
				<p>{label ? label : "Verfügbarkeiten"}</p>
				<button className="student-edit-button" onClick={() => setEditMode(!editMode)}>
					{editMode ? <i className="fa-regular fa-floppy-disk"></i> : <i className="fa-solid fa-pencil"></i>}
				</button>
			</header>
			<main>
				{editMode ? (
					<div className="availability-editor">
						<ul>
							{timeslots.map((slot, i) => {
								return (
									<li key={i} className={`${timeslots[i].length !== 0 ? 'has-timeslots' : ''} ${dayToEdit === i ? 'active' : ''}`}>
										<button onClick={() => setDayToEdit(i)}>
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

						<div className="availability-editor-body">

							<div className="currently-saved-timeslots">
								{currentlySavedTimeslots}
							</div>

							<form onSubmit={onSaveHandler}>
								<p>Von</p>
								<input type="text" value={times.beginn} onClick={() => setShowFromModal(true)} readOnly />
								<TimeInputModal
									show={showFromModal}
									label="Von"
									saveHandler={(output) => setTimes({ ...times, beginn: output })}
									closeHandler={() => setShowFromModal(false)}
									defaultTime={times.beginn}
								/>
								<p>Bis</p>
								<input type="text" value={times.end} onClick={() => setShowToModal(true)} readOnly />
								<TimeInputModal
									show={showToModal}
									label="Bis"
									saveHandler={output => setTimes({ ...times, end: output })}
									closeHandler={() => setShowToModal(false)}
									defaultTime={times.end}
								/>

								<button className="button-secondary" type="button" onClick={handleSave}>
									Hinzufügen
								</button>
								<button id="additional-save-button" className="button-primary" onClick={() => setEditMode(!editMode)}>Speichern</button>
							</form>
						</div>
					</div>
				) : (
					<AvailabilityDisplay availability={availability} />
				)}
			</main>
		</article>
	)
}