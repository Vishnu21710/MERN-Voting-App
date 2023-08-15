import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './Pages/Home'
import store from './store/store'
import { Provider } from 'react-redux'
import Vote from './Pages/Vote'
import Register from './Pages/Register'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='/sign-up' element={<Register />} />
            <Route path='/vote' element={<Vote />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}

export default App