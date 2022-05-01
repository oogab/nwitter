import React, { useEffect, useState } from 'react'
import AppRouter from 'components/AppRouter';
import { authService } from 'fbase'; 
import { onAuthStateChanged } from 'firebase/auth';
// import { getAuth, onAuthStateChanged } from 'firebase/auth'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)
  const [userDisplayName, setUserDisplayName] = useState("")

  useEffect(() => {
    const auth = authService
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj(user)
        setUserDisplayName(user.displayName)
      } else {
        setUserObj(null)
      }
      setInit(true)
    })
  }, [])
  
  const refreshUser = (newDisplayName) => {
    setUserObj(authService.currentUser)
    setUserDisplayName(newDisplayName)
  }

  return (
    <>
      { init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} userDisplayName={userDisplayName} refreshUser={refreshUser} /> : "Initializing..." }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
