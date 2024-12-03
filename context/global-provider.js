import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser } from '../lib/appwrite';


// For global state overall the app...

// The createContext will provides a Provider component that wraps the parts of the component tree where the context will be accessible...
const GlobalContext = createContext();

// the useContext allows components to access the value stored in a Context...
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    // loading the user in...
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // If logged in before it gives access to the current user...
        getCurrentUser()
            .then((res) => {
                if(res) {
                    setIsLoggedIn(true);
                    setUser(res);
                }
                else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    },[]);


    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;