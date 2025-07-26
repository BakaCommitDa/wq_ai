import {
    useEffect,
    useState
} from 'react';
import {
    Tabbar,
} from 'react-vant';
import {
    HomeO,
    Search,
    FriendsO,
    SettingO,
    UserO
} from '@react-vant/icons';
import {
    Outlet,
    useNavigate,
    useLocation
} from 'react-router-dom'

//菜单栏配置
const tabs = [
    { icon: <HomeO />, title: '首页', path: '/Home'},
    { icon: <Search />, title: '特惠专区', path: '/Discount'},
    { icon: <FriendsO />, title: '我的收藏', path: '/Collection'},
    { icon: <SettingO />, title: '行程', path: '/Trip'},
    { icon: <UserO />, title: '我的账户', path: '/Account'}
]

const MainLayout = () => {
    const [active, setActive] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{
        console.log(location.pathname,'///');
        // es6 使用power
        const index = tabs.findIndex(
            tab => location.pathname.startsWith(tab.path));
        setActive(index)
    })
    return (
        <>
            <Outlet />
            {/* tabbar */}
            <Tabbar value={active} onChange={
                (key) => {
                     setActive(key);
                    navigate(tabs[key].path)}
            }>
                {tabs.map((tab, index) => (
                    <Tabbar.Item 
                        key={index} 
                        icon={tab.icon}
                    > 
                    {tab.title}
                    </Tabbar.Item>
                ))}
            </Tabbar>
        </>
    )
}

export default MainLayout;