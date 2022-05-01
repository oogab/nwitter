import React, { useEffect, useState } from 'react'
import AppRouter from 'components/AppRouter';
import { authService } from 'fbase'; 
import { onAuthStateChanged } from 'firebase/auth';
// import { getAuth, onAuthStateChanged } from 'firebase/auth'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)
  
  useEffect(() => {
    const auth = authService
    onAuthStateChanged(auth, (user) => {
      user ? setUserObj(user) : setUserObj(null)
      setInit(true)
    })
  }, [])

  return (
    <>
      { init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..." }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
