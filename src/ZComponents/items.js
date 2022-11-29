import { Sidebar, SidebarItem } from "react-responsive-sidebar"
import { NavLink } from "react-router-dom";
import Button from "../Components/Button/Button";
import logo from "../assets/logo.svg"

export const items = [
    <SidebarItem>
        <div className="">
            <div>
                <NavLink to="/home" style={{ textDecoration: 'none' }}><img className="logo-size" src={logo} /></NavLink>

            </div>
        </div>
    </SidebarItem>,
    <SidebarItem>
        <div className="sidebar-btn mar-top">
            <NavLink to="/addgrant" style={{ textDecoration: 'none' }}><Button widthv={130} name="calculator" /></NavLink>
        </div>
    </SidebarItem>,
    <SidebarItem>
        <div className="sidebar-btn mar-mid-top mt-3">
            <a href="https://app.zionn.trade" target="__blank" style={{ textDecoration: 'none' }}><Button widthv={130} name="sell/buy" /></a>
        </div>
    </SidebarItem>,
    <SidebarItem>
        <div className="sidebar-btn mar-mid-top mt-3">
            <a href="https://app.zionn.trade/scoops" target="__blank" style={{ textDecoration: 'none' }}><Button widthv={130} name="scoops" /></a>
        </div>
    </SidebarItem>,
    <SidebarItem>
        <div className="sidebar-btn mar-mid-top mt-3">
            <a href="https://calendly.com/bhanu_zionn/intro" target="__blank" style={{ textDecoration: 'none' }}><Button widthv={130} name="help" /></a>
        </div>
    </SidebarItem>,
];