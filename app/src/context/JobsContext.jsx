import React, { createContext, useState } from 'react';

export const JobsContext = createContext();

const initialState = {
    title: '',
    description: '',
    company: '',
    location: '',
    payment: '',
    date: '',
    
};

export const JobsProvider = ({children}) => {
    const [data, setData] = useState(initialState);

    return (
        <JobsContext.Provider value={{data, setData}} >
            {children}
        </JobsContext.Provider>
    )
}