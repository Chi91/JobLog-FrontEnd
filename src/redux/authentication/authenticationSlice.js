import { createSlice } from '@reduxjs/toolkit'

export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState: {
		user: null,
		accessToken: null,
		loginPending: false,
		error: null
	},
	reducers: {
		auth_pending: state => {
			state.loginPending = true
		},
		auth_success: (state, action) => {
			state.user = action.payload.user
			state.accessToken = action.payload.accessToken
			state.loginPending = false
			state.error = null
		},
		auth_error: (state, action) => {
			state.user = null
			state.accessToken = null
			state.loginPending = false
			state.error = action.payload
		},
		auth_logout: state => {
			state.user = null
			state.accessToken = null
			state.loginPending = false
			state.error = null
		},
		repopulate_accessToken: (state, action) => {
			state.user = action.payload.userObject
			state.accessToken = action.payload.accessToken
			state.loginPending = false
			state.error = null
		}
	}
})

export const { auth_pending, auth_success, auth_error, auth_logout, repopulate_accessToken } = authenticationSlice.actions

export default authenticationSlice.reducer