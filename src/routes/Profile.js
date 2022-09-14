import { authService } from "../fbase";
import { useHistory } from "react-router-dom"; //주소이동 history 사용

const Profile = () =>{
    const history = useHistory();

    const onLogOutClick = () =>{
        authService.signOut();
        history.push("/"); //로그아웃시 / 로 이동
    }; 

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;