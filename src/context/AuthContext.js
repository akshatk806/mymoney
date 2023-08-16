import { createContext, useEffect, useReducer } from "react";

// firebase
import { projectAuth } from '../firebase/config'

// that creates a new context for us which is now stored in AuthContext
export const AuthContext = createContext();

// when dispatch function is called the control moves here
export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN': 
            return { ...state, user: action.payload } // the user key in this object is override(we update our global auth state)

        case 'LOGOUT':
            return { ...state, user:null }    // we update our global auth state

        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady:true }
            
        default:
            return state
    }
}

// custom AuthContext Provider component, which wrap the provider of 'AuthContext' context
export const AuthContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(authReducer, {     // whenever the dispatch is called then this component 'AuthContextProvider' is re-rendered again, in short this component function 'AuthContextProvider' is called again
        user: null,
        authIsReady: false    // The idea is when we use this property inside our App.js component, we don't want to show all of component tree untill authIsReady is true 
        // when this authIsReady property is true then only we render component
    });

    // When we first load the application in the browser we perform a check inside this component and that check is communicating with firebase basically to say look do we have a user currently logged in and firebase is say yes or no and we update our user propery appropriately, but once we perform the check we also turn authIsReady to be true and that's point how we render our component 

    // fires some code when our react Application first renders(useEffect)
    useEffect(()=>{
        // onAuthStateChanged function is going to communicate with firebase and say look I want you to tell me whenever some kind of change in Authentication status and when there is I want you to fire some function, and inside this function we take user
        const unsub = projectAuth.onAuthStateChanged((user) => {
            // If we fire this function and Authentication changed is user logout then user is null also this callback function fires ones when we first asked firebase this question, so when we first connect to firebase firebase is going to look and say that we have the user or not and it sent back inital response-> user as response if loggedIn otherwise null 

            // So onAuthStateChanged method it fires a function once when we first communicate with firebase to check the user to begin with when we first reload the page and then also every time there is change in user Authentication so if in future the user logged out then it sends back that information to fires this function and if in future if user login again it going to sent back that information to us and it is fires this function      

            dispatch({ type: 'AUTH_IS_READY', payload: user });   // the callback function is fires everytime when there is some kind of authentication state change, so if in the future after perfrom this intial check the user logs in or out we also fires this function then and we don't need to do that anymore we only need to do this once initally to find out inital user. So we have to cancel this type of subscription to authentication status once we perform the dispatch once
            unsub()    // and now the function is never going to fire away we just perform the check once we begin it
        })

        // so this function (projectAuth.onAuthStateChanged) returns a function which is stored in unsub
        // and one we invoked the function unsub it unsubscribed from onAuthStateChanged Listener
    },[])

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


