import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)   // the documents we retreive from collection i.e, transaction
    const [error, setError] = useState(null)

    // if we don't use a ref --> infinite loop in useEffect because of reference types as dependency in useEffect
    const query = useRef(_query).current      // actual array value

    const orderBy = useRef(_orderBy).current  // order the transactions on the basis of createdAt

    useEffect(()=>{
        // real time listener of collection to firestore
        let ref = projectFirestore.collection(collection)

        if(query) {
            ref = ref.where(...query)
        }
        if(orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        // onSnapshot function fires a function for us everytime when we get the snapshot back from firestore collection. We get snapshot back once initially when we first made the connection and it sends us back a snapshot as argument inside function 
        const unsubscribe = ref.onSnapshot(snapshot => {      // this snapshot represents that collection at that moment in time we first connect to the collection which contains all the document to it. Thereafter it will fire this callback function again whenever the firestore collection changes
            // So if we add a new document, delete a document or update a document then its gonna sends us a new snapshot and fires callback function again and therefore wecan update our states               
            let results = [];

            // .docs -> array of documents from snapshot
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })    // doc = {name, amount, user_id, createdAt}
            })

            setDocuments(results)
            setError(null)
        }, (error)=>{
            console.log(error);
            setError('could not fetch the data')
        })
        
        // unsubscribe on unmount
        return () => unsubscribe();

    }, [collection, query, orderBy])

    return { documents, error }
}