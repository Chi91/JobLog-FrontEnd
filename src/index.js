import React from 'react'
import ReactDOM from 'react-dom/client'

// redux
import store from './redux/store'
import { Provider } from 'react-redux'

// react router
import { BrowserRouter } from 'react-router-dom'

// components
import App from './App'

// fontAwesome
import './assets/fontawesome-free-6.2.0-web/css/all.min.css'

//css
import './styles/css/style.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	

)
