import { Link } from "react-router-dom"; //리액트에서는 Link로 페이지 이동

const Navigation = () => {
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">My Profile</Link>  {/* Rotuer에 연결할 페이지 import해야 작동 */}
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;