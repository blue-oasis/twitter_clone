import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { dbService, storageService} from "../fbase";
import Tweet from "../components/Tweet";
import { v4 as uuidv4 } from 'uuid'; //아이디 라이브러리, 파이어스토리지 문서 아이디 부여 위함 uuidv4();
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, uploadString } from "firebase/storage";

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState(""); //텍스트를 상태로 관리하기 위해 useState 사용
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState(""); // 이미지 url관리

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
        /* await addDoc(collection(dbService ,"tweets"), {
            text: tweet,
            createdAt: Date.now(),
            createId: userObj.uid,
        });
       setTweet(""); */
       
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`); //스토리지 폴더(사용자 아이디), 파일 이름 생성(uuid)
        console.log(fileRef);
        const response = await uploadBytes(fileRef, File, 'data_url'); //스토리지 업로드
        console.log(response);

        const FileURL = await getDownloadURL(ref(storageService, fileRef));
        console.log(FileURL);
        const content = {
            text: tweet,
            created: Date.now(),
            createId: userObj.uid,
            FileURL,
        }
        await addDoc(collection(dbService, 'tweets'),content);
        setTweet("");
        setAttachment("");
      
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
          target: { value },
        } = event;
        setTweet(value);
      };

      const onFileChange = (event) => {
       const {
        target: { files },
       } = event;
       const theFile = files[0]; //파일 정보 저장 배열
       const reader = new FileReader(); //파일 다루기 위한 객체 생성
       reader.onloadend = (finishedEvent) => {
        const { //구조 분해 할당
            currentTarget: { result }, //분해하려는 객체의 프로퍼티: 목표 변수
        } = finishedEvent;
        setAttachment(result);
       };
       reader.readAsDataURL(theFile); // 파일 정보 인자로 받아서 위치 url반환, 시점관리 필요
      };

      const onClearAttachment = () => setAttachment(""); //파일첨부 취소

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
            <input type="file" accept="image/*" onChange={onFileChange} /> {/*파일 첨부, accept로 이미지 파일만 허용*/}
            <input type="submit" value="Tweet" />
            {attachment &&(
             <div>
                <button onClick={onClearAttachment}>Clear</button>
                <img src={attachment} width="50px" height="50px" />
             </div>
            )} {/* attachmen가 있는 경우에만 <img>출력  */}
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