import {
    Link
} from 'react-router-dom'
import {useUserStore} from '../../store/user'
const NavBar = () => {
    const { isLogin, user, logout } = useUserStore();
    console.log(isLogin, user, '/////')
    return (
        <nav style={{padding:10, borderBottom: '1px solid #ccc'}}>
            <Link to="/">Home</Link>&nbsp;
            <Link to="/pay">Pay</Link>&nbsp;
            {
                isLogin ? (
                    <>
                    <span>欢迎, {user.username}</span>&nbsp;
                    <button onClick={logout}>Logout</button>
                    </>
                ): (
                    <Link to="/login">Login</Link>
                )
            }
        </nav>
    )
}
export default NavBar;