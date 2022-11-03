import { useState } from "react";
import React from 'react'
import { NavLink } from "react-router-dom";

const LandingCard = (props) => {
    const [isActive, setIsActive] = useState(false);
    const handleClick = (event) => {
        setIsActive((current) => !current);
    };
    const defaultClick = (e) => {
        setIsActive(false);
    };
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <h3 className="pp-chirka mt-4 mb-4" style={{fontSize:"normal",fontWeight:"700",fontSize:"32px",lineHeight:"100%"}}>{props.title}</h3>
                    <p
                        style={{fontFamily:"Roboto", fontSize:"normal",fontWeight:"300",fontSize:"25px",lineHeight:"100%"}}
                    >{props.des}</p>
                    <NavLink className="mt-4" to={props.link} style={{width:"200px",textDecoration:"none"}}>
                    <button
                        onPointerLeave={defaultClick}
                        onPointerDown={handleClick}
                        onPointerUp={handleClick}
                        className={isActive ? "butt butt-ac" : "butt"}
                        style={{width:"200px",fontFamily:"Source Code Pro", fontSize:"normal",fontWeight:"600",fontSize:"14px",lineHeight:"100%"}}
                    >
                        {props.btntxt}
                        <i class="bi bi-arrow-up-right"></i>
                    </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LandingCard