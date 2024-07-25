import JSZip from "jszip";
import { saveAs } from "save-as";

import Base64Downloader from "common-base64-downloader-react";

export default function CSPDocuments({ documents, fileStorage, firstName, lastName }) {

    let documentMain;
    let arrayCopy = fileStorage.filter(file => documents.includes(file._id));

    const downloadAll = () => {
        const zip = new JSZip();

        arrayCopy.forEach(element => {
            zip.file(element.name, element.data, { base64: true })
        })

        zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "documents.zip")
        })
    }

    if (documents.length > 0) {
        let button = document.getElementById("download-all-button");
        if (button !== null) {
            button.classList.remove("disabled");
        }
        documentMain = arrayCopy.map((doc, i) => {
            return (
                <>
                    <Base64Downloader className="downloadButton" base64={`data:${doc.mimetype};base64,${doc.data}`} downloadName={doc.name} onDownloadSuccess={() => console.clear()}>
                        <i key={i + 1} id={`${i}-document-icon`} className="fa-solid fa-download" />
                        <div key={i} id={`${i}-document`} className="document">{doc.name}</div>
                    </Base64Downloader>
                </>
            )
        })
    }
    else {
        let button = document.getElementById("download-all-button");
        if (button !== null) {
            button.classList.add("disabled");
        }

        documentMain = <p>Es sind keine Dokumente für Sie freigeben</p>
    }

    return (
        <>
            <article id="student-documents" className="company-article">
                <header>
                    <h2>Dokumente</h2>
                    <button type="submit" id="download-all-button" onClick={downloadAll}>
                        <i className="fa-solid fa-download" />
                    </button>
                </header>

                <main id="documentsList">
                    {documentMain}
                </main>
            </article>
        </>
    )
}