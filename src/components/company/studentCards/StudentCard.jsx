import { Link } from "react-router-dom"
import store from '../../../redux/store'
import * as studentSlice from "../../../redux/student/studentSlice"


function StudentCard({ k, student }) {

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
                <i className="fa-solid fa-user txt-clr fa-stack-1x" />
            </span>
        )
    }

    const availableTime = getTime(student)

    const handleMove = e => {
        store.dispatch(studentSlice.student_setSingleStudent({
            singleStudent: student
        }))
    }

    return (
        <>
            <Link to={`/company/studentProfile?studentID=${student.studentID}`} onClick={handleMove}>
                <div key={k} id={"StudentItem" + student.studentID} className="student-card-company-home">

                    <div id="name">
                        <h2>{student.firstname}<br /> {student.lastname}</h2>
                    </div>
                    <div id="course">
                        {student.courseID}
                    </div>
                    <div id="profile-pic">
                        <figure>{avatar}</figure>
                    </div>
                    <div id="availableTime">
                        <i className="fa-regular fa-clock" />
                        <span>
                            {availableTime}
                        </span>
                    </div>

                    <div id="more-info">
                        Mehr Info
                    </div>

                </div>
            </Link>
        </>
    )
}

function getTime(student) {

    let available = student.availability
    let timeCountHour = 0;
    let timeCountMin = 0;

    available.forEach(entry => {
        let startHour = parseInt(entry.beginn.split(":")[0])
        let startMin = parseInt(entry.beginn.split(":")[1])

        let endHour = parseInt(entry.end.split(":")[0])
        let endMin = parseInt(entry.end.split(":")[1])

        let diffHour = endHour - startHour
        let diffMin = endMin - startMin
        timeCountMin += diffMin
        timeCountHour += diffHour
    });

    if (timeCountMin < 0) timeCountHour--;

    return timeCountHour.toString() + "h " + Math.abs(timeCountMin).toString() + "min";
}

export default StudentCard