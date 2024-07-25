export default function RegisterSelect(props) {

	return (
		<div className="flex-helper">
			<button className="register-select-link" onClick={() => props.changeContent("register-student")}>
				{/*<img alt="Als Student registrieren" src={studentIcon} />*/}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.05 24.05">
					<g id="Student">
						<polyline points="5.63 9.12 4.55 8.77 1.52 7.79 12.02 4.41 22.52 7.79 19.5 8.77 12.02 11.17" />
						<path d="M19.5,11.92v5.22c0,1.39-3.35,2.5-7.48,2.5s-7.48-1.11-7.48-2.5v-5.22" />
						<polyline points="7.82 15.7 7.82 10.13 12.02 8.35" />
					</g>
				</svg>
				Student
			</button>
			<button className="register-select-link" onClick={() => props.changeContent("register-company")}>
				{/*<img alt="Als Firma registrieren" src={companyIcon} />*/}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.05 24.05">
					<path d="M6.02,22.02H3.53c-.82,0-1.5-.67-1.5-1.5V3.53c0-.83,.67-1.5,1.5-1.5H14.53c.83,0,1.5,.68,1.5,1.5v2.5" />
					<path d="M22.02,10.52v10c0,.83-.68,1.5-1.5,1.5h-3.5V14.02h-4v8h-3.5c-.82,0-1.5-.67-1.5-1.5V10.52c0-.82,.67-1.5,1.5-1.5h11c.83,0,1.5,.68,1.5,1.5Z" />
				</svg>
				Firma
			</button>
		</div>
	)
}