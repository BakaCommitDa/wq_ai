import{
    useEffect,
    memo
}from'react'


const Button = memo(({num}) =>{


    useEffect(()=>{
        console.log('button useEffect');
        
    },[])
    console.log('Button render');
    
    return <button >{num}Click me</button>

})

export default memo(Button)
