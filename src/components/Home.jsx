import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export default function Home() {

	const userType = useSelector(state => state.authentication.user.type)

	return (
		<>
			{(() => {
				switch (userType) {

					case "admin":
						return <Navigate to="/admin/home" />
					case "student":
						return <Navigate to="/student/home" />
					case "company":
						return <Navigate to="/company/home" />
					default:
						return "Could not determine user type."
				}
			})()}
		</>
	)
}
