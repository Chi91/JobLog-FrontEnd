import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { data_reset_filter, data_set_filter } from "../../../redux/data/dataSlice"
import Checkbox from "../../elements/Checkbox"

export default function FilterOverlay({ preload, show, handleFilter, handleClose }) {

	const courses = useSelector(state => state.data.courses)
	const fields = useSelector(state => state.data.fields)
	const globalSearchFilter = useSelector(state => state.data.searchFilter)
	const dispatch = useDispatch()

	const [content, setContent] = useState("")
	const initialLocalFilter = {
		timeMatch: false,
		courseIDs: [],
		fieldIDs: []
	}
	const [localFilter, setLocalFilter] = useState(
		globalSearchFilter.timeMatch ||
			globalSearchFilter.courseIDs?.length > 0 ||
			globalSearchFilter.fieldIDs?.length > 0 ? globalSearchFilter : initialLocalFilter
	)

	// reset content state when sliding in filter
	useEffect(() => {
		if (!show) setTimeout(() => {
			setContent("")
		}, 1000)
	}, [show])

	// update redux when local filter changes
	useEffect(() => {
		dispatch(data_set_filter(localFilter))
	}, [localFilter, dispatch])

	const handleChangeChb = (e, origin) => {
		const value = e.target.value
		let selectionCopy
		let target
		if (origin === "courses") {
			selectionCopy = [...localFilter.courseIDs]
			target = "courseIDs"
		}
		if (origin === "fields") {
			selectionCopy = [...localFilter.fieldIDs]
			target = "fieldIDs"
		}

		let index = selectionCopy.indexOf(value)

		if (index > -1) {
			selectionCopy.splice(index, 1)
		} else {
			selectionCopy.push(value)
		}

		setLocalFilter({ ...localFilter, [target]: selectionCopy })
	}

	const deleteSectedOption = (e, origin, value) => {
		let selectionCopy
		let target
		if (origin === "courses") {
			selectionCopy = [...localFilter.courseIDs]
			target = "courseIDs"
		}
		if (origin === "fields") {
			selectionCopy = [...localFilter.fieldIDs]
			target = "fieldIDs"
		}

		let index = selectionCopy.indexOf(value)

		if (index > -1) {
			selectionCopy.splice(index, 1)
		}

		setLocalFilter({ ...localFilter, [target]: selectionCopy })
	}

	const resetFilter = () => {
		// reset local filter
		setLocalFilter(initialLocalFilter)
		// reset global filter
		dispatch(data_reset_filter())
	}

	let bodyContent
	switch (content) {
		default:
			bodyContent = (
				<>
					<div className="select-timematch">
						Timematch
						<Checkbox value="timematch" selected={localFilter.timeMatch} handleOnChange={e => setLocalFilter({ ...localFilter, timeMatch: e.target.checked })} />
					</div>

					<div className="select-course">
						<button onClick={() => setContent("courses")}>
							Studiengang
							<i className="fa-solid fa-chevron-right"></i>
						</button>

						{localFilter.courseIDs.length !== 0 ? (
							<div className="selected-options">
								{localFilter.courseIDs.map((course, i) => {
									return (
										<div key={i} className="selected-option">
											<span>{course}</span>
											<button className="delete-option-button" onClick={e => deleteSectedOption(e, "courses", course)}>
												<i className="fa-solid fa-xmark"></i>
											</button>
										</div>
									)
								})}
							</div>
						) : ""}
					</div>

					<div className="select-field">
						<button onClick={() => setContent("fields")}>
							Fachbereich
							<i className="fa-solid fa-chevron-right"></i>
						</button>

						{localFilter.fieldIDs.length !== 0 ? (
							<div className="selected-options">
								{localFilter.fieldIDs.map((field, i) => {
									return (
										<div key={i} className="selected-option">
											<span>{field}</span>
											<button className="delete-option-button" onClick={e => deleteSectedOption(e, "fields", field)}>
												<i className="fa-solid fa-xmark"></i>
											</button>
										</div>
									)
								})}
							</div>
						) : ""}
					</div>
				</>
			)
			break;
		case "courses":
			bodyContent = (
				<>
					<button className="filteroverlay-back" onClick={() => setContent("overview")}>
						<i className="fa-solid fa-chevron-left"></i>
						Studiengang
					</button>
					<ul>
						{courses.map((course, i) => {
							return (
								<li key={`course-${i}`}>
									<Checkbox value={course.value} label={course.label} selected={globalSearchFilter.courseIDs?.includes(course.value)} handleOnChange={e => handleChangeChb(e, "courses")} />
								</li>
							)
						})}
					</ul>
				</>
			)
			break;
		case "fields":
			bodyContent = (
				<>
					<button className="filteroverlay-back" onClick={() => setContent("overview")}>
						<i className="fa-solid fa-chevron-left"></i>
						Fachbereich
					</button>
					<ul>
						{fields.map((field, i) => {
							return (
								<li key={`field-${i}`}>
									<Checkbox value={field.value} label={field.label} selected={globalSearchFilter.fieldIDs?.includes(field.value)} handleOnChange={e => handleChangeChb(e, "fields")} />
								</li>
							)
						})}
					</ul>
				</>
			)
			break;
	}

	return (
		<div className={`filter-overlay-background ${show ? "open" : "closed"} ${preload ? "preload" : ""}`}>
			<div className="filter-overlay-body" onClick={e => e.stopPropagation()}>

				{bodyContent}

				<div className="set-filter-container">
					<button className="button-secondary" onClick={resetFilter}>
						zurücksetzen
					</button>
					<button className="button-primary" onClick={handleFilter}>
						Filter anwenden
					</button>
				</div>
			</div>
		</div>
	)
}