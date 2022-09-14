import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { dbService } from "../fbase";
import { async } from "@firebase/util";

const Home = () => {
    const [tweet, setTweet] = useState(""); //텍스트를 상태로 관리하기 위해 useState 사용
    const [tweets, setTweets] = useState([]);

    const getTweets = async () => {
        const dbTweets = await getDocs(collection(dbService, "tweets"));
        
        dbTweets.forEach((document) => {
        const tweetObject = { ...document.data(), id: document.id };
        setTweets((prev) => [tweetObject, ...prev]) //전개 구문으로 데이터 순서대로 쌓기
        });         //prev에 순회 이전의 상태가 넘어옴, 새 데이터와 합쳐서 저장
    };

    useEffect(() => {
        getTweets();
    }, []);


    const onSubmit = async (event) => { //원래의 이벤트 방지(새로고침 방지)
        event.preventDefault();
        await addDoc(collection(dbService ,"tweets"), {
            text: tweet,
            createdAt: Date.now(),
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
                <div key={tweet.id}>
                    <h4>{tweet.text}</h4>
                </div>
            ))}
        </div>
        </>
    );
};

export default Home;