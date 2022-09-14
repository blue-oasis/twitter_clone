import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({isLoggedIn}) => {
// && => js and연산자 왼쪽 조건 ture면 오른쪽 값 반환
    return (
        <Router>
            {isLoggedIn && <Navigation />} 
            <Switch>
                {isLoggedIn ? ( //삼항연산자
                    <>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    </>
                ) : (
                    <Route exact path="/">
                        <Auth />
                    </Route>
                )}
               {/* <Redirect from="*" to="/" /> from 프롭스에서 스위치 내부의 route조건이 다 맞지않으면 to 주소로 이동 */}
            </Switch>
        </Router>
    );
};
// 삼항연산자로 로그인 여부에 따라 다른 페이지 랜더링
export default AppRouter;