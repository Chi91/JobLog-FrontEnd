// redux
import { useDispatch, useSelector } from "react-redux"

// react router
import { Route, Routes } from "react-router-dom"

// components
import PublicHome from "./components/PublicHome"
import Home from "./components/Home"

import Forbidden from "./components/Forbidden"

import AdminHome from "./components/admin/AdminHome"

import Company from "./components/company/Company"
import CHome from "./components/company/CHome"
import CProfile from "./components/company/CProfile"
import CompanyStudentProfile from "./components/company/studentProfile/CompanyStudentProfile"
import COneJob from "./components/company/jobs/COneJob"
import CJobs from "./components/company/CJobs"
import CJobEdit from "./components/company/jobs/editJob/CJobEdit"
import CApplications from "./components/company/CApplications"

import Student from "./components/student/Student"
import SHome from "./components/student/SHome"
import SJobsOverview from "./components/student/jobs/SJobsOverview"
import SSingleJobView from "./components/student/jobs/SSingleJobView"
import SProfile from "./components/student/profile/SProfile"
import SApplications from "./components/student/SApplications"
import React from "react"
import { useEffect } from "react"
import Cookies from "universal-cookie"
import { repopulate_accessToken } from "./redux/authentication/authenticationSlice"

export default function App() {

	const accessToken = useSelector(state => state.authentication.accessToken)
	const dispatch = useDispatch()

	// look for rememberMe cookie
	useEffect(() => {
		const cookies = new Cookies()
		const rememberMeCookie = cookies.get("joblog-user-jwt")
		const userObjectCookie = cookies.get("joblog-user-object")
		const tempRememberMeCookie = cookies.get("joblog-temp-user-jwt")
		const tempUserObjectCookie = cookies.get("joblog-temp-user-obj")

		if(rememberMeCookie && userObjectCookie){

			dispatch(repopulate_accessToken({
				userObject: userObjectCookie,
				accessToken: rememberMeCookie
			}))
		} else if(tempRememberMeCookie && tempUserObjectCookie){
			dispatch(repopulate_accessToken({
				userObject: tempUserObjectCookie,
				accessToken: tempRememberMeCookie
			}))
		}
		//eslint-disable-next-line
	}, [])

	return (
		<>
			<Routes>
				<Route path="/" element={accessToken ? <Home /> : <PublicHome />} />
				<Route path="/admin/home" element={accessToken ? <AdminHome /> : <Forbidden />} />

				<Route path="/company" element={<Company />}>
					<Route index path="home" element={<CHome />} />
					<Route path="profile" element={<CProfile />} />
					<Route path="jobs" element={<CJobs />} />
					<Route path="jobs/joboffer" element={<COneJob />} />
					<Route path="jobs/jobEdit" element={<CJobEdit />} />

					<Route path="studentProfile" element={<CompanyStudentProfile />} />

					<Route path="applications" element={<CApplications />} />
				</Route>

				<Route path="/student" element={<Student />}>
					<Route index path="home" element={<SHome />} />

					<Route path="jobs" element={<SJobsOverview />} />
					<Route path="jobs/joboffer" element={<SSingleJobView />} />

					<Route path="applications" element={<SApplications />} />
					<Route path="profile" element={<SProfile />} />
				</Route>

				<Route path="*" element="404" />
			</Routes>
		</>
	)
}
