import React from "react"

import AvailabilityDisplay from "../../elements/Availability/Display"

export default function CSPTimeSlots( {student} ) {

	let availability = student && student.availability ? student.availability : []

	return (
		<>
			<article id="availability" className="company-article">
				<header>
					<h2>Verfügbarkeit</h2>
				</header>

				<main id="week">
					<AvailabilityDisplay availability={availability} />
				</main>
			</article>
		</>
	)
}