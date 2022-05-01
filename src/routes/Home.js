import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([])

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

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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