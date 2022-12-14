import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {Provider} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducers from './redux/reducers'

export const store = configureStore({
  reducer: reducers,
})



ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));