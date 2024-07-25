// redux
import store from '../store'

import config from '../../config.json'
import * as studentSlice from './studentSlice'

export function getStudents() {
	//queue pending action
	store.dispatch(studentSlice.student_pending())

	// build request to rest api
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//send request
	fetch(config.SERVER_URL + "/students", requestOptions)
		.then(handleFetchRespone)
		.then(studentList => {
			store.dispatch(studentSlice.student_setAllStudents({
				allStudents: studentList
			}))
		})
		.catch(error => {
			store.dispatch(studentSlice.student_error(error))
		})
}

export function getSingleStudent(id) {

	//queue pending action
	store.dispatch(studentSlice.student_pending())

	// build request to rest api
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//send request
	fetch(config.SERVER_URL + "/students/" + id, requestOptions)
		.then(handleFetchRespone)
		.then(student => {
			store.dispatch(studentSlice.student_setSingleStudent({
				singleStudent: student
			}))
		})
		.catch(error => {
			store.dispatch(studentSlice.student_error(error))
		})
}

export function getStudentObject(id, callback) {

	// build request to rest api
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//send request
	fetch(config.SERVER_URL + "/students/" + id, requestOptions)
		.then(handleFetchRespone)
		.then(student => {
			return callback(null, student)
		})
		.catch(error => {
			return callback(error, null)
		})
}

export function updateStudent(token, studentID, courseID, fieldID, firstname, lastname, password, phone, email, availability, savedSearches, favoriteCompanies, profilPic) {

	// TODO: passwortänderung

	if (!studentID) return store.dispatch(studentSlice.student_error("Es muss eine ID angegeben werden"))

	//queue pending action
	store.dispatch(studentSlice.student_pending())

	// build request body
	let reqBody = {}
	if (courseID) reqBody.courseID = courseID
	if (fieldID) reqBody.fieldID = fieldID
	if (firstname) reqBody.firstname = firstname
	if (lastname) reqBody.lastname = lastname
	if (password) reqBody.password = password
	if (phone) reqBody.phone = phone
	if (email) reqBody.email = email
	if (availability) reqBody.availability = availability
	if (savedSearches) reqBody.savedSearches = savedSearches
	if (favoriteCompanies) reqBody.favoriteCompanies = favoriteCompanies
	if (profilPic) reqBody.profilPic = profilPic

	// build request to rest api
	const requestOptions = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: JSON.stringify(reqBody)
	}

	//send request
	fetch(config.SERVER_URL + "/students/" + studentID, requestOptions)
		.then(handleFetchRespone)
		.then(student => {
			store.dispatch(studentSlice.student_setSingleStudent({
				singleStudent: student
			}))
		})
		.catch(error => {
			store.dispatch(studentSlice.student_error(error))
		})
}

export function addAvailability(accessToken, studentID, newAvailability, callback) {

	//queue pending action
	store.dispatch(studentSlice.student_pending())

	const reqBody = {
		newAvailability: newAvailability
	}

	fetch(config.SERVER_URL + "/students/" + studentID + "/availability", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + accessToken
		},
		body: JSON.stringify(reqBody)
	})
		.then(handleFetchRespone)
		.then(savedAvailability => {
			store.dispatch(studentSlice.student_reset_availability({
				newAvailability: savedAvailability
			}))
			callback()
		})
		.catch(error => console.error(error))
}

export function deleteAvailability(accessToken, studentID, slotID) {

	//queue pending action
	store.dispatch(studentSlice.student_pending())

	const reqBody = {
		deleteAvailabilityID: slotID
	}

	fetch(config.SERVER_URL + "/students/" + studentID + "/availability", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + accessToken
		},
		body: JSON.stringify(reqBody)
	})
		.then(handleFetchRespone)
		.then(() => {
			store.dispatch(studentSlice.student_delete_availability({
				deleteAvailabilityID: slotID
			}))
		})
		.catch(error => console.error(error))
}

