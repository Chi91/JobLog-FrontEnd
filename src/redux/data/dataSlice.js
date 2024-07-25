import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
	name: 'data',
	initialState: {
		courses: [],
		fields: [],
		error: null,
		searchFilter: {}
	},
	reducers: {
		data_setCourses: (state, action) => {
			state.courses = action.payload.courses
		},
		data_setFields: (state, action) => {
			state.fields = action.payload.fields
		},
		data_error: (state, action) => {
			state.error = action.payload
		},
		data_set_filter: (state, action) => {
			state.searchFilter = action.payload
		},
		data_reset_filter: state => {
			state.searchFilter = {}
		}
	}
})

export const {
	data_setCourses,
	data_setFields,
	data_error,
	data_set_filter,
	data_reset_filter
} = dataSlice.actions

export default dataSlice.reducer