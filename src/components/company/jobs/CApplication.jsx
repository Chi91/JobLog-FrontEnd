import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import StudentList from "../studentCards/StudentList"

import { getApplicationsForJob } from "../../../redux/job/jobActions"
import { getStudentObject } from "../../../redux/student/studentActions"
import { useState } from "react"

export default function CApplication( {job} ) {

    const [searchParams] = useSearchParams()
    const id = searchParams.get("jobID")
    const accessToken = useSelector(state => state.authentication.accessToken)

    const [applicantsForThisJob, setApplicantsForThisJob] = useState([])

    useEffect(() => {
        getApplicationsForJob(id, accessToken, (err, applications) => {
            if (applications) {
                applications.forEach(application => {
                    getStudentObject(application.studentID, (err, student) => {
                        setApplicantsForThisJob(current => [...current, student])
                    })
                });
            }
        })
        //eslint-disable-next-line
    }, [id])

    return (
        <>
            <article id="company-data-job-application" className="company-article">
                <header>
                    <h2>Bewerbung</h2>
                </header>

                <main>
                    <StudentList students={applicantsForThisJob} />
                </main>
            </article>
        </>
    )
}