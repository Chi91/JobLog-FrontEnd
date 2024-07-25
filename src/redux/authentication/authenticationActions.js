import jwtDecode from "jwt-decode"
import store from "../store"
import config from "../../config.json"
import * as authenticationSlice from "./authenticationSlice"
import Cookies from "universal-cookie"
import { add } from "date-fns"

const cookies = new Cookies()

export function authenticateUser(mail, password, rememberMe) {

	// queue pending action
	store.dispatch(authenticationSlice.auth_pending())

	// build request body
	const reqBody = {
		email: mail,
		password: password
	}

	// send request
	fetch(config.SERVER_URL + "/authenticate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(reqBody)
	})
		.then(handleFetchResponse)
		.then(fetchReturn => {
			const userObject = fetchReturn.userObject
			const accessToken = fetchReturn.accessToken

			// check if user selected remember, if yes, set cookie
			if (rememberMe) {
				cookies.set("joblog-user-jwt", accessToken, {
					path: "/",
					expires: add(new Date(), {
						months: 3
					})
				})
				cookies.set("joblog-user-object", userObject, {
					path: "/",
					expires: add(new Date(), {
						months: 3
					})
				})
			} else {
				cookies.set("joblog-temp-user-jwt", accessToken, {
					path: "/",
					expires: add(new Date(), {
						hours: 1
					})
				})
				cookies.set("joblog-temp-user-obj", userObject, {
					path: "/",
					expires: add(new Date(), {
						hours: 1
					})
				})
			}

			store.dispatch(authenticationSlice.auth_success({
				user: userObject,
				accessToken: accessToken
			}))
		})
		.catch(error => {
			store.dispatch(authenticationSlice.auth_error(error))
		})
}

function handleFetchResponse(res) {

	return res.text().then(text => {

		const resBody = text && JSON.parse(text)

		if (!res.ok) {
			user_logout()
			const error = resBody.Error || res.statusText
			return Promise.reject(error)
		} else {

			const accessToken = resBody.jwt
			const userObject = jwtDecode(accessToken)

			return Promise.resolve({ userObject, accessToken })
		}
	})
}

export function user_logout() {
	cookies.remove("joblog-user-jwt")
	cookies.remove("joblog-user-object")
	cookies.remove("joblog-temp-user-jwt")
	cookies.remove("joblog-temp-user-obj")
	store.dispatch(authenticationSlice.auth_logout())
}