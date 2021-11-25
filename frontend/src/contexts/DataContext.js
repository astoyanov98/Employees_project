import React, { createContext, useState } from "react";

export const DataContext = createContext({});

export const DataProvider = (props) => {
    const [employees, setEmployees] = useState([])
    return (
        <DataContext.Provider value={[employees, setEmployees]}>{props.children}</DataContext.Provider>
    )
}