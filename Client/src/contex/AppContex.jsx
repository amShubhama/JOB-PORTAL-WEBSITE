import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContex = createContext()


export const AppContexProvider = (props) => {


    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    //Function to fetch jobs
    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
    }
    return (<AppContex.Provider value={value}>
        {props.children}
    </AppContex.Provider>
    )
}