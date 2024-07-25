import { useSelector } from "react-redux";
import { useState } from "react";

export default function CEditHardfacts({ job, handleSubmitEdit }) {

    const courses = useSelector(state => state.data.courses)
    const fields = useSelector(state => state.data.fields)

    const [localCourseIDs, setLocalCourses] = useState(job.courseIDs ? job.courseIDs : []);
    const [localFieldIDs, setLocalFields] = useState(job.fieldIDs ? job.fieldIDs : []);

    //field / courselist for dropDown options
    const [fieldIDsForDropDown, setFieldIDsForDropDown] = useState(fields);
    const [courseIDsForDropDown] = useState(courses);

    const handleChange = e => {
        let newType = document.getElementById("dropDownTypeOfEmployment").value;
        let newWeeklyHours = document.getElementById("weeklyHours").value;
        let newSalary = document.getElementById("salary").value;
        let newVacation = document.getElementById("vacation").value;
        let newBenefits = document.getElementById("benefits").value;
        let newFieldIDs = localFieldIDs;
        let newCourseIDs = localCourseIDs;

        let data = {
            type: newType ? newType : job.jobType,
            weeklyHours: newWeeklyHours ? newWeeklyHours : job.weeklyHours,
            salary: newSalary ? newSalary : job.salary,
            vacation: newVacation ? newVacation : job.vacation,
            benefits: newBenefits ? newBenefits : job.benefits,
            fieldIDs: newFieldIDs ? newFieldIDs : job.fieldIDs,
            courseIDs: newCourseIDs ? newCourseIDs : job.courseIDs
        }

		handleSubmitEdit("facts", data)
	}

    /* Handle OpenDropDown ********************************************************************************************** */
    const [openFields, setOpenFields] = useState(false);
    const [openCourses, setOpenCourses] = useState(false);

    const handleOpenFields = (e) => {
        e.preventDefault();
        setOpenFields(!openFields);
    };

    const handleOpenCourses = (e) => {
        e.preventDefault();
        setOpenCourses(!openCourses);
    }

    /* Fields************************************************************************************************************* */

    const handleDeleteFields = (e, element) => {

        e.preventDefault();

        let arrayCopy = [...localFieldIDs]

        let i = arrayCopy.indexOf(element)

        if (i > -1) {
            arrayCopy.splice(i, 1)
        } else {
            console.log("id nicht gefunden")
        }

        setLocalFields(arrayCopy)

        handleSubmitEdit("facts-fields", arrayCopy)

        arrayCopy = []
        arrayCopy = [...fieldIDsForDropDown]

        let field;

        arrayCopy.forEach(ele => {
            if(ele.label === element){
                field = ele
            } 
        })

        i = arrayCopy.indexOf(field)

        if (i > -1) {
            let id = i + "-assignable";
            let field = document.getElementById(id);
            field.classList.remove("disabled")
        } else {
            console.log("id nicht gefunden")
        }
    }

    const handleSubmitFields = (e, field) => {

        e.preventDefault();

        let helper = [];

        if (localFieldIDs !== undefined) {
            localFieldIDs.forEach(element => {
                helper.push(element)
            })
        }

        helper.push(field.label);

        handleSubmitEdit("facts-fields", helper)

        setLocalFields(helper);

        helper= [...fieldIDsForDropDown]

        let i = helper.indexOf(field)
        if (i > -1) {
            let id = i + "-assignable";
            let element = document.getElementById(id);
            element.classList.add("disabled")
        } else {
            console.log("id nicht gefunden")
        }

        setFieldIDsForDropDown(helper)
    }

    let contentFieldsChosen;
    if (localFieldIDs.length === 0) {
        contentFieldsChosen = <p>Es sind keine Fachbereiche ausgewählt.</p>
    }
    else {
        contentFieldsChosen = localFieldIDs.map((field, i) => {
            return (
                <>
                    <div className="job-chosen">
                        <p>{field}</p>
                        <button id={`${i}-delete-assignable`} className="job-chosen-delete-button" onClick={(e) => handleDeleteFields(e, field)}>
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>
                </>
            )
        })
    }

    let contentFields;
    contentFields = fieldIDsForDropDown.map((field, i) => {
        return (
            <>
                <div className="job-assignable">
                    <button key={i} id={`${i}-assignable`} onClick={e => handleSubmitFields(e, field)}>{field.label}</button>
                </div>
            </>
        )
    });

    let dropDownFields = <div>
        <div className="drop-down-wrapper">
            <i className="fa-solid fa-building-columns" />
            <button onClick={handleOpenFields} className="button-primary drop-down-arrow">
                Wähle zugehörige Fachbreiche{openFields ? <i className="fa-solid fa-caret-up" /> : <i className="fa-solid fa-caret-down" />}
            </button>
        </div>
        <div className={`job-assignables-wrapper ${openFields}`}>
            {openFields ? contentFields : ""}
        </div>

    </div>

    /* Courses************************************************************************************************************* */

    const handleDeleteCourses = element => {

        let arrayCopy = [...localCourseIDs]

        let i = arrayCopy.indexOf(element)

        if (i > -1) {
            arrayCopy.splice(i, 1)
        } else {
            console.log("id nicht gefunden")
        }

        setLocalCourses(arrayCopy)

        handleSubmitEdit("facts-courses", arrayCopy)

        arrayCopy = []
        arrayCopy = [...courseIDsForDropDown]

        let field;

        arrayCopy.forEach(ele => {
            if(ele.label === element){
                field = ele
            } 
        })

        i = arrayCopy.indexOf(field)

        if (i > -1) {
            let id = i + "-assignable";
            let field = document.getElementById(id);
            field.classList.remove("disabled")
        } else {
            console.log("id nicht gefunden")
        }
    }

    const handleSubmitCourses = (e, fields) => {

        e.preventDefault();

        let helper = [];

        if (localCourseIDs !== undefined) {
            localCourseIDs.forEach(element => {
                helper.push(element)
            })
        }

        helper.push(fields.label);

        handleSubmitEdit("facts-courses", helper)

        setLocalCourses(helper);

        helper= [...courseIDsForDropDown]

        let i = helper.indexOf(fields)
        if (i > -1) {
            let id = i + "-assignable";
            let element = document.getElementById(id);
            element.classList.add("disabled")
        } else {
            console.log("id nicht gefunden")
        }

        setFieldIDsForDropDown(helper)
    }

    let contentCourcesChosen;
    if (localCourseIDs.length === 0) {
        contentCourcesChosen = <p>Es sind keine Studiengänge ausgewählt ausgewählt.</p>
    }
    else {
        contentCourcesChosen = localCourseIDs.map((course, i) => {
            return (
                <>
                    <div className="job-chosen">
                        <p>{course}</p>
                        <button id={`${i}-delete-assignable`} className="job-chosen-delete-button" onClick={() => handleDeleteCourses(course)}>
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>
                </>
            )
        })
    }

    let contentCourses;
    contentCourses = courseIDsForDropDown.map((course, i) => {
        return (

            <div className="job-assignable">
                <button key={i} id={`${i}-assignable`} onClick={e => handleSubmitCourses(e, course)}>{course.label}</button>
            </div>

        )
    });

    let dropDownCourses = <div>
        <div className="drop-down-wrapper">
            <i className="fa-solid fa-graduation-cap" />
            <button onClick={handleOpenCourses} className="button-primary drop-down-arrow">
                Wähle zugehörige Studiengänge {openCourses ? <i className="fa-solid fa-caret-up" /> : <i className="fa-solid fa-caret-down" />}
            </button>
        </div>

        <div className={`job-assignables-wrapper ${openCourses}`}>
            {openCourses ? contentCourses : ""}
        </div>

    </div>

    /* Rendering below **************************************************************************************************************************************** */

    return (
        <>
            <article id="company-data-hardfacts-edit" className="company-article company-edit-hardfacts">
                <main>
                    <form>
                        <label for="dropDownTypeOfEmployment" id="timeInputLabel">
                            Anstellungsart | Wochenstunden
                        </label>
                        <div className="timeInputs flex">
                            <i className="fa-regular fa-clock" />
                            <select id="dropDownTypeOfEmployment" defaultValue={job ? job.jobType : "Keine Angabe"} onChange={handleChange}>
                                <option value={"Andere"}>Andere</option>
                                <option value={"Teilzeit"}>Teilzeit</option>
                                <option value={"Vollzeit"}>Vollzeit</option>
                            </select>
                            <input id="weeklyHours" type={"number"} max={"40"} defaultValue={job ? job.weeklyHours : 0} onChange={handleChange} />
                            Stunden/Woche
                        </div>
                        <label for="salary" id="salaryLabel">
                            Gehalt
                        </label>
                        <div className="salaryPerHour flex">

                            <i className="fa-regular fa-money-bill-1" />
                            <input id="salary" type={"number"} defaultValue={job ? job.salaryPerHour : 0} onChange={handleChange} /> €/Stunde
                        </div>
                        <label for="vacation" id="vacationLabel">
                            Urlaubstage
                        </label>
                        <div className="vacation flex">
                            <i className="fa-solid fa-plane-departure" />
                            <input id="vacation" type={"number"} defaultValue={job ? job.vacation : 0} onChange={handleChange} /> Tage/Jahr
                        </div>
                        <label for="benefits" id="benefitsLabel">
                            Benefits (Optional)
                        </label>
                        <div className="benefits flex">
                            <i className="fa-regular fa-star" />
                            <input id="benefits" type={"text"} maxLength="50" defaultValue={job ? job.benefits : "Keine Angabe"} onChange={handleChange} />
                        </div>
                        <label for="fieldID" id="fieldIDLabel">
                            Fachbreich/e
                        </label>
                        <div className="fieldID flex">
                            {dropDownFields}
                        </div>
                        <div className="chosen">
                            {contentFieldsChosen}
                        </div>
                        <label for="courseID" id="courseIDLabel">
                            Studiengänge
                        </label>
                        <div className="courseID flex">
                            {dropDownCourses}
                        </div>
                        <div className="chosen">
                            {contentCourcesChosen}
                        </div>
                    </form>
                </main>
            </article>
        </>
    )
}