import { useReducer, useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config"

// we create initialState as reference and we keep initalState outside of hook because I don't want new copy of response everytime the hook is used 
let initialState = {
    document: null,   // So when we made some kind of request to add a new document when firestores sends back an response, on that response object is the document you just created and it update this part of state to match that document that we get back 
    isPending: false,
    error: null,
    success: null    // boolean
}

const firestoreReducer = (state, action) => {
    switch(action.type) {

        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection reference
    const ref = projectFirestore.collection(collection)

    // add a document
    const addDocument = doc => {

    }

    // delete a document
    const deleteDocument = id => {

    }

    // cleanup function
    useEffect(()=>{
        return () => setIsCancelled(true)
    }, [])


    return { addDocument, deleteDocument, response }
}