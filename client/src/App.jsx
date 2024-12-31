import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './components/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'

const App = () => {

  const {showRecruiterLogin} = useContext(AppContext)
  const {setShowRecruiterLogin} = useContext(AppContext)

  return (
    <div>
     {showRecruiterLogin &&  <RecruiterLogin/>}
      <Routes>
        <Route path='/' element ={<Home/>} ></Route>
        <Route path='/apply-job/:id' element ={<ApplyJob/>} ></Route>
        <Route path='/applications' element ={<Applications/>} ></Route>
        <Route path='/dashboard' element ={<Dashboard/>} >

          <Route path='add-job' element={<AddJob/>}></Route>
          <Route path='manage-jobs' element={<ManageJobs/>}></Route>
          <Route path='view-applications' element={<ViewApplications/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
