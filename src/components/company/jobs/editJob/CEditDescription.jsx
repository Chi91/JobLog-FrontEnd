import { useState } from "react";
export default function CEditDescription( {job, handleSubmitEdit} ) {

    const [aboutText, setAboutText] = useState({ description: job && job.jobSummary ? job.jobSummary : "" })

    const handleChange = e => {
		let value = e.target.value

		setAboutText(prevalue => {
			return {
				...prevalue,
				description: value
			}
		})
	}

    handleSubmitEdit("description", aboutText.description);
    
    return (
        <>
            <article id="company-data-description-edit" className="company-article company-edit-description">
                <main>
                    <textarea id="job-description" onChange={handleChange} defaultValue={job.jobSummary ? job.jobSummary : 'Hier könnte Ihre Beschreibung stehen'} />
                </main>
            </article>
        </>
    )
}