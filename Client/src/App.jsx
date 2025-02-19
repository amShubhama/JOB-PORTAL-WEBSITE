import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Application from './pages/Application'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContex } from './contex/AppContex'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplication from './pages/ViewApplication'
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserLogin from './components/UserLogin'



const App = () => {
  const { showRecruiterLogin, showUserLogin, companyToken } = useContext(AppContex)

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      {showUserLogin && <UserLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply/job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Application />} />
        {
          companyToken ?
            <>
              <Route path='/dashboard' element={<Dashboard />}>
                <Route path='add-job' element={<AddJob />} />
                <Route path='manage-jobs' element={<ManageJobs />} />
                <Route path='view-applications' element={<ViewApplication />} />
              </Route>
            </> : null
        }
      </Routes>
    </div>
  )
}

export default App