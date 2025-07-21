import axios from "./config";

// todo接口
export const getTodos = async() =>{

    return await axios.get('/api/todos');

}


export const getrepos  = async() => {
    return await axios.get('/repos');
}