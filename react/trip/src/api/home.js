import axios from './config'

export const getImages = async(page) => {
    return await axios.get('/images', {
        params: {page}
    })
}