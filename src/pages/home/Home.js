import styles from './Home.module.css'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'transactions', 
    ["user_id", "==", user.uid]                 // query
  );

  return (
    <div className={styles.container}>
        <div className={styles.content}>
          {/* transaction list */}
          {error && <p>{error}</p>}
          {documents && <TransactionList transactions={documents}/>}
        </div>

        <div className={styles.sidebar}>
          {/* transaction form */}
          <TransactionForm user_id={user.uid}/>
        </div>
    </div>
  )
}

export default Home