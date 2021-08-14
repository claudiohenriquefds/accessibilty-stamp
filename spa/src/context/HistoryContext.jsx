import React, { createContext, useState } from "react"

const HistoryContext = createContext({

})

export const HistoryProvider = ({ children }) => {
    const [dataHistory, setDataHistory] = useState(null)
    // eslint-disable-next-line prefer-const
    let [sitesHistory, setSitesHistory] = useState([])

    return (
        <HistoryContext.Provider value={{ dataHistory, setDataHistory, sitesHistory, setSitesHistory }}>
            {children}
        </HistoryContext.Provider>
    )
}

export default HistoryContext;
