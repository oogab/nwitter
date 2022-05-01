import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { dbService, storageService } from "fbase";
import { collection, addDoc, getDocs, onSnapshot, doc } from "firebase/firestore";
import { ref, uploadString } from "firebase/storage"
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("")
  const [nweets, setNweets] = useState([])
  const [attachment, setAttachment] = useState()

  // console.log(userObj)
  const getNweets = async () => {
    const dbNweets = await getDocs(collection(dbService, "nweets"))
    // console.log(dbNweets)
    dbNweets.forEach(document => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      }
      setNweets(prev => [nweetObject, ...prev])
    })
  }

  useEffect(() => {
    getNweets()
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setNweets(nweetArray)
    })
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    const fileRef = ref(storageService, `${userObj.uid}/${v4()}`)
    const response = await uploadString(fileRef, attachment, "data_url")
    console.log(response)
    // await addDoc(collection(dbService, "nweets"), {
    //   text: nweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // })
    // setNweet("")
  }
  const onChange = (event) => {
    const {target:{value}} = event
    setNweet(value)
  }
  const onFileChange = (event) => {
    const {target:{files}} = event
    const theFile = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(theFile)
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent)
      const {currentTarget: {result}} = finishedEvent
      setAttachment(result)
    }
    // console.log(theFile)
  }
  const onClearAttachment= () => setAttachment(null)
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map(nweet => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  )
}

export default Home