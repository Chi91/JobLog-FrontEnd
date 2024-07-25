import React from "react"
import StudentCard from "./StudentCard"

function StudentList({ students }) {

    
    let studentList = Object.values(students)

    if(studentList === undefined){
        return(
            <div>Loading...</div>
        )
    }
    
    return (
        <>
            <div id="studentList">
                {students.length === 0 ? <p>Hier gibt es zurzeit keine Studenten</p> : studentList.map((student) => {
                    let cardKey = student.email;
                    return(<StudentCard key={cardKey} student={student} />)
				})}
            </div>
        </>
    )
}

export default StudentList