// redux
import store from '../store'

import config from '../../config.json'
import { registration_pending, registration_error } from './registrationSlice'

import { validMail } from './regex'

export function saveStudent(email, password, callback) {

	// queue pending action
	store.dispatch(registration_pending())

	// check if mail is correct
	if (!validMail.test(email)) {
		return store.dispatch(registration_error("Ungültige E-Mail Adresse"))
	}

	// build request body
	const reqBody = {
		email: email,
		password: password
	}

	// build request to rest api
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reqBody)
	}

	// send request
	fetch(config.SERVER_URL + "/students", requestOptions)
		.then(handleFetchResponse)
		.then(userObject => {
			callback(null, userObject)
		})
		.catch(error => {
			callback(error)
		})
}

export function saveCompany(companyName, companyMail, password, callback) {

	// queue pending action
	store.dispatch(registration_pending())

	// check if mail is correct
	if (!validMail.test(companyMail)) {
		return store.dispatch(registration_error("Ungültige E-Mail Adresse"))
	}

	// build request body
	const reqBody = {
		companyName: companyName,
		email: companyMail,
		password: password
	}

	// build request to rest api
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reqBody)
	}

	// send request
	fetch(config.SERVER_URL + "/companies", requestOptions)
		.then(handleFetchResponse)
		.then(userObject => {
			callback(null, userObject)
		})
		.catch(error => {
			callback(error)
		})
}

function handleFetchResponse(res) {

	return res.text().then(text => {

		const resBody = text && JSON.parse(text)

		if (!res.ok) {
			const error = resBody.Error || res.statusText
			return Promise.reject(error)
		} else {

			const userObject = resBody

			return Promise.resolve(userObject)
		}
	})
}