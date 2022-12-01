import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import TitleButton from "../../Components/TitleButton/TitleButton";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import monkey from "../../assets/monkey.svg"
import logo from "../../assets/logo.svg"
import { Sidebar, SidebarItem } from "react-responsive-sidebar"
import "./LandingPage.css"
import { items } from "../../ZComponents/items.js";
import LandingCard from "./LandingCard.jsx";
import imggraph from "../../ZComponents/assets/landingpage.png"
import FooterP from "../Footer/FooterP.jsx";


const LandingPage = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userobj = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
        setTimeout(() => {
          navigate("/");
        }, 1000)
      }
    let logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        navigate("/signin");
    };

    const [openlogout, setOpenlogout] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        setIsActive((current) => !current);
    };
    const defaultClick = (e) => {
        e.preventDefault();
        setIsActive(false);
    };

    return (
        <>
            {user&&<>
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
                        <div className="row">
                            <div className="container mb-5 p-5 pt-0">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="row" style={{marginBottom:"70px"}}>
                                        <LandingCard 
                                        title="Start tracking your equity value"
                                        des="Add your equity details now to unlock the portfolio graph and start tracking your equity value including the amount vested."
                                        btntxt="add your equity"
                                        link="/addgrant"
                                        />
                                        </div>
                                        <div className="row" style={{marginBottom:"70px"}}>
                                        <LandingCard 
                                        title="Need to liquidate your holdings?"
                                        des="We help startup employees sell their exiting stock to institutional investors. Best suited for those looking for early liquidity."
                                        btntxt="liquidate"
                                        href="https://app.zionn.trade"
                                        />
                                        </div><div className="row" style={{marginBottom:"70px"}}>
                                        <LandingCard 
                                        title="Financing to exercise your options?"
                                        des="We help startup employees get the cash to own their stock options."
                                        btntxt="explore financing"
                                        link="/"
                                        />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <img src={imggraph} />
                                    </div>
                                </div>
                            </div>
                            <FooterP/>
                        </div>
                    </div>
                </Sidebar>
            </div>
            </>}
        </>
    );
};

export default LandingPage;
