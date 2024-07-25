import SearchForm from "../elements/SearchForm"

export default function Section({ className = "", id = "", label, searchform = false, searchChangeHandler = null, buttonIcon = null, clickHandler = null, children }) {

	return (
		<section className={`data-container ${className}`} id={id}>
			<header>
				<h2>{label}</h2>

				{searchform ? <SearchForm padding={false} handleOnChange={searchChangeHandler} /> : ""}

				{buttonIcon ? (
					<button type="button" onClick={clickHandler}>
						{buttonIcon}
					</button>
				) : ""}
			</header>

			<div className="data-container-body">
				{children}
			</div>
		</section>
	)
}