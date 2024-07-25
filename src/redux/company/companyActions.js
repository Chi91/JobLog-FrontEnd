// redux
import store from '../store'

import config from '../../config.json'
import { company_pending, company_setAllCompanies, company_setSingleCompany, company_error } from './companySlice'

export function getCompanies() {
	//queue pending action
	store.dispatch(company_pending())

	// build request to rest api
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//send request
	fetch(config.SERVER_URL + "/companies", requestOptions)
		.then(handleFetchRespone)
		.then(companiesList => {
			store.dispatch(company_setAllCompanies({
				allCompanies: companiesList
			}))
		})
		.catch(error => {
			store.dispatch(company_error(error))
		})
}

export function getSingleCompany(id) {

	//queue pending action
	store.dispatch(company_pending())

	// build request to rest api
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//send request
	fetch(config.SERVER_URL + "/companies/" + id, requestOptions)
		.then(handleFetchRespone)
		.then(company => {
			store.dispatch(company_setSingleCompany({
				singleCompany: company
			}))
		})
		.catch(error => {
			store.dispatch(company_error(error))
		})
}

export function updateCompany(company, accessToken, data) {

	//queue pending action
	store.dispatch(company_pending())

	//build request to rest api
	const requestOptions = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + accessToken
		},
		body: JSON.stringify(data)
	}

	//send request
	fetch(config.SERVER_URL + "/companies/" + company.companyID, requestOptions)
		.then(handleFetchRespone)
		.then(company => {
			store.dispatch(company_setSingleCompany({
				singleCompany: company
			}))
		})
		.catch(error => {
			store.dispatch(company_error(error))
		})
}

export function updateAvatar(token, companyID, image) {

	//queue pending action
	store.dispatch(company_pending())

	// build formdata
	const formData = new FormData()
	formData.append("picFile", image)

	// build request to rest api
	const requestOptions = {
		method: "POST",
		body: formData
	}

	//send request
	fetch(config.SERVER_URL + "/companies/" + companyID + "/upload_picFile", requestOptions)
		.then(handleFetchRespone)
		.then(company => {
			store.dispatch(company_setSingleCompany({
				singleCompany: company
			}))
		})
		.catch(error => {
			store.dispatch(company_error(error))
		})
}

function handleFetchRespone(res) {
	return res.text().then(text => {
		const resBody = text && JSON.parse(text)

		if (!res.ok) {
			const error = resBody.Error || res.statusText
			return Promise.reject(error)
		} else {

			const companyList = resBody

			return Promise.resolve(companyList)
		}
	})
}