import React, {useState, useEffect} from 'react';
import Tweet from 'components/Tweet';
import { dbService } from 'fbase';
import TweetFactory from 'components/TweetFactory';


function Home() {
    const [tweets, setTweets] = useState([]);
    
    // 기존에 많이 사용되던 방식
    /* const getTweets = async () => {
        const result = await dbService.collection("Tweet").get();
        result.forEach(document => {
            const tweetObj = {
                ...document.data(),
                id: document.id
            }
            setTweets((prev) => [tweetObj, ...prev])
        })
    } */

    useEffect(() => {
        // 실시간으로 데이터베이스의 변경을 적용시킴!!
        dbService.collection("Tweet").onSnapshot(snapshot => {
            const tweetArray = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setTweets(tweetArray);
        })
    }, []);


    

    return (
        <div className="container">
            <TweetFactory />
            <div className="tweet-list">
                {tweets.map((tweet) => (
                    <Tweet tweet={tweet} key={tweet.id} />
                ))}
            </div>
        </div>   
    )
}
export default Home;
