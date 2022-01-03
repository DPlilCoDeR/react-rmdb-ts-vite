import { useState, createContext} from "react";


export const Context = createContext({});

const UserProvider = ({ children }:any) => {
    const [state, setState] = useState(undefined);

    return(
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    )
}


export default UserProvider