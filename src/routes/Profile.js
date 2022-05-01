import React, { useState, useEffect } from "react";
import { authService, dbService } from "fbase";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  // const navigate = useNavigate()
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

  const onLogOutClick = () => {
    authService.signOut()
    // navigate("/")
  }

  const onChange = (event) => {
    const {
      target: {value},
    } = event
    setNewDisplayName(value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName
      })
      refreshUser(newDisplayName)
    }
  }

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data())
    })
  }

  useEffect(() => {
    getMyNweets()
  }, [])

  return (
    <>
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10
          }}
        />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}
export default Profile