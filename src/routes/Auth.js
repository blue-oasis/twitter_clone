import { useState } from "react";
import { authService } from "../fbase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
       const {
        target: {name, value},
       } = event;
       if (name == "email") {
        setEmail(value);
       } else if (name === "password") {
        setPassword(value);
       }
    };
    // 데이터 전송 시간 소요되므로 async , await 사용
    const onSunmit = async (event) => {
        event.preventDefault(); // submit시 새로고침 방지
        
        try {
            let data;
            if(newAccount) {
                // 회원가입
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                // 로그인
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
           setError(error.message);
        }
        
        
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = (event) => { // 소셜로그인 분기
        console.log(event.target.name);
    }

    return (
        <div>
            <form onSubmit={onSunmit}>
                <input name="email" type="email" placeholder="Email" required 
                    value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required
                    value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}> {/*버튼 누르면 글씨 바뀜 */}
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;
