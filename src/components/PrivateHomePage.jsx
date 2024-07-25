import { Component } from "react";

import jobLogLogo from '../assets/images/JobLogLogo.svg'

/* PrivateHomePage -> First view after Login */
class PrivateHomePage extends Component { 

    render(){

        //Soll ausgeblendet werden, wenn es keine gespeicherten Suchen gibt.
        let mySearch = <article id="mySearch">
                        <h2>Meine Suchen</h2>
                            <p>
                                Hier siehst du deine gespeicherten Suchen:
                            </p>

                            {/* TODO - mySearchList umsetzen*/}
                            --------Platzhalter für Liste mit allen gespeichert Suchen---------------------------------------------------
                            {/* <SearchList mySearchList={this.props.mySearchList}/> */}  
                        </article>
                        
        let latestJobs = <article id="latestJobs">
                            <h2>Neuste Jobs</h2>
                            <p>
                                Hier siehst du die neuesten Jobangebote:
                            </p>

                            {/* TODO - latestJobList umsetzen */}
                            --------Platzhalter für Liste mit neuen Job--------------------------------------------------------------------
                            {/* <LatestJobList /> */}
                        </article>

        return(
            <>
                <img alt="JobLogLogo" src={jobLogLogo} style={{width: 300,  height: 300}}/>

                <h1>JobLog - Home</h1>
                {mySearch}
                {latestJobs}

                <article id="what">
                    <h2>Wo bist du denn hier gelandet?</h2>
                    <p> 
                        Ziel von JobLog ist es, den Kommunikationsfluss zwischen Unternehmen und Studierenden im Kontext der Jobsuche und Jobangeboten zu vereinfachen und übersichtlicher zu gestalten.
                        Die von der BHT genutzte Lösung bietet grundlegend schon die Möglichkeit, dass Unternehmen ihre Stellengesuche einstellen können und Suchende die Jobs filtern können.
                        Unsere Jobbörse soll den gesamten Prozess der Arbeitssuche für Arbeitnehmer*innen und Arbeitgeber*innen optimieren. Jobangebote sollen sich an bestimmte Studiengänge richten, 
                        sowie über tag-basierte Suche personalisierte Ergebnisse bringen. Studierende sollen in der Lage sein, ihre zeitlichen Kapazitäten anzugeben, wodurch das Zeitmanagement zwischen Arbeit und Studium vereinfacht werden soll.
                        Der Bewerbungsprozess soll durch Upload-Funktionen in den Stellenanzeigen direkter und unkomplizierter gestaltet werden, so dass Bewerbungsunterlagen über das Portal gesendet werden können.
                    </p>
                </article>
                
                <footer>
                    <hr/>
                    <a href="#what">Wo bin ich gelandet?</a>
                </footer>
            </>
        )
    }
}

export default PrivateHomePage;