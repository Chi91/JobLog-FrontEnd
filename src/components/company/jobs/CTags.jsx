import { Link, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { job_editJob } from "../../../redux/job/jobSlice"
import { updateJob } from "../../../redux/job/jobActions";


export default function CTags() {
	const dispatch = useDispatch()

	const [searchParams] = useSearchParams()
	const id = searchParams.get("jobID")

	let job = useSelector(state => state.job.job)
	let accessToken = useSelector(state => state.authentication.accessToken)
	let editedJob = useSelector(state => state.job.editedJob)

	const handleDelete = element => {
		let localJob = {
			jobID: id,
			tagList: editedJob.tagList
		};

        let arrayCopy = [...job.tagList]

		const i = arrayCopy.indexOf(element)

        if(i > -1) {
            arrayCopy.splice(i,1)
        } else {
            console.log("Id not found")
        }

        localJob.tagList = arrayCopy

		updateJob(localJob, accessToken)

		dispatch(job_editJob({
			editedJob: {
				"tagList": localJob.tagList
			}
		}))
	}

	let button =
		<Link to={`/company/jobs/jobEdit?jobID=${id}&site=3`} id="edit-button">
			<i className="fa-solid fa-pencil" />
		</Link>

	let content
	if (job && job.tagList) {
		content = job.tagList.map((element, i) => {
			return (
				<div key={"jobtag-" + i} className="job-tag">
					<p>{element}</p>
					<button className="job-tag-delete-button" onClick={() => handleDelete(element)}>
						<i className="fa-solid fa-xmark" />
					</button>
				</div>
			)
		})
	}
	else {
		content = <p>Es gibt keine Tags</p>
	}

	return (
		<>
			<article id="company-data-job-tags" className="company-article">
				<header>
					<h2>Tags</h2>
					{button}
				</header>

				<main className="flexHelper">
					{content}
				</main>
			</article>
		</>
	)
}