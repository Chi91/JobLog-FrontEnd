import { useState } from "react";

export default function CEditTags({ job, handleSubmitEdit }) {

    const [tagList, setTagList] = useState(job ? job.tagList : []);

    const handleSubmit = () => {
        let value = document.getElementById("tagName").value

        let helper = []

        if (tagList !== undefined) {
            tagList.forEach(element => {
                helper.push(element);
            });
        }

        helper.push(value);

        handleSubmitEdit("tags", helper);

        setTagList(helper);
    }



    const handleDelete = element => {

        let arrayCopy = [...tagList]

        const i = arrayCopy.indexOf(element)

        if (i > -1) {
            arrayCopy.splice(i, 1)
        } else {
            console.log("id nicht gefunden")
        }

        setTagList(arrayCopy)

        handleSubmitEdit("tags", arrayCopy)
    }

    let content;
    if (tagList !== undefined) {
        content = tagList.map((element, i) => {
            return (
                <>
                    <div key={i} className="job-tag">
                        <p>{element}</p>
                        <button key={i+0.5} className="job-tag-delete-button" onClick={() => handleDelete(element)}>
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>
                </>
            )
        })
    }
    else {
        content = <p>Es gibt keine Tags</p>
    }

    return (
        <>
            <article id="company-data-tags-edit" className="company-article company-edit-tags">
                <main>
                    <div className="flex-helper-input">
                        <input id="tagName" type={"text"} maxLength={"30"} />
                        <button id="addTag" className="button-primary" onClick={handleSubmit}>
                            <i className="fa-solid fa-plus" />
                        </button>
                    </div>
                    <div className="flexHelper">
                        {content}
                    </div>
                </main>
            </article>
        </>
    )
}