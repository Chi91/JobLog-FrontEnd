import { v4 as uuid } from "uuid"

export default function Checkbox({ value, label, selected, handleOnChange, ID }) {

	const uid = uuid()

	if (label) {
		return (
			<div className="custom-checkbox with-label">
				<input value={value} type="checkbox" id={`chb-${uid}`} checked={selected} onChange={handleOnChange} />
				<label htmlFor={`chb-${uid}`}>{label}</label>
			</div>
		)
	} else {
		return (
			<div className="custom-checkbox">
				<input value={value} type="checkbox" checked={selected} onChange={handleOnChange} id={`${ID}`} />
			</div>
		)
	}
}