import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Auth from 'routes/Auth'
import Home from 'routes/Home'
import Profile from 'routes/Profile'
import Navigation from 'components/Navigation'

const AppRouter = ({ isLoggedIn, userObj, userDisplayName, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} userDisplayName={userDisplayName} />}
      <div 
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route path="/profile" element={<Profile userObj={userObj} userDisplayName={userDisplayName} refreshUser={refreshUser} />}/>
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  )
}

export default AppRouter