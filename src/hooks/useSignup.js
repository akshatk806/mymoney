import { useState } from "react"
import { projectAuth } from "../firebase/config"

const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    // once the user is submit the form then only we invoked the below function that comes from this hook
    const signup = async (email, password, displayName) => {
        setError(null);   // imaging we fill up the form and we click on submit button, we call this signup function which takes 3 arguments and then some kind of error and then firebase comes up the error
        // we set the error everytime we try to signup

        setIsPending(true);

        try {
            // signup the user
            const response = await projectAuth.createUserWithEmailAndPassword(email, password);
            console.log(response.user);  // user just created

            if(!response) {
                throw new Error("Could not complete signup");
            }

            // add the display name to user in DB
            await response.user.updateProfile( {displayName: displayName} );    // with response we get a user object

            setIsPending(false);
            setError(null);
        }
        catch(err) {
            // if signup fails then we catch the error
            console.log(err.message);
            setError(err.message);         // like email is already taken etc.
            setIsPending(false);
        }
    }

    return { error, isPending, signup };
}

export default useSignup