import { useEffect, useState } from "react";
import { projectAuth } from '../firebase/config'
import { useAuthContext } from "./useAuthContext";

export const useLogin = (email, password) => {
    const [isCancelled, setIsCancelled] = useState(false)

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { user, dispatch } = useAuthContext();

    const login = async () => {
        setError(null);
        setIsPending(true);

        try {   
            const response = await projectAuth.signInWithEmailAndPassword(email, password);   // this function returns a response object

            dispatch( {type: "LOGIN", payload: response.user} )
            if(!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch(err) {
            if(!isCancelled) {
                console.log(err.message);
                setError(err.message);        
                setIsPending(false);
            }
        }
    }
    // cleanup function
    useEffect(() => {
        return () => setIsCancelled(true)  
    }, []) 

    return { login, error, isPending };
}