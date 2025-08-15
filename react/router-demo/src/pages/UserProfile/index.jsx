import{
    useEffect
}from 'react'
import{
    useParams
}from 'react-router-dom'



const UserProfile =()=>{
    const {id} = useParams();

    useEffect(()=>{
        // console.log(window.location);
        

    },[])
    return(
        <div>
            UserProfile {id}
        </div>
    )
}


export default UserProfile
