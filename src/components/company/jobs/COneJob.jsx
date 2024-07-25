import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { getOwnJobs, getSingleJob } from "../../../redux/job/jobActions"
import { job_error, job_setAllOwnJobs, job_editJob } from "../../../redux/job/jobSlice"
import { deleteJob } from "../../../redux/job/jobActions"

import DeleteJobModal from "../jobCardsCompany/DeleteJobModal"
import CHardFacts from "./CHardFacts"
import CDescription from "./CDescription"
import CTags from "./CTags"
import CTimeSLots from "./CTimeSlots"
import CApplication from "./CApplication"


export default function COneJob() {

    const [searchParams] = useSearchParams()
    let jobID = searchParams.get("jobID")

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let job = useSelector(state => state.job.job)

    let company = useSelector(state => state.authentication.user)
    let accessToken = useSelector(state => state.authentication.accessToken)
    let ownJobs = useSelector(state => state.job.ownJobs)

    const [showModal, setShowModal] = useState(false)

    // get job
    useEffect(() => {
        getSingleJob(jobID)
        dispatch(job_editJob({
            editedJob: job
        }))
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        // set link in nav to active
        document.getElementById("link-to-jobs").classList.add("active")

        // remove active class from link when unmounting
        return () => {
            document.getElementById("link-to-jobs").classList.remove("active")
        }
    }, [])



    const showDeleteModal = e => {

        e.preventDefault()
        setShowModal(true)
    }

    const hideDeleteModal = e => {

        e.preventDefault()
        setShowModal(false)
    }

    const handleDelete = jobID => {

        deleteJob(accessToken, jobID, err => {
            if (err) return dispatch(job_error(err))

            let ownJobsCopy = ownJobs.filter(job => job.jobID !== jobID)
            dispatch(job_setAllOwnJobs({ ownJobs: ownJobsCopy }))
            setShowModal(false)
        })

        navigate(-1);
    }

    if (!jobID) {
        return <Navigate to="../jobs" />
    }

    const handleBackButton = () => {
        getOwnJobs(company.id)
        navigate(-1)
    }

    const backButton = <Link className="back-button" onClick={handleBackButton}>
        <i className="fa-solid fa-chevron-left" /> zurück
    </Link>

    return (
        <div id="company-job" company="company">
            <div className="job-view-header">
                {backButton}
                <div id="delete" onClick={showDeleteModal}>
                    <i className="fa-solid fa-trash-can" />
                </div>
            </div>

            <div id="title">
                <h2>{job ? job.jobTitle : ''}</h2>
            </div>
            <div id="description">
                <CDescription job={job} />
            </div>
            <div id="hardFacts">
                <CHardFacts job={job} />
            </div>
            <div id="tags">
                {<CTags />}
            </div>
            <div id="timeSlots">
                <CTimeSLots />
            </div>
            <div id="applications">
                <CApplication job={job} />
            </div>
            <DeleteJobModal show={showModal} handleClose={hideDeleteModal} handleDelete={handleDelete} jobID={jobID} jobTitle={job ? job.jobTitle : ""} />
        </div >
    )
}