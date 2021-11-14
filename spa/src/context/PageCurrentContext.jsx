import React, { createContext, useState } from "react"

const PageCurrentContext = createContext({

})

export const PageCurrentProvider = ({ children }) => {
    const [pageCurrent, setPageCurrent] = useState('?page=1')

    return (
        <PageCurrentContext.Provider value={{ pageCurrent, setPageCurrent }}>
            {children}
        </PageCurrentContext.Provider>
    )
}

export default PageCurrentContext;
