import { createContext, useReducer } from "react";

// that creates a new context for us which is now stored in AuthContext
export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type) {
        default:
            return state
    }
}

// custom AuthContext Provider component, which wrap the provider of 'AuthContext' context
export const AuthContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    // return the template
    return (
        // the below line is wrapping the entire App component (we passing the context value -> state and dispatch to every component)
        <AuthContext.Provider value={{ ...state, dispatch }}>      {/* here value is an object where 'dispatch' is the key in object value */}
            { children }         {/* children prop, App component is children */}
        </AuthContext.Provider>
    )
}

// Now we have AuthContextProvider Component which we wanna wrap around entire application in index.js 


