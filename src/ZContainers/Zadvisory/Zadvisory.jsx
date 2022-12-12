import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Sidebar } from "react-responsive-sidebar"
import Button from '../../Components/Button/Button.jsx'
import monkey from "../../assets/monkey.svg"
import { items } from '../../ZComponents/items.js'
import "./zadvisory.css"
import { NavLink } from 'react-router-dom'

const Zadvisory = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userobj = JSON.parse(localStorage.getItem('user'));
    const [openlogout, setOpenlogout] = useState(false);
    const [isActive, setIsActive] = useState(false);
    // if (user === null) {
    //     setTimeout(() => {
    //         navigate("/signin");
    //     }, 1000)
    // }

    const handleClick = (e) => {
        e.preventDefault();
        setIsActive((current) => !current);
    };
    const defaultClick = (e) => {
        e.preventDefault();
        setIsActive(false);
    };
    let logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        navigate("/signin");
    };

    return (
        <>
            <>
                <div className="white-bg-css">
                    <Sidebar
                        className="side-bar z-s-i-css"
                        content={items}
                        width={200}
                        background={"#FFF"}
                        toggleIconColor={"#7B61FF"}
                        color={"#000000"}
                        activeHightlight={"#FFF"}
                        hoverHighlight={"#FFF"}
                        textAlign={"center"}
                    >
                        <div className="fix-nav ">
                            <div className="container">
                                <div className="row">
                                    <div className="col-9"></div>
                                    <div className="col-2 logo-top">
                                        <div className={openlogout ? "dropdown-monkey monkey-click" : "dropdown-monkey"}>
                                            <button className="monkey-btn-css" onClick={() => { setOpenlogout(current => !current) }}><img className="logo-top-size " src={monkey} /></button>
                                            <div className={openlogout ? "dropdown-content-monkey monkey-click" : "dropdown-content-monkey"}>
                                                <a style={{ textDecoration: "none" }} href="https://www.linkedin.com/company/zionn/" target="__blank"><Button name="contact" /></a>
                                                <button
                                                    onPointerLeave={defaultClick}
                                                    onPointerDown={handleClick}
                                                    onPointerUp={handleClick}
                                                    onClick={logOut}
                                                    className={isActive ? "butt butt-ac logout-btn-css" : "butt logout-btn-css"}
                                                >
                                                    logout&nbsp;
                                                    <i class="bi bi-arrow-up-right"></i>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-1"></div>
                                </div>
                            </div>
                        </div>

                        <div onClick={() => setOpenlogout(false)} className="container con-abs">
                            <div className="container p-5 pt-0">
                                <div className="row ">
                                    <div className="col-10">
                                        <p className='ppchirka-25px' style={{ fontWeight: "700", fontSize: "32px" }}>Not all companies are the same. Not all venture backed companies are worth billions. Neither is every bootstrapped company to be written off.</p>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-8">
                                        <p className='ppchirka-25px' style={{ fontWeight: "300" }}>Speak to our team of analysts to discuss more about your company’s equity value, and if it is worth investing over other alternative assets.</p>

                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-3">
                                        <a style={{ textDecoration: "none" }} target="__blank" href="https://calendly.com/bhanu_zionn/intro"><Button name="book meeting" /></a>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                <div style={{position: "relative", paddingBottom: "62.5%", height: 0}}>
                                    <iframe src="https://www.loom.com/embed/f2578af8b719473587f8f2f7c7670f2f" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen 
                                    style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}>
                                        </iframe></div>
                                </div>
                            </div>

                        </div>
                    </Sidebar>
                </div>
            </>
        </>

    )
}

export default Zadvisory