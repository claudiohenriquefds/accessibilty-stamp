import React, { createContext, useState } from "react"

const PanelContext = createContext({

})

export const PanelProvider = ({ children }) => {
    const [data, setData] = useState(null)

    return (
        <PanelContext.Provider value={{ data, setData }}>
            {children}
        </PanelContext.Provider>
    )
}

export default PanelContext;
