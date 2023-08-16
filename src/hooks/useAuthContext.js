import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    // now this context is now an object which is value = {{...state, dispatch}} now
    /*
    here context = {
        user: {
            -----
            -----
            -----
            email:
            displayName:
            -----
            -----
        },
        dispatch: f
    }
    */

    // We are wrapping our context in entire application, but if you this context in another way like just wrapping a subtree of components then it would cause a problem if we try to access context outside of that subtree of components so we do this additional check
    if(!context) {
        throw new Error('useAuthContext must be inside an AuthContextProvider')
    }

    return context; 
    // if we use this hook i.e, useAuthContext in another component then we are getting this 'context' back from it
}

// Now when we used useAuthContext hook inside some component or inside another hook then we gonna we able to acces the user in global state