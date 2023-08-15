import { useState } from "react";
import { projectAuth } from '../firebase/config'
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(err);
        setIsPending(true);

        // logout the user
        try {   
            await projectAuth.signOut()

            // dispatch logout action
            dispatch( {type: "LOGOUT"} )
        }
        catch(err) {
            onsole.log(err.message);
            setError(err.message);        
            setIsPending(false);
        }
    }
}