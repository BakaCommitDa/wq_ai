import{
    useContext
}from 'react'
import { TodoContext } from "../TodoContext";

// 自定义hooks
export function useTodoContext(){
    return useContext(TodoContext);
}