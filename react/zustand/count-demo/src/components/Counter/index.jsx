// 来自store
import { useCountStore } from '../../store/count';

const Counter = ()  => {
    const{
        count,
        increment,
        decrement
    } = useCountStore();

    return(
        <>
            Counter{count}  
            <button onClick={increment}>+</button>  
            <button onClick={decrement}>-</button>
        </>
    )
}

export default Counter
