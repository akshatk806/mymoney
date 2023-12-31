import { useState } from 'react';

// signup hook
import { useSignup } from '../../hooks/useSignup'

import styles from './Signup.module.css'

const Signup = () => {
  // states for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const { signup, isPending, error } = useSignup(); 

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(email, password, displayName)
    signup(email, password, displayName);   // we try to signup the user with email, password and display
  }

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
        <h2>Signup</h2>
        <label>
          <span>Email:</span>
          <input 
            type="email" 
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label>
          <span>Password:</span>
          <input 
            type="password"
            onChange={e => setPassword(e.target.value)} 
            value={password}
          />
        </label>

        <label>
          <span>Display Name:</span>
          <input 
            type="text"
            onChange={e => setDisplayName(e.target.value)} 
            value={displayName}
          />
        </label>

        {!isPending && <button className="btn">Signup</button>}
        {isPending && <button className="btn" disabled>loading...</button>}

        {error && <p style={{color:"red"}}>{error}</p>}
    </form>
  )
}

export default Signup