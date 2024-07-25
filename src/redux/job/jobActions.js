// redux
import store from '../store'

import config from '../../config.json'
import * as jobSlice from './jobSlice'

export function createJob(job, token, companyID, companyName){
	//queue pending action
	store.dispatch(jobSlice.job_pending())

	//build POST Object
	let newJob = {
		companyID: companyID,
		companyName: companyName,
		fieldIDs: job.fieldIDs ? job.fieldIDs : [],
		courseIDs: job.courseIDs ? job.courseIDs : [],
		tagList: job.tagList ? job.tagList : [],
		jobTitle: job.jobTitle ? job.jobTitle : "Kein Titel",
		jobSummary: job.jobSummary ? job.jobSummary : "Hier könnte Ihr Beschreibungstext stehen.",
		jobType: job.jobType ? job.jobType : "",
		salaryPerHour: job.salaryPerHour ? job.salaryPerHour : 0,
		vacation: job.vacation ? job.vacation : 0,
		weeklyTimeSlots: job.weeklyTimeSlots ? job.weeklyTimeSlots : [],
		weeklyHours: job.weeklyHours ? job.weeklyHours : 0,
		benefits: job.benefits ? job.benefits : ""
	}

	// build request to rest api
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Bearer " + token
		},
		 body: JSON.stringify(newJob)
	}

	//send request
	fetch(config.SERVER_URL + "/jobs",  requestOptions)
		.then(handleFetchRespone)
		.then(job => {
			store.dispatch(jobSlice.job_setOneJob({
				job: job
			}))
		})
		.catch(error => {
			store.dispatch(jobSlice.job_error(error))
		})
}

export function updateJob(job, jobID, token){
	//queue pending action
	store.dispatch(jobSlice.job_pending())

	// build request to rest api
	const requestOptions = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Bearer " + token
		},
		 body: JSON.stringify(job)
	}

	
	//send request
	fetch(config.SERVER_URL + "/jobs/" + jobID,  requestOptions)
		.then(handleFetchRespone)
		.then(job => {
			store.dispatch(jobSlice.job_setOneJob({
				job: job
			}))
		})
		.catch(error => {
			store.dispatch(jobSlice.job_error(error))
		})
}

export function getOwnJobs(companyID) {
	//queue pending action
	store.dispatch(jobSlice.job_pending())

	// build request to rest api
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//send request
	fetch(config.SERVER_URL + "/jobs", requestOptions)
		.then(handleFetchRespone)
		.then(allJobsList => {
			let ownJobList = [];

			allJobsList.forEach(job => {
				if (job.companyID === companyID) {
					ownJobList.push(job)
				}
			});

			store.dispatch(jobSlice.job_setAllOwnJobs({
				ownJobs: ownJobList
			}))
		})
		.catch(error => {
			store.dispatch(jobSlice.job_error(error))
		})
}

export function getJobsWithFilter(filter) {

	const url = Object.keys(filter).map(key => {
		return encodeURIComponent(key) + "=" + encodeURIComponent(filter[key])
	}).join("&")

	fetch(config.SERVER_URL + "/jobs?" + url, { method: "GET" })
		.then(handleFetchRespone)
		.then(prefilteredJobs => store.dispatch(jobSlice.job_setPrefilteredJobs({ prefilteredJobs: prefilteredJobs })))
		.catch(error => store.dispatch(jobSlice.job_error(error)))
}

export function getApplicationsForJob(jobID, token, callback) {
	//queue pending action
	store.dispatch(jobSlice.job_pending())

	// build request to rest api
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Bearer " + token
		}
	}

	if (jobID) {
		//send request
		fetch(config.SERVER_URL + "/applications/jobs/" + jobID, requestOptions)
			.then(handleFetchRespone)
			.then(applications => {
				return callback(null, applications)
			})
			.catch(error => {
				return callback(error, null)
			})
	}

}

export function getSingleJob(id) {

	//queue pending action
	store.dispatch(jobSlice.job_pending())

	// build request to rest api
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//send request
	fetch(config.SERVER_URL + "/jobs/" + id, requestOptions)
		.then(handleFetchRespone)
		.then(job => {
			store.dispatch(jobSlice.job_setOneJob({
				job: job
			}))
		})
		.catch(error => {
			store.dispatch(jobSlice.job_error(error))
		})
}

export function getAllJobs() {

	//queue pending action
	store.dispatch(jobSlice.job_pending())

	// build request to rest api
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//send request
	fetch(config.SERVER_URL + "/jobs", requestOptions)
		.then(handleFetchRespone)
		.then(jobs => {
			store.dispatch(jobSlice.job_setAllJobs({
				jobs: jobs
			}))
		})
		.catch(error => {
			store.dispatch(jobSlice.job_error(error))
		})
}

export function deleteJob(accessToken, jobID, callback) {

	//queue pending action
	store.dispatch(jobSlice.job_pending())

	// build request to rest api
	const requestOptions = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + accessToken
		}
	}

	//send request
	fetch(config.SERVER_URL + "/jobs/" + jobID, requestOptions)
		.then(handleFetchRespone)
		.then(() => {
			callback()
		})
		.catch(error => {
			callback(error)
		})
}

function handleFetchRespone(res) {

	return res.text().then(text => {
		const resBody = text && JSON.parse(text)

		if (!res.ok) {
			const error = resBody.Error || res.statusText
			return Promise.reject(error)
		} else {

			const jobObject = resBody

			return Promise.resolve(jobObject)
		}
	})
}