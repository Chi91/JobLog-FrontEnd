import { Link, useSearchParams } from "react-router-dom"

export default function CDescription( { job } ) {


    const [searchParams] = useSearchParams()
    const id = searchParams.get("jobID")

    let button =
        <Link to={`/company/jobs/jobEdit?jobID=${id}&site=1`} id="edit-button" job={job}>
            <i className="fa-solid fa-pencil" />
        </Link>

    return (
        <>
            <article id="company-data-job-description" className="company-article">
                <header>
                    <h2>Beschreibung</h2>
                    {button}
                </header>

                <main>
                    {job ? job.jobSummary : ''}
                </main>
            </article>
        </>
    )
}