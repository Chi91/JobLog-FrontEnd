import { v4 as uuid } from "uuid"

export default function SearchForm({ handleOnChange, padding = true, showFilter = false, isFiltered = false, toggleFilterOverlay = {} }) {

	const uid = uuid()

	return (
		<div className={`searchform ${!padding ? "no-padding" : ""}`}>

			<form onSubmit={e => e.preventDefault()}>
				<label htmlFor={`search-${uid}`}>Suche</label>
				<div className="search-container">
					<input id={`search-${uid}`} name="searchquery" placeholder="Suchbegriff" type="search" onChange={handleOnChange} />
					<i className="fa-solid fa-magnifying-glass"></i>
				</div>
			</form>

			{showFilter ? (
				<button type="button" className="searchform-filter-button" onClick={toggleFilterOverlay}>
					{isFiltered ? <i className="fa-solid fa-filter-circle-xmark"></i> : <i className="fa-solid fa-filter"></i>}
				</button>
			) : ""}
		</div>
	)
}