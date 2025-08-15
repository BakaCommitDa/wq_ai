import {Outlet} from 'react-router-dom'


const Products = ()=>{
    return(
        <div>
            <h1>产品列表</h1>
            {/* 二级路由的占位符 */}
            <Outlet />
        </div>
    )
}

export default Products