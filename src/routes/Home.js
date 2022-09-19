import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { dbService } from "../fbase";
import Tweet from "../components/Tweet";


const Home = ({ userObj }) => {
    console.log(userObj);
    const [tweet, setTweet] = useState(""); //텍스트를 상태로 관리하기 위해 useState 사용
    const [tweets, setTweets] = useState([]);

   /* const getTweets = async () => {
        const dbTweets = await getDocs(collection(dbService, "tweets"));
        
        dbTweets.forEach((document) => {
        const tweetObject = { ...document.data(), id: document.id };
        setTweets((prev) => [tweetObject, ...prev]) //전개 구문으로 데이터 순서대로 쌓기
        });         //prev에 순회 이전의 상태가 넘어옴, 새 데이터와 합쳐서 저장
    }; onSnapshot 적용 위해 주석처리 */

    useEffect(() => {
        onSnapshot(collection(dbService, "tweets"), (snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setTweets(newArray);
        });
    }, []);

    const onSubmit = async (event) => { //원래의 이벤트 방지(새로고침 방지)
        event.preventDefault();
        await addDoc(collection(dbService ,"tweets"), {
            text: tweet,
            createdAt: Date.now(),
            createId: userObj.uid,
        });
       setTweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
          target: { value },
        } = event;
        setTweet(value);
      };

    return (
        <>
        <form onSubmit={onSubmit}>
            <input
                value={tweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input type="submit" value="Tweet" />
        </form>
        <div>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} 
                tweetObj={tweet}
                isOwner={tweet.createId === userObj.uid}
                />
            ))}
        </div>
        </>
    );
};

export default Home;