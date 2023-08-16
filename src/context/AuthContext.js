import { createContext, useReducer } from "react";

// that creates a new context for us which is now stored in AuthContext
export const AuthContext = createContext();

// when dispatch function is called the control moves here
export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN': 
            return { ...state, user: action.payload } // the user key in this object is override(we update our global auth state)

        case 'LOGOUT':
            return { ...state, user:null }    // we update our global auth state

        default:
            return state
    }
}

// custom AuthContext Provider component, which wrap the provider of 'AuthContext' context
export const AuthContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(authReducer, {     // whenever the dispatch is called then this component 'AuthContextProvider' is re-rendered again, in short this component function 'AuthContextProvider' is called again
        user: null
    });

    console.log('AuthContext state:', state)   // whenever the state changes in component the component is revaluates

    // return the template
    return (
        // the below line is wrapping the entire App component (we passing the context value -> state and dispatch to every component)
        <AuthContext.Provider value={{ ...state, dispatch }}>      {/* here value is an object where 'dispatch' is the key in object value */}
            { children }         {/* children prop, App component is children */}
        </AuthContext.Provider>
    )
}

// Now we have AuthContextProvider Component which we wanna wrap around entire application in index.js 


