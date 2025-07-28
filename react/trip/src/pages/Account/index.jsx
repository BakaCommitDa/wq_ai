import useTitle from '@/hooks/useTitle'
import {
    useState
}from 'react'
import{
    Image,
    Cell,
    CellGroup,
    ActionSheet,
    Popup,
    Loading
}from 'react-vant'
import{
    ServiceO,
    FriendsO,
    StarO,
    SettingO,
    UserCircleO
}from '@react-vant/icons'
import styles from './account.module.css'
import{
    generateAvatar
}from '@/llm'



const Account = () => {
    const [userinfo,setUserinfo] = useState({
        nickname:'嚅嚅',
        level:'5级',
        slogan:'帅的惊动党中央~',
        avatar:'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'

    })
    useTitle('我的')

    const [showActionSheet,setShowActionSheet] = useState(false)
    const handleAction = async(e) =>{
        console.log((e));
        if(e.type === 1){
            // AI 生成头像 
            const text = `
            昵称: ${userinfo.nickname}
            slogan: ${userinfo.slogan}
            `;
            const newAvatar = await generateAvatar(text);
        }else if(e.type === 2){
            // 图片上传
        }
        
    }
    const actions = [
        {
            name:'AI生成头像',
            color:'#ee0a24',
            type:1
        },
        {
            name:'上传头像',
            color:'#007AFF',
            type:2
        }
    ]


    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image
                    round
                    width='64px'
                    height='64px'
                    src={userinfo.avatar}
                    style={{cursor:'pointer'}}
                    onClick={()=>setShowActionSheet(true)}
                />
            <div className='ml4'>
                <div className={styles.nickname}>昵称：{userinfo.nickname}</div>
                <div className={styles.level}>等级：{userinfo.level}</div>
                <div className={styles.slogan}>签名：{userinfo.slogan}</div>

            </div>
            </div>

            <div className='mt3'>
                <CellGroup inset>
                    <Cell title="服务" icon={<ServiceO />} isLink />
                </CellGroup>

                <CellGroup inset className='mt2'>
                    <Cell title="收藏" icon={<StarO />} isLink />
                    <Cell title="朋友圈" icon={<FriendsO />} isLink />
                </CellGroup>

                <CellGroup inset className='mt2'>
                <Cell title="设置" icon={<SettingO />} isLink />
                </CellGroup>
            </div>

            <div>
                <ActionSheet
                    visible={showActionSheet}
                    actions={actions}
                    cancelText='取消'
                    onCancel={()=>setShowActionSheet(false)}
                    onSelect={(e)=>handleAction(e)}
                >
                </ ActionSheet>
            </div>
        </div>
    )
}
export default Account