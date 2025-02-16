import React, { useContext} from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { AppContex } from '../contex/AppContex';
const Navbar = () => {
    const navigate = useNavigate()
    const { setShowRecruiterLogin, setShowUserLogin, userData, setUserToken, setUserData  } = useContext(AppContex)

    //function to logout for company
    const logout = () =>{
        setUserToken(null)
        localStorage.removeItem('userToken')
        setUserData(null)
        navigate('/')
    }
    
    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="" />
                {
                    userData
                        ? <div className='flex items-center gap-3'>
                            <Link to={'/applications'}>Applied Jobs</Link>
                            <p>|</p>
                            <p className='max-sm:hidden'>Hi, {userData.name}</p>
                            <div className='relative group'>
                                <img onClick={e=>setOption(true)} className='w-8 border rounded-full' src={userData.image} alt="" />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                    <button onClick={logout} className='bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer'>Logout</button>
                                </div>
                            </div>
                        </div>
                        : <div className='flex gap-4 max-sm:text-xs'>
                            <button onClick={e => setShowRecruiterLogin(true)} className='text-gray-600 cursor-pointer'>Recruiter Login</button>
                            <button onClick={e => setShowUserLogin(true)} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar;