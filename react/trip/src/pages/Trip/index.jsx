import{
    useEffect,
    useState
}from 'react'
import useTitle from '@/hooks/useTitle'
import{
    chat,
    kimichat
}from '@/llm'
import styles from './trip.module.css'
import{
    Input,
    Button,
    Loading,
    Toast,
}from 'react-vant'
import{
    ChatO,
    UserO
}from '@react-vant/icons'

const Trip = () => {
    const [text,setText] = useState('')
    const [isSending,setIsSending] = useState(false);
    // 数据驱动界面
    const [messages,setMessages] = useState([
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        },
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        },
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        },
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        },
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        },
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        },
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        },
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        },
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        },
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        },
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        },
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        },
        {
            id:1,
            content:'ya,hello~',
            role:'user'
        },
        {
            id:2,
            content:'hello,I am your assistant~',
            role:'assistant'
        }

    ]);
const handleChat = async ()=>{
     if(text.trim() === ""){
        Toast.info({
            message:'内容不能为空'
        })
        return
    };
    setIsSending(true);
    setText('');
    setMessages((pre)=>{
        return[
            ...pre,
            {
                role:'user',
                content:text
            }
        ]
    })
    const newmessage = await kimichat([{
        role:'user',
        content:text
    }]);
    setMessages((pre)=>{
        return[
            ...pre,
            newmessage.data
        ]
    })
    setIsSending(false);
}
    useTitle('旅游智能客服')
    // useEffect(()=>{
    //     const fetchchat = async ()=>{
    //     const res = await chat([
    //     {
    //         role:'user',
    //         content:'夏安安是哪个角色'
    //     }],'https://api.moonshot.cn/v1/chat/completions', 'sk-gqJKa7sIOrQpHzmwvbzqUW3467Jp7umbl4O16MIPPmVBKVdI', 'moonshot-v1-auto'
    //    )
    //     console.log(res.data.content);
    //     }
    //     fetchchat();
    // },[])
    return (
        <div className="flex flex-col h-all">
            <div className={`flex-1 ${styles.chatArea}` }>
                {
                    messages.map((msg,index)=>(
                        <div 
                        key={index}
                        className={
                            msg.role === 'user'?
                            styles.messageRight :
                            styles.messageLeft
                        }>
                            {
                                msg.role === 'assistant'?
                                <ChatO />:
                                <UserO />
                            }
                            {
                                msg.content
                            }
                        </div>
                    ))
                }

            </div>
            <div className={`flex ${styles.inputArea}`}>
                <Input
                    value={text}
                    onChange={(e)=>setText(e)}
                    placeholder='请输入消息'
                    className={`flex-1 ${styles.input}`}
                 />
                 <Button disabled={isSending} type='primary' onClick={handleChat}>发送</Button>
                 {isSending && <div className="fixed-loading"><Loading type='ball' /> </div>}
            </div>
        </div>
    )
}
export default Trip
