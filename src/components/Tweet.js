import { dbService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        console.log(ok);
        if (ok) {
            console.log(tweetObj.id);
            const data = deleteDoc(doc(dbService, "tweets", tweetObj.id));
            console.log(data);
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewTweet(value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        updateDoc(doc(dbService, "tweets", tweetObj.id), { text: newTweet });
        setEditing(false);
    }

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newTweet} required />
                        <input type="submit" value="Update Tweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                 <h4>{tweetObj.text}</h4>
                 {tweetObj.FileURL && (
                    <img src={tweetObj.FileURL} width="50px" height="50px" />
                 )}
                {isOwner && (
                <>
                <button onClick={onDeleteClick}>Delete Tweet</button>
                <button onClick={toggleEditing}>Edit Tweet</button>
                </>
                )}
                </>
            )}
       </div>
    );
};

export default Tweet;