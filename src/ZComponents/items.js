import { Sidebar, SidebarItem } from "react-responsive-sidebar"
import { NavLink } from "react-router-dom";
import Button from "../Components/Button/Button";
import logo from "../assets/logo.svg"

export const items = [
    <SidebarItem>
        <div className="">
            <div>
                <NavLink to="/" style={{ textDecoration: 'none' }}><img className="logo-size" src={logo} /></NavLink>

            </div>
        </div>
    </SidebarItem>,
    <SidebarItem>
        <div className="sidebar-btn mar-top">
            <NavLink to="/" style={{ textDecoration: 'none' }}><Button widthv={120} name="holdings" /></NavLink>
        </div>
    </SidebarItem>,
    <SidebarItem>
        <div className="sidebar-btn mar-mid-top mt-3">
            <NavLink to="/" style={{ textDecoration: 'none' }}><Button widthv={120} name="orders" /></NavLink>
        </div>
    </SidebarItem>,
    <SidebarItem>
        <div className="sidebar-btn mar-mid-top mt-3">
            <NavLink to="/" style={{ textDecoration: 'none' }}><Button widthv={120} name="scoops" /></NavLink>
        </div>
    </SidebarItem>,
    <SidebarItem>
        <div className="sidebar-btn mar-mid-top mt-3">
            <NavLink to="/" style={{ textDecoration: 'none' }}><Button widthv={120} name="help" /></NavLink>
        </div>
    </SidebarItem>,
];