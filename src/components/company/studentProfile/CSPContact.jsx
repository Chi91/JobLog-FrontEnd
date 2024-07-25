
export default function CSPContact(student) {

    student = student.student

    return (
        <>
            <article id="student-contact" className="company-article">
                <header>
                    <h2>Kontakt</h2>
                </header>

                <main>
                    <div id="wrap-helper">

                        <div id="email">
                            <i className="email fa-solid fa-envelope " />
                            <span id="email-adress" className="email">{student ? student.email : '-'}</span>
                        </div>


                        <div id="phone">
                            <i className="fa-solid fa-phone" />
                            <span id="tel">{student.phone ? student.phone : '-'}</span>
                        </div>
                    </div>
                </main>
            </article>
        </>
    )
}