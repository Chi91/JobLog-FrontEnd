import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authentication/authenticationSlice'
import companySlice from './company/companySlice'
import registrationSlice from './registration/registrationSlice'
import studentSlice from './student/studentSlice'
import jobSlice from './job/jobSlice'
import dataSlice from './data/dataSlice'

export default configureStore({
	reducer: {
		authentication: authenticationReducer,
		registration: registrationSlice,
		student: studentSlice,
		company: companySlice,
		job: jobSlice,
		data: dataSlice
	}
})