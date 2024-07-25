import { useState, useEffect, useRef } from "react"
import { format } from "date-fns"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ClockPicker, LocalizationProvider } from "@mui/x-date-pickers"
import { parse } from "date-fns/esm"
import Modal from "../Modal"

export default function TimeInputModal({ show, saveHandler, closeHandler, defaultTime = "00:00" }) {

	const defaultTimeSplit = defaultTime.split(":")
	const userChangedTime = useRef(false)

	const [clockView, setClockView] = useState("hours")
	const [date, setDate] = useState(parse(defaultTime, "HH:mm", new Date()))
	const [time, setTime] = useState({
		hours: defaultTimeSplit[0],
		minutes: defaultTimeSplit[1]
	})
	const [errors, setErrors] = useState({
		hours: null,
		minutes: null
	})

	useEffect(() => {
		if (clockView === "minutes") setClockView("hours")

		setTime({
			hours: defaultTimeSplit[0],
			minutes: defaultTimeSplit[1]
		})

		//eslint-disable-next-line
	}, [show])

	const validateManualInputs = callback => {

		let hoursCorrect = false
		let minutesCorrect = false

		if (!(0 <= time.hours <= 24)) {
			// hours not correct
			hoursCorrect = false
			setErrors({ ...errors, hours: "Bitte gib einen Wert für die Stunde zwischen 0 und 23 ein." })
		} else {
			hoursCorrect = true
			setErrors({...errors, hours: null})
		}

		if (!(0 <= time.minutes <= 59 && time.minutes % 15 === 0)) {
			// minutes not correct
			minutesCorrect = false
			setErrors({ ...errors, minutes: "Bitte gib für die Minuten nur 0, 15, 30 oder 45 an." })
		} else {
			minutesCorrect = true
			setErrors({...errors, minutes: null})
		}

		if(hoursCorrect && minutesCorrect) callback()
	}

	const handleSave = e => {

		e.preventDefault()

		validateManualInputs(() => {
			saveHandler(time.hours + ":" + time.minutes)
			userChangedTime.current = true
			closeHandler()
		})
	}

	const handleClockChange = newTime => {

		setDate(newTime)

		setTime({
			hours: format(newTime, "HH"),
			minutes: format(newTime, "mm")
		})

		if (clockView === "hours") setClockView("minutes")
	}

	const handleManualChange = e => {

		const name = e.target.name
		const value = Number(e.target.value)

		if (!isNaN(value)) {

			if (name === "hours" && (value >= 0 && value <= 23)) {
				setTime({ ...time, hours: value })
				setDate(parse(value + ":" + time.minutes, "HH:mm", new Date()))
			} else if (name === "minutes" && (value >= 0 && value <= 59)) {
				setTime({ ...time, minutes: value })
				setDate(parse(time.hours + ":" + value, "HH:mm", new Date()))
			}
		}
	}

	return (
		<Modal show={show} classes="time-input-modal" label="Uhrzeit wählen" saveHandler={handleSave} closeHandler={closeHandler}>
			<div className="manual-time-input">
				<input className={errors.hours ? "error" : ""} type="number" value={time.hours} min="0" max="23" name="hours" onChange={handleManualChange} onFocus={() => setClockView("hours")} />
				<p>:</p>
				<input className={errors.minutes ? "error" : ""} type="number" value={time.minutes} min="0" max="59" step="15" name="minutes" onChange={handleManualChange} onFocus={() => setClockView("minutes")} />
			</div>

			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<ClockPicker view={clockView} date={date} minutesStep={15} onChange={newTime => handleClockChange(newTime)} />
			</LocalizationProvider>
		</Modal>
	)
}