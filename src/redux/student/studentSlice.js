import { createSlice } from '@reduxjs/toolkit'

export const studentSlice = createSlice({
	name: 'student',
	initialState: {
		pending: false,
		allStudents: [],
		singleStudent: null,
		error: null,
		applications: []
	},
	reducers: {
		student_pending: state => {
			state.pending = true
		},
		student_not_pending: state => {
			state.pending = false
		},
		student_setAllStudents: (state, action) => {
			state.pending = false
			state.allStudents = action.payload.allStudents
			state.singleStudent = null
			state.error = false
		},
		student_setSingleStudent: (state, action) => {
			state.pending = false
			state.allStudents = []
			state.singleStudent = action.payload.singleStudent
			state.error = false
		},
		student_delete_document: (state, action) => {
			state.pending = false
			state.singleStudent.fileStorage = state.singleStudent.fileStorage.filter(file => !action.payload.fileIDs.includes(file._id))
		},
		student_error: (state, action) => {
			state.pending = false
			state.error = action.payload
		},
		student_add_availability: (state, action) => {
			state.pending = false
			state.singleStudent.availability = [...state.singleStudent.availability, action.payload.newAvailability]
		},
		student_delete_availability: (state, action) => {
			state.pending = false
			state.singleStudent.availability = state.singleStudent.availability.filter(timeslot => timeslot._id !== action.payload.deleteAvailabilityID)
		},
		student_reset_availability: (state, action) => {
			state.pending = false
			state.singleStudent.availability = action.payload.newAvailability
		},
		student_setApplications: (state, action) => {
			state.pending = false
			state.applications = action.payload.applications
		},
		student_add_application: (state, action) => {
			state.pending = false
			state.applications = [...state.applications, action.payload.savedApplication]
		},
		student_delete_application: (state, action) => {
			state.pending = false
			state.applications = state.applications.filter(appl => appl.applicationID !== action.payload.deletedApplication.applicationID)
		}
	}
})

export const {
	student_pending,
	student_not_pending,
	student_setAllStudents,
	student_setSingleStudent,
	student_delete_document,
	student_error,
	student_showEditDataModal,
	student_hideEditDataModal,
	student_reset_availability,
	student_setApplications,
	student_add_application,
	student_delete_application,
	student_add_availability,
	student_delete_availability
} = studentSlice.actions

export default studentSlice.reducer