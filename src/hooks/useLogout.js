import { useState } from "react";
import { projectAuth } from '../firebase/config'
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        // logout the user
        try {   
            await projectAuth.signOut();       // firebase log out our user

            // dispatch logout action
            dispatch( {type: "LOGOUT"} )
        }
        catch(err) {
            console.log(err.message);
            setError(err.message);        
            setIsPending(false);
        }
    }
    return { logout, error, isPending };
}