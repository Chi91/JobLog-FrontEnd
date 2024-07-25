import { createSlice } from '@reduxjs/toolkit'

export const companySlice = createSlice({
	name: 'company',
	initialState: {
		pending: false,
		allCompanies: [],
		singleCompany: null,
		error: null
	},
	reducers: {
		company_pending: state => {
			state.pending = true
		},
		company_setAllCompanies: (state, action) => {
			state.pending = false
			state.allCompanies = action.payload.allCompanies
			state.singleCompany = null
			state.error = null
		},
		company_setSingleCompany: (state, action) => {
			state.pending = false
			state.allCompanies = []
			state.singleCompany = action.payload.singleCompany
			state.error = null
		},
		company_error: (state, action) => {
			state.pending = false
			state.error = action.payload
		}
	}
})

export const { company_pending, company_setAllCompanies, company_setSingleCompany, company_error } = companySlice.actions

export default companySlice.reducer