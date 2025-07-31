import styles from './card.module.css'
import {
    useEffect,
    useRef,
} from 'react'

const ImageCard = (props) => {
    const { url, height } = props
    const imRef = useRef(null);
    useEffect(()=>{
        const observer = new IntersectionObserver(([entry],obs)=>{
            if(entry.isIntersecting){
                const img = entry.target;
                const oImg = document.createElement('img');
                oImg.src = img.dataset.src;
                oImg.onload = function(){
                    img.src = img.dataset.src
                }
                // img.src = img.dataset.src || '';
                obs.unobserve(img);
            }

        })
        if(imRef.current)observer.observe(imRef.current)
            return()=>observer.disconnect();
            },[])
    return (
        <div style={{height}} className={styles.card}>
            <img ref={imRef} data-src={url} className={styles.img} />
        </div>
    )
}

export default ImageCard;