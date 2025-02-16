import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContex } from '../contex/AppContex'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function UserLogin() {

    const navigate = useNavigate();
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(false)
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false)

    const { setShowUserLogin, backendUrl, setUserToken, setUserData, userData } = useContext(AppContex)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (state === "Sign Up" && !isTextDataSubmitted) {
            return setIsTextDataSubmitted(true)
        }

        try {
            if(state === "Login"){
                const {data} = await axios.post(backendUrl + '/api/users/login',{email,password})
                if(data.success){
                    setUserData(data.user);
                    setUserToken(data.token);
                    localStorage.setItem('userToken',data.token);
                    setShowUserLogin(false);
                    navigate('/');
                    toast.success(data.message);
                }else {
                    toast.error(data.message);
                }
            }else{
                const formData = new FormData();
                formData.append('name',name)
                formData.append('password',password)
                formData.append('email',email)
                formData.append('image',image)
                const {data} = await axios.post(backendUrl+'/api/users/register',formData)
                if(data.success){
                    console.log(data);
                    setUserData(data.user);
                    setUserToken(data.token);
                    localStorage.setItem('userToken',data.token);
                    setShowUserLogin(false);
                    navigate('/');
                    toast.success(data.message);
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message);
        }

    }

    



    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])


    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>User {state}</h1>
                <p className='text-sm'>Welcome back! Please sign in to continue</p>

                {state === 'Sign Up' && isTextDataSubmitted
                    ? <>
                        <div className='flex items-center gap-4 my-10'>
                            <label htmlFor="image">
                                <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
                            </label>
                            <p>Upload user <br /> picture</p>
                        </div>
                    </>
                    : <>
                        {state !== 'Login' && (
                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                <img src={assets.person_icon} alt="" />
                                <input className='outline-none text-sm' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Candidate Name' required />
                            </div>
                        )}

                        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <img src={assets.email_icon} alt="" />
                            <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required />
                        </div>
                        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <img src={assets.lock_icon} alt="" />
                            <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
                        </div>
                    </>
                }

                {state === 'Login' && <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forget password?</p>}
                <button type='Submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-5 cursor-pointer'>
                    {state === 'Login' ? 'login' : isTextDataSubmitted ? 'cretae account' : 'next'}
                </button>
                {
                    state === 'Login'
                        ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>
                        : <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span></p>
                }
                <img onClick={e => setShowUserLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
            </form>
        </div>
    )
}

export default UserLogin