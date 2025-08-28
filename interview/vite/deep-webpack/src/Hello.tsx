import React from "react";
import avatar from './images/avatar.webp'
import book from './images/book.webp'
import {
    add
} from './math';

const Hello = () => {
    return (
       <>
            呀~哈喽
            <img src={book} alt="" />
            <img src={avatar} alt="" /> 
            {add(1, 2)}
            
       </>
    )
}
export default Hello;
