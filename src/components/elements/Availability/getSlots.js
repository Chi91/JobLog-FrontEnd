
// helper function to turn availability into two dimensional sorted array
export function getSlots(availability) {

	if (availability && availability !== undefined && availability.length > 0) {

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

		return week
	}
}