export function updateAvatar(token, studentID, image) {

	//queue pending action
	store.dispatch(studentSlice.student_pending())

	// build formdata
	const formData = new FormData()
	formData.append("picFile", image)

	// build request to rest api
	const requestOptions = {
		method: "POST",
		body: formData
	}

	//send request
	fetch(config.SERVER_URL + "/students/" + studentID + "/upload_picFile", requestOptions)
		.then(handleFetchRespone)
		.then(student => {
			store.dispatch(studentSlice.student_setSingleStudent({
				singleStudent: student
			}))
		})
		.catch(error => {
			store.dispatch(studentSlice.student_error(error))
		})
}

export function addDocument(accessToken, studentID, doc) {

	//queue pending action
	store.dispatch(studentSlice.student_pending())

	// build formdata
	const formData = new FormData()
	formData.append("uploadFile", doc)

	// build request to rest api
	const requestOptions = {
		method: "POST",
		body: formData
	}

	//send request
	fetch(config.SERVER_URL + "/students/" + studentID + "/upload_file", requestOptions)
		.then(handleFetchRespone)
		.then(student => {
			store.dispatch(studentSlice.student_setSingleStudent({
				singleStudent: student
			}))
		})
		.catch(error => {
			store.dispatch(studentSlice.student_error(error))
		})
}

export function deleteDocuments(accessToken, studentID, documentsToDelete, callback) {

	//queue pending action
	store.dispatch(studentSlice.student_pending())

	const reqBody = {
		documentsToDelete: documentsToDelete
	}

	// build request to rest api
	const requestOptions = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + accessToken
		},
		body: JSON.stringify(reqBody)
	}

	//send request
	fetch(config.SERVER_URL + "/students/" + studentID + "/deleteDocuments", requestOptions)
		.then(handleFetchRespone)
		.then(() => {
			store.dispatch(studentSlice.student_delete_document({
				fileIDs: documentsToDelete
			}))
			callback()
		})
		.catch(error => {
			store.dispatch(studentSlice.student_error(error))
		})
}

export function getMyApplications(accessToken, studentID) {

	//queue pending action
	store.dispatch(studentSlice.student_pending())

	// send request
	fetch(config.SERVER_URL + "/applications/students/" + studentID, {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + accessToken
		}
	})
		.then(handleFetchRespone)
		.then(applications => store.dispatch(studentSlice.student_setApplications({ applications: applications })))
		.catch(error => store.dispatch(studentSlice.student_error(error)))
}

export function newApplication(accessToken, jobID, studentID, visibleDocuments, callback) {

	//queue pending action
	store.dispatch(studentSlice.student_pending())

	const reqBody = {
		jobID: jobID,
		studentID: studentID,
		visibleDocuments: visibleDocuments
	}

	// build request to rest api
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + accessToken
		},
		body: JSON.stringify(reqBody)
	}

	//send request
	fetch(config.SERVER_URL + "/applications", requestOptions)
		.then(handleFetchRespone)
		.then(savedApplication => {
			store.dispatch(studentSlice.student_add_application({ savedApplication: savedApplication }))
			callback(null)
		})
		.catch(error => {
			callback(error)
		})
}

export function deleteApplication(accessToken, application, callback) {

	//queue pending action
	store.dispatch(studentSlice.student_pending())

	// build request to rest api
	const requestOptions = {
		method: "DELETE",
		headers: {
			"Authorization": "Bearer " + accessToken
		}
	}

	//send request
	fetch(config.SERVER_URL + "/applications/" + application.applicationID, requestOptions)
		.then(handleFetchRespone)
		.then(savedApplication => {
			store.dispatch(studentSlice.student_delete_application({ deletedApplication: application }))
			callback()
		})
		.catch(error => {
			callback(error)
		})
}

export function editApplication(accessToken, applicationID, visibleDocuments, callback) {

	//queue pending action
	store.dispatch(studentSlice.student_pending())

	const reqBody = {
		visibleDocuments: visibleDocuments
	}

	// build request to rest api
	const requestOptions = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + accessToken
		},
		body: JSON.stringify(reqBody)
	}

	//send request
	fetch(config.SERVER_URL + "/applications/" + applicationID, requestOptions)
		.then(handleFetchRespone)
		.then(savedApplication => {
			store.dispatch(studentSlice.student_delete_application({ deletedApplication: savedApplication }))
			store.dispatch(studentSlice.student_add_application({ savedApplication: savedApplication }))
			callback(null)
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

			const studentList = resBody

			return Promise.resolve(studentList)
		}
	})
}