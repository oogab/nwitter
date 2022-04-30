import React, { useState } from "react";
// import { auth, createUserWithEmail, signInWithEmail } from "fbase";
import { authService } from "fbase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState("")

  const onChange = (event) => {
    const {target: {name, value}} = event
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const auth = authService
    if (newAccount) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log(cred.user)
        })
        .catch((error) => {
          console.log(error.message)
          setError(error.message)
        })
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log(cred.user)
        })
        .catch((error) => {
          console.log(error.message)
          // setError(error)
        })
    }
    // try {
    //   let data
    //   if (newAccount) {
    //     // create account
    //     data = await createUserWithEmail(auth, email, password)
    //   } else {
    //     // log in
    //     data = await signInWithEmail(auth, email, password)
    //   }
    //   console.log(data)
    // } catch (error) {
    //   console.error(error)
    // }
  }

  const toggleAccount = () => setNewAccount((prev) => !prev)
  const onSocialClick = async (event) => {
    // console.log(event.target.name)
    const {
      target:{name},
    } = event
    let provider
    if (name === "google") {
      provider = new GoogleAuthProvider()
    } else if (name === "github") {
      provider = new GithubAuthProvider()
    }
    const data = await signInWithPopup(authService, provider)
    console.log(data)
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
        <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
        { error }
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign In." : "Create Account"}</span>
      <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  ) 
}
export default Auth