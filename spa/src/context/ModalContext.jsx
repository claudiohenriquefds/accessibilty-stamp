import React, { createContext, useState } from "react"

const ModalContext = createContext({

})

export const ModalProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();

    return (
        <ModalContext.Provider value={{ open, setOpen, content, setContent }}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContext;
