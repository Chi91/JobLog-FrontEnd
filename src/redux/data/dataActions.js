// redux
import store from '../store'

import config from '../../config.json'
import * as dataSlice from './dataSlice'

export function getCourses() {

	// build request to rest api
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//send request
	fetch(config.SERVER_URL + "/data/courses", requestOptions)
		.then(handleFetchRespone)
		.then(coursesJSON => {

			let helper = []
			for (let i in coursesJSON) {
				helper.push({ label: coursesJSON[i], value: coursesJSON[i] })
			}

			store.dispatch(dataSlice.data_setCourses({
				courses: helper
			}))
		})
		.catch(error => {
			store.dispatch(dataSlice.data_error(error))
		})
}

export function getFields() {

	fetch(config.SERVER_URL + "/data/fields", { method: "GET" })
		.then(handleFetchRespone)
		.then(fields => {
			let helper = []
			for (let i in fields) helper.push({ label: fields[i], value: fields[i] })

			store.dispatch(dataSlice.data_setFields({ fields: helper }))
		})
		.catch(error => store.dispatch(dataSlice.data_error(error)))
}

function handleFetchRespone(res) {
	return res.text().then(text => {
		const resBody = text && JSON.parse(text)

		if (!res.ok) {
			const error = resBody.Error || res.statusText
			return Promise.reject(error)
		} else {

			const fetchResponse = resBody

			return Promise.resolve(fetchResponse)
		}
	})
}