import styles from './toast.module.css'
import {
    useEffect,
    useState
} from 'react'
import {toastEvents} from './ToastController'


const Toast = (props) => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({
        user:0,
        bell:0,
        mail:0,

    });
    useEffect(()=>{
        const show = (info) => {
            setData(info);
            setVisible(true);
            const timer = setTimeout(()=>setVisible(false),3000)
        }
        // toastEvents 是mitt的实例
        // 自定义事件 show是事件的名字
        // on 监听一个事件
        // 订阅了show的事件，订阅者
        toastEvents.on('show',show)
         return()=>{
            toastEvents.off('show',show);
            clearTimeout(timer);
        }
    },[])
    // 等着通信都到来
    // 事件机制
    if(!visible) return null;
    return(
        <div className={styles.toastWrapper}>
            <div className={styles.toastItem}>👤 {data.user}</div>
            <div className={styles.toastItem}>🔔 {data.bell}</div>
            <div className={styles.toastItem}>✉️ {data.mail}</div>
            <div className={styles.toastArrow}></div>
        </div>
    )
}



export default Toast;