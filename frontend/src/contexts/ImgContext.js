import React, { createContext, useState } from "react";

export const ImgContext = createContext({});

export const ImgProvider = (props) => {
    const [imgResized, setImgResized] = useState('')
    return (
        <ImgContext.Provider value={[imgResized, setImgResized]}>{props.children}</ImgContext.Provider>
    )
}