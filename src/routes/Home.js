import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { dbService } from "../fbase";

const Home = () => {
    const [tweet, setTweet] = useState(""); //텍스트를 상태로 관리하기 위해 useState 사용

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
    );
};

export default Home;