import { Link, useSearchParams } from "react-router-dom"


export default function CHardFacts( {job}) {

    const [searchParams] = useSearchParams()
    const id = searchParams.get("jobID")

    let button =
        <Link to={`/company/jobs/jobEdit?jobID=${id}&site=2`} id="edit-button">
            <i className="fa-solid fa-pencil" />
        </Link>


    return (
        <>
            <article id="company-data-job-hardFacts" className="company-article">
                <header>
                    <h2>Hardfacts</h2>
                    {button}
                </header>

                <main>
                    <i className="fa-regular fa-clock" />
                    <span id="time">
                        {job ? job.jobType + " | " + job.weeklyHours + " /h Woche" : ""}
                    </span>

                    <i className="fa-regular fa-money-bill-1" />
                    <span id="salaryPerHour">
                        {job ? job.salaryPerHour + " €/h" : ""}
                    </span>

                    <i className="fa-solid fa-plane-departure" />
                    <span id="vacation">
                        {job ? job.vacation + "Tage" : ""}
                    </span>

                    <i className="fa-regular fa-star" />
                    <span id="benefits">
                        {job ? job.benefits : ""}
                    </span>
                </main>
            </article>
        </>
    )
}