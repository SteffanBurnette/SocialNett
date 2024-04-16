import {NavLink, Outlet} from "react-router-dom";
import { Flex, Layout } from 'antd';
import MyNavLink from "/src/myComponents/MyNavLink.jsx"
    
const { Header, Footer, Sider, Content } = Layout;


export default function NavLayout(){


    return(
    <>
        <MyNavLink/>
        <Outlet/>
       </>
        )
}