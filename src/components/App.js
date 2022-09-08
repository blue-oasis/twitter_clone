import { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
 {/*함수 사용시 중괄호 감싸기 주석도... */}
  return (
  <>
    <AppRouter isLoggedIn={isLoggedIn} />
    <footer>&copy; {new Date().getFullYear()} twiiter </footer> 
  </>
  );
}

export default App;
