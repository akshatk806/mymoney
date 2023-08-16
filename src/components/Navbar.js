import styles from './Navbar.module.css'

import { Link } from 'react-router-dom'

// hooks
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout();
  const context = useAuthContext();   // global context

  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.title}><Link to="/">myMoney</Link></li>

            {!context.user && /* returning a fragement or template */(
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}

            {context.user && (
              <>
                <li>Hello, {context.user.displayName}</li>
                <li>
                  <button className='btn' onClick={logout}>Logout</button>
                </li>
              </>
            )}    
        </ul>
    </nav>
  )
}

export default Navbar