import { createContext, useState } from "react";

export const DocContext = createContext(null);

const DocProvider = ({children})=>{
    const [file,setFile] = useState()
    const [pdf,setPdf] = useState();
    return (
        <DocContext.Provider value={{file,setFile,pdf,setPdf}}>{children}</DocContext.Provider>
    )
}

export default DocProvider;