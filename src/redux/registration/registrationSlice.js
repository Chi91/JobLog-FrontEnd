import { createSlice } from '@reduxjs/toolkit'

export const registrationSlice = createSlice({
	name: 'registration',
	initialState: {
		user: null,
		pending: false,
		error: null
	},
	reducers: {
		registration_pending: state => {
			state.pending = true
		},
		registration_error: (state, action) => {
			state.user = null
			state.pending = false
			state.error = action.payload
		}
	}
})

export const { registration_pending, registration_error } = registrationSlice.actions

export default registrationSlice.reducer