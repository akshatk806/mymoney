import { useEffect, useState } from "react"

import { useFirestore } from "../../hooks/useFirestore";

const TransactionForm = (props) => {
    // state variables
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const { addDocument, response } = useFirestore('transactions');    // 'transactions' is a collection

    const handleSubmit = e => {
        e.preventDefault();
        // console.log({
        //     name,
        //     amount
        // })

        // add document
        addDocument({
            user_id: props.user_id,
            name, 
            amount
        })
    }

    // after we added the document (means filling the transaction form) we have to clear the field
    useEffect(()=>{
        if(response.success) {
            // reset form field
            setName('');
            setAmount('');
        }
    }, [response.success])

  return (
    <>
        <h3>Add a Transaction</h3>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Transaction name:</span>
                <input 
                    type="text"
                    required
                    onChange={e => setName(e.target.value)}
                    value={name} 
                />
            </label>

            <label>
                <span>Amount (in ₹):</span>
                <input 
                    type="number"
                    required
                    onChange={e => setAmount(e.target.value)}
                    value={amount} 
                />
            </label>
            <button>Add Transaction</button>
        </form>
    </>
  )
}

export default TransactionForm