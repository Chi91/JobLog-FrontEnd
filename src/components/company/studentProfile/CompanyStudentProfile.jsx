import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { getSingleStudent } from "../../../redux/student/studentActions"
import TimeSlots from "./CSPTimeSlots"
import Documents from "./CSPDocuments"
import Contact from "./CSPContact"
import { getApplicationsForJob } from "../../../redux/job/jobActions"

export default function CompanyStudentProfile() {

	const [searchParams] = useSearchParams()
	let student = useSelector(state => state.student.singleStudent)
	let accessToken = useSelector(state => state.authentication.accessToken)
	let ownJobs = useSelector(state => state.job.ownJobs)

	let studentID = searchParams.get("studentID")

	const [documentsForStudent, setDocumentsForStudent] = useState([]);

	let navigate = useNavigate();

	useEffect(() => {

		// set link in nav to active
		document.getElementById("link-to-profile").classList.add("active")

		// remove active class from link when unmounting
		return () => {
			document.getElementById("link-to-profile").classList.remove("active")
		}
	}, [])

	useEffect(() => {
		ownJobs.forEach(ownjob => {
			getApplicationsForJob(ownjob.jobID, accessToken, (err, applications) => {
				if (applications) {
					applications.forEach(application => {
						if (application.studentID === student.studentID && application.jobID === ownjob.jobID && applications.length !== 0) {
							if (application.visibleDocuments.length > 0) {
								application.visibleDocuments.forEach(document => {
									console.log(document)
									setDocumentsForStudent(documentsForStudent => [...documentsForStudent, document])
								})
							}
						}
					});
				}
			})
		})
		//eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (studentID) {
			getSingleStudent(studentID)
		}
		else {
			getSingleStudent(student.studentID)
		}
		//eslint-disable-next-line
	}, [studentID])

	if (!studentID) {
		return <Navigate to="../home" />
	}

	let avatar
	const profilePic = student?.profilPic
	const picData = profilePic?.data
	if (profilePic && picData) {
		avatar = (
			<img alt="Profilbild" src={`data:${profilePic.mimetype};base64,${picData}`} />
		)
	} else {
		avatar = (
			<span className="fa-stack fa-lg">
				<i className="fa fa-circle fa-stack-2x" />
				<i className="fa-solid fa-building txt-clr fa-stack-1x" />
			</span>
		)
	}

	const backButton = <Link className="back-button" onClick={() => navigate(-1)}>
		<i className="fa-solid fa-chevron-left" /> zurück
	</Link>

	return (
		<div id="company-student-profile" className="company">
			{backButton}
			<div id="profile-wrap">
				<div id="profile-pic">
					<figure>{avatar}</figure>
				</div>
				<div id="name">
					<h1>{student ? student.firstname + " " + student.lastname : ''}</h1>
				</div>
				<div id="course">
					<h2>{student ? student.courseID : ''}</h2>
				</div>
			</div>
			<TimeSlots student={student} />
			<Documents documents={documentsForStudent} fileStorage={student.fileStorage} studentFirstName={student.firstname} studentLastName={student.lastname} />
			<Contact student={student} />
		</div>
	)
}