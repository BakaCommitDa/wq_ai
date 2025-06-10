import { useState,useRef } from 'react'
import './App.css'

function App() {
  // 火山引擎tts 配置文件
  //const TOKEN = 'VhAET3WGTleeyaegNu_htpQDmv_Up-vC';
  //const APP_ID ='5571789783';
  //const CLUSTER_ID ='volcano_tts';

  //代码的可读性高于一切
  const [prompt,setPrompt] = useState('大家好，我是小黄');
  //react use开头 ref hook 可以获取 DOM 元素
  const audioPlayer = useRef(null);
  console.log(audioPlayer);
  const playMusic = () => {
    // console.log(audioPlayer);
    console.log('play music');
    audioPlayer.current.play();
  }
  const generateAudio = ()=>{
    // 女性
    // const voiceName ='zh_female_shuangkuaiisisi_moon_bigtts';
    const voiceName = 'zh_male_sunwukong_mars_gigtts';
    const endPoint = "/tts/api/v1/tts"// tts api llm 服务接口地址

    const header ={
      'Content-Type':'application/json',
      Authorization:`Bearer;${TOKEN}`
    }

  }

  return (
    <>
    <div className='container'>
      <div>
        <label>Prompt</label>
        <button onClick={generateAudio}>生成并播放</button>
        <textarea 
        className='input'
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        >
        </textarea>
      </div>
      <audio ref={audioPlayer} src="/sounds/snare.wav"></audio>
      {/* <button onClick={playMusic}>播放</button> */}
    </div>
    </>
  )
}

export default App
