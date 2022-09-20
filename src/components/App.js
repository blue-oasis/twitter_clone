import { useEffect ,useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

 useEffect(() => {
  authService.onAuthStateChanged((user) => {
    if (user) { //로그인 상태 변경
      setIsLoggedIn(user);
      setUserObj(user);
    } else {
      setIsLoggedIn(false);
    }
    setInit(true); //init 상태 변경
 });
 }, []);

 {/*함수 사용시 중괄호 감싸기 주석도... */}
  return (
  <>
   {init ? ( <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> ) 
   : (
    "initializing..."
  )} 
    
  </>
  );
}

export default App;
