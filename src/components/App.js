import React, { useEffect, useState } from 'react'
import AppRouter from 'components/AppRouter';
import { currentUser } from 'fbase';    
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  // const auth = getAuth()
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser)

  useEffect(() => {
    onAuthStateChanged((user) => {
      console.log(user)
    })
  }, [])

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
