import React, { createContext, useState } from "react"

const HistoryContext = createContext({

})

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState(null)
    // eslint-disable-next-line prefer-const
    let [sites, setSitesHistory] = useState([])

    return (
        <HistoryContext.Provider value={{ history, setHistory, sites, setSitesHistory }}>
            {children}
        </HistoryContext.Provider>
    )
}

export default HistoryContext;
