import './App.css'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// hooks
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar'

function App() {
  const { authIsReady, user } = useAuthContext()
  // now we don't see that flickering on navbar
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/"> 
              {/* if user is loggedin then only he can visit to Home page, protection of pages from attackers */}
              {!user && <Redirect to="/login" />}
              {user && <Home />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
