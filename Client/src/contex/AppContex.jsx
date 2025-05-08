import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContex = createContext()


export const AppContexProvider = (props) => {

    const backendUrl = "https://job-portal-website-77il.onrender.com";

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)

    const [companyToken, setCompanyToken] = useState(null)
    const [userToken, setUserToken] = useState(null)

    const [companyData, setCompanyData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    //Function to fetch jobs
    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/jobs')
            if (data.success) {
                setJobs(data.jobs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to fetch company data
    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })
            if (data.success) {
                setCompanyData(data.company)
                console.log(data)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to fetch userdata
    const fetchUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/users/user', { headers: { token: userToken } })
            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    //Function to fetch user's applied applications
    const fetchUserApplications = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/users/applications',
                { headers: { token: userToken } }
            )
            if (data.success) {
                setUserApplications(data.application)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken')
        const storedUserToken = localStorage.getItem('userToken')
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }
        if (storedUserToken) {
            setUserToken(storedUserToken)
        }
    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    }, [companyToken])

    useEffect(() => {
        if (userToken) {
            fetchUserData()
            fetchUserApplications()
        }
    }, [userToken])

    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        showUserLogin, setShowUserLogin,
        companyData, setCompanyData,
        userToken, setUserToken,
        companyToken, setCompanyToken,
        userData, setUserData,
        backendUrl,
        userApplications, setUserApplications,
        fetchUserData,
        fetchUserApplications,

    }
    return (<AppContex.Provider value={value}>
        {props.children}
    </AppContex.Provider>
    )
}