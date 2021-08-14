import React, { createContext, useState } from "react"

const HistoryContext = createContext({

})

export const HistoryProvider = ({ children }) => {
    const [dataHistory, setDataHistory] = useState(null)

    return (
        <HistoryContext.Provider value={{ dataHistory, setDataHistory }}>
            {children}
        </HistoryContext.Provider>
    )
}

export default HistoryContext;
