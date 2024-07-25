import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import React from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { job_editJob } from "../../../../redux/job/jobSlice"

import { job_show_delete_modal } from "../../../../redux/job/jobSlice"
import { updateJob, createJob, getOwnJobs } from "../../../../redux/job/jobActions"
import CEditDescription from "./CEditDescription"
import CEditHardfacts from "./CEditHardfacts"
import CEditTags from "./CEditTags"
import CEditTimeSlots from "./CEditTimeSlot"

export default function CJobEdit() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let job = useSelector(state => state.job.job)
    let accessToken = useSelector(state => state.authentication.accessToken)
    let editedJob = useSelector(state => state.job.editedJob)
    let user = useSelector(state => state.authentication.user)

    const [showBackModalBool, setShowBackModalBool] = useState(false)

    let localJob = {
        jobID: job ? job.jobID : "",
        jobTitle: editedJob ? editedJob.jobTitle : job.jobTitle,
        jobSummary: editedJob ? editedJob.jobSummary : job.jobSummary,
        jobType: editedJob ? editedJob.jobType : job.jobType,
        tagList: editedJob ? editedJob.tagList : job.tagList,
        salaryPerHour: editedJob ? editedJob.salaryPerHour : job.salaryPerHour,
        vacation: editedJob ? editedJob.vacation : job.vacation,
        weeklyHours: editedJob ? editedJob.weeklyHours : job.weeklyHours,
        weeklyTimeSlots: editedJob ? editedJob.weeklyTimeSlots : job.weeklyTimeSlots,
        benefits: editedJob ? editedJob.benefits : job.benefits,
        fieldIDs: editedJob ? editedJob.fieldIDs : job.fieldIDs,
        courseIDs : editedJob ? editedJob.courseIDs : job.courseIDs
    };

    useEffect(() => {
        dispatch(job_editJob({
            editedJob: localJob
        }))
    //eslint-disable-next-line
    },[])

    const showDeleteModal = e => {

        e.preventDefault()

        dispatch(job_show_delete_modal())
    }

    //Set first active content - get query from url
    const [searchParams] = useSearchParams()
    const queryForPage = searchParams.get("site")
    let number = 1;

    if (queryForPage) {
        number = queryForPage
    }

    const [activeContent, setActiveContent] = useState(parseInt(number));

    //use arrows to navigate through the edit view
    const nextContent = e => {
        e.preventDefault()

        //save changes in global state job.editedJob
        dispatch(job_editJob({
            editedJob: localJob
        }))

        setActiveContent(activeContent === 4 ? 1 : activeContent + 1)
    }
    const prevContent = e => {
        e.preventDefault()

        //save changes in global state job.editedJob
        dispatch(job_editJob({
            editedJob: localJob
        }))

        setActiveContent(activeContent === 1 ? 4 : activeContent - 1)
    }

    //if given jobID = null -> create job mode, else edit mode
    const editFlag = searchParams.get("jobID")
    let isEditMode = editFlag === "new" ? false : true;

    //Submit (Create or Update) job
    let handleSubmit = (e) => {
        if (isEditMode) {
            localJob.jobTitle = document.getElementById("job-title").value

            //save changes in global state job.editedJob
            dispatch(job_editJob({
                editedJob: localJob
            }))

            let jobID;
            if(job.jobID === undefined){
                jobID = job._id;
            }
            else{
                jobID = job.jobID;
            }
            updateJob(localJob, jobID, accessToken)
        }
        else {
            //save changes in global state job.editedJob
            dispatch(job_editJob({
                editedJob: localJob
            }))

            createJob(localJob, accessToken, user.id, user.name)
        }

        e.preventDefault();
    }

    //Submit job and move back to preveous page
    let handleSubmitAndBack = e => {

        localJob.jobTitle = document.getElementById("job-title").value

        if (isEditMode) {
            //save changes in global state job.editedJob
            dispatch(job_editJob({
                editedJob: localJob
            }))

            let jobID;
            if(job.jobID === undefined){
                jobID = job._id;
            }
            else{
                jobID = job.jobID;
            }
            updateJob(localJob, jobID, accessToken)
        }
        else {
            //save changes in global state job.editedJob
            dispatch(job_editJob({
                editedJob: localJob
            }))


            createJob(localJob, accessToken)
        }

        e.preventDefault();

        dispatch(job_editJob({
            editedJob: {}
        }))
        navigate(-1)
    }

    const handleChange = (name, context) => {

        switch (name) {
            case "description":
                localJob.jobSummary = context;
                break;
            case "facts":
                localJob.jobType = context.type;
                localJob.weeklyHours = parseInt(context.weeklyHours);
                localJob.salaryPerHour = parseInt(context.salary);
                localJob.vacation = parseInt(context.vacation);
                localJob.benefits = context.benefits;
                localJob.fieldIDs = context.fieldIDs;
                localJob.courseIDs = context.courseIDs;
                break;
            case "facts-fields":
                localJob.fieldIDs = context;
                break;
            case "facts-courses":
                localJob.courseIDs = context;
                break;
            case "tags":
                localJob.tagList = context;
                break;
            case "slots":
                localJob.weeklyTimeSlots = context;
                break;
            case "title":
                localJob.jobTitle = document.getElementById("job-title").value;
                break;
            default:
                console.log("Should not happen")
        }
    }

    const handleTitleChange = e => {
        localJob.jobTitle = e.target.value
    }

    let content;
    switch (activeContent) {
        case 1:
            content = <CEditDescription job={editedJob ? editedJob : localJob} handleSubmitEdit={handleChange} />
            break;
        case 2:
            content = <CEditHardfacts job={editedJob ? editedJob : localJob} handleSubmitEdit={handleChange} />
            break;
        case 3:
            content = <CEditTags job={editedJob ? editedJob : localJob} handleSubmitEdit={handleChange} />
            break;
        case 4:
            content = <CEditTimeSlots job={editedJob ? editedJob : localJob} handleSubmitEdit={handleChange} />
            break;
        default:
            content = '';
            break;
    }

    const handleMove = (e, string) => {

        let target;
        if(string === "back"){
            target = string;
        }
        else{
            target = e.target.id
        }

        switch (target) {
            case "description-content":
                setActiveContent(1)
                break;
            case "hardfacts-content":
                setActiveContent(2)
                break;
            case "tags-content":
                setActiveContent(3)
                break;
            case "timeSlots-content":
                setActiveContent(4)
                break;
            case "back":
                getOwnJobs(user.id)
                dispatch(job_editJob({
                    editedJob: {}
                }))
                navigate(-1)
                break;
            default:
                console.log("Should not happen")
        }

        dispatch(job_editJob({
            editedJob: localJob
        }))
    }

    const showBackModal = e => {
        e.preventDefault();
        setShowBackModalBool(true)
    }

    const hideBackModal = e => {
        e.preventDefault();
        setShowBackModalBool(false)
    }

    let backModal;
    if(showBackModalBool){
        backModal = <div className={`modal-company-background ${showBackModal ? "modal-open" : "modal-closed"} delete-job-modal`} onClick={hideBackModal}>
        <div id="modal-container-company" onClick={e => e.stopPropagation()}>

            <button id="modal-close-button" onClick={hideBackModal}>
                <i className="fa-solid fa-xmark"></i>
            </button>

            <div id="modal-main-company">
                <div id="flexHelper">
                    <p id="text">
                        Sind Sie sicher?
                        Alle eingegebenen Daten gehen verloren.
                    </p>
                    <button id="back"className="button-primary" type="submit" onClick={(e) => handleMove(e,"back")}>
                        Ja
                    </button>
                    <button className="button-secondary" type="reset" id="cancel-button" onClick={hideBackModal}>
                        Nein
                    </button>

                </div>
            </div>
        </div>
    </div>
    }

    return (
        <>
            <div id="company-job-edit">
                <div id="job-edit-header">
                    <Link id="back" className="back-button" onClick={showBackModal}>
                        <i className="fa-solid fa-chevron-left"></i> zurück
                    </Link>
                    <div id="delete" onClick={showDeleteModal}>
                        <i className="fa-solid fa-trash-can" />
                    </div>
                    <header>
                        <label htmlFor="job-title"> Jobtitel </label>
                        <input id="job-title" defaultValue={editedJob ? editedJob.jobTitle : localJob.jobTitle} onChange={handleTitleChange} placeholder="Enter Job Title" />
                    </header>
                </div>
                <div id="job-edit-sections">
                    <ul>
                        <li id="description-content" className={activeContent === 1 ? 'active' : ''} onClick={handleMove}>Beschreibung</li>
                        <li id="hardfacts-content" className={activeContent === 2 ? 'active' : ''} onClick={handleMove}>Hardfacts</li>
                        <li id="tags-content" className={activeContent === 3 ? 'active' : ''} onClick={handleMove}>Tags</li>
                        <li id="timeSlots-content" className={activeContent === 4 ? 'active' : ''} onClick={handleMove}>Zeitslots</li>
                    </ul>
                </div>
                <div id="job-edit-content">
                    <i id="arrow-left" className="fa-solid fa-angle-left control" onClick={prevContent} />
                    <section> {content} </section>
                    <i id="arrow-right" className="fa-solid fa-angle-right control" onClick={nextContent} />
                    {/* No redirect | redirect */}
                    {isEditMode ? <button className="button-primary" onClick={handleSubmit}>Speichern</button> : <button className="button-primary" onClick={handleSubmitAndBack}>Speichern</button>}
                    {/* Save & Back |  Abort*/}
                    {isEditMode ? <button className="button-secondary" onClick={handleSubmitAndBack}>Speichern und zurück</button> : <button className="button-secondary" onClick={showBackModal}>Abbrechen</button>}
                    
                </div>

                {backModal}
                
            </div>
        </>
    )
}
