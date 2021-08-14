import React, { createContext, useState } from "react"

const PanelContext = createContext({

})

export const PanelProvider = ({ children }) => {
    const [dataPanel, setDataPanel] = useState(null)

    return (
        <PanelContext.Provider value={{ dataPanel, setDataPanel }}>
            {children}
        </PanelContext.Provider>
    )
}

export default PanelContext;
