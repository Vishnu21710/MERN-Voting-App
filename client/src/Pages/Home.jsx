import React from 'react'
import Login from '../components/Login'
import { useSelector } from 'react-redux'
import Header from '../components/Header'

const Home = () => {
  const {userInfo} = useSelector(state=>state.user)
  
  return (
    <div>
      {
        userInfo ? <Header/> : <Login/>
      }
    </div>
  )
}

export default Home