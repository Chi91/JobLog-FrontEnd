import { createSlice } from '@reduxjs/toolkit'

export const jobSlice = createSlice({
	name: 'job',
	initialState: {
		showDeleteModal: false,
		job: null,
		ownJobs: [],
		allJobs: [],
		applicationsForOneJob: [],
		editedJob: null,
		error: null,
        pending: false,
		availabilityError: null,
		applicationError: null,
		prefilteredJobs: []
	},
	reducers: {
		job_show_delete_modal: state => {
			state.showDeleteModal = true
			state.pending = false
			state.error = null
		},
		job_hide_delete_modal: state => {
			state.showDeleteModal = false
			state.pending = false
			state.error = null
		},
        job_pending: state =>{
            state.pending = true
        },
		job_error: (state, action) =>{
            state.pending = false
			state.error = action.payload
        },
		job_setAllOwnJobs: (state, action) =>{
			state.ownJobs = action.payload.ownJobs
			state.pending = false
		},
		job_setOneJob: (state, action) =>{
			state.job = action.payload.job
			state.pending = false
		},
		job_setAllJobs: (state, action) => {
			state.allJobs = action.payload.jobs
			state.pending = false
			state.error = null
		},
		job_setApplicationsForOneJob: (state, action) => {
			state.applicationsForOneJob = action.payload.applications
			state.pending = false
			state.error = null
		},
		job_application_error: (state, action) => {
			state.pending = false
			state.applicationError = action.payload
		},
		job_availability_error: (state, action) => {
			state.pending = false
			state.availabilityError = action.payload
		},
		job_editJob: (state, action) => {
			state.pending = false
			state.editedJob = action.payload.editedJob
		},
		job_setPrefilteredJobs: (state, action) => {
			state.pending = false
			state.prefilteredJobs = action.payload.prefilteredJobs
		}
	}
})

export const {
	job_show_delete_modal,
	job_hide_delete_modal,
	job_pending,
	job_error,
	job_setAllOwnJobs,
	job_setOneJob,
	job_setAllJobs,
	job_setApplicationsForOneJob,
	job_application_error,
	job_availability_error,
	job_editJob,
	job_setPrefilteredJobs
} = jobSlice.actions

export default jobSlice.reducer