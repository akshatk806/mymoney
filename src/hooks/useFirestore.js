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
        case 'IS_PENDING':
            return { isPending:true, document: null, success: false, error: null }

        case 'ADDED_DOCUMENT':
            return { isPending:false, document: action.payload, success: true, error: null }
        
        case 'ERROR':
            return { isPending:false, document: null, success: false, error: action.payload }     

        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection reference
    const ref = projectFirestore.collection(collection)

    // only dispatch is not cancelled
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled) {
            dispatch(action)
        }
    }

    // add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const addedDocument = await ref.add(doc)  // adding a document to collection
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })   // addedDocument is a reference of document that we get back
        } 
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    // delete a document
    const deleteDocument = async (id) => {

    }

    // cleanup function
    useEffect(()=>{
        return () => setIsCancelled(true)
    }, [])


    return { addDocument, deleteDocument, response }
}