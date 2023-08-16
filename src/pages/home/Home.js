import styles from './Home.module.css'

import { useAuthContext } from '../../hooks/useAuthContext'

import TransactionForm from './TransactionForm'

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div className={styles.container}>
        <div className={styles.content}>
          transaction list
        </div>

        <div className={styles.sidebar}>
          {/* transaction form */}
          <TransactionForm user_id={user.uid}/>
        </div>
    </div>
  )
}

export default Home