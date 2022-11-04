import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import TitleButton from "../../Components/TitleButton/TitleButton";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import monkey from "../../assets/monkey.svg"
import logo from "../../assets/logo.svg"
import { Sidebar, SidebarItem } from "react-responsive-sidebar"
import "./addgrants.css"
import { items } from "../../ZComponents/items.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import * as api from "../../axios.js"

const AddGrants = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userobj = JSON.parse(localStorage.getItem('user'));
    const [openlogout, setOpenlogout] = useState(false);
    const [page, setPage] = useState(1);
    const [details,setDetails]=useState({email:userobj.email});
    const [isActive, setIsActive] = useState(false);
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

    const addGrant=async(e)=>{
        let res=await api.addGrant(details);

        console.log(res);
    }

    return (
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
                        <div className="row">
                            <div className="container mb-5 p-5 pt-0">
                                <div className="row">
                                    <div>
                                        {page == 1 &&
                                            <div className="container ">
                                                <div style={{ position: "relative", top: "50%" }} className="row p-5">
                                                    <div className="col-6">
                                                        <h3 className="pp-chirka mb-5" style={{ fontSize: "normal", fontWeight: "700", fontSize: "32px", lineHeight: "100%" }}>Where do you have equity?</h3>
                                                        <form id="page-1">
                                                        <input type="text" onChange={(e)=>{setDetails({...details,"c_name":e.target.value})}} className="new-input-css mb-5 ml-3" required/>

                                                        </form>
                                                        <div className="row mb-4 ml-3 ">
                                                            <div className="col-1">
                                                                <FontAwesomeIcon icon={faLock} color="green" />
                                                            </div>
                                                            <div className="col-11">
                                                                <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "700", fontSize: "18px", lineHeight: "100%" }}>We will never sell your information. We only use your inputs to calculate accurate insights for your financial situation.</p>
                                                            </div>
                                                        </div>
                                                        <NavLink to="" style={{ textDecoration: "none" }} onClick={() => { setPage(x => (x + 1));console.log(details); }} ><Button name="continue" /></NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {page == 2 &&
                                            <div>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <h3 className="pp-chirka mb-5" style={{ fontSize: "normal", fontWeight: "700", fontSize: "32px", lineHeight: "100%" }}>Select the grants you have at {details.c_name}.</h3>
                                                            <p style={{ fontFamily: "Roboto", fontSize: "normal", fontWeight: "300", fontSize: "25px", lineHeight: "100%" }}>To estimate the cost to exercise your options and potential gain, please enter your grant details. You may have one or more of these types of grants and each have different tax implications. Make sure to add the different graants separately. Don’t worry, we’ll do the calculations for you.</p>
                                                            <div className="container mt-5">
                                                                <div className="row g-5 gl-5 ">
                                                                    <div className="col-6">
                                                                        <label className="granttype">
                                                                            <input className="input-type" onChange={(e)=>{setDetails({...details,"grant_type":e.target.value})}} value="first" style={{ display: "none" }} type="radio" name="typegrant" />
                                                                            <img className="img-type" src={logo} style={{ cursor: "pointer", height: "200px", width: "200px" }} />
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <label className="granttype">
                                                                            <input className="input-type" onChange={(e)=>{setDetails({...details,"grant_type":e.target.value})}} value="second" style={{ display: "none" }} type="radio" name="typegrant" />
                                                                            <img className="img-type" src={logo} style={{ cursor: "pointer", height: "200px", width: "200px" }} />
                                                                        </label>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </div>
                                                        <NavLink to="" style={{ textDecoration: "none", marginTop: "70px" }} onClick={() => { setPage(x => (x + 1));console.log(details); }} ><Button name="continue" /></NavLink>

                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {page == 3 &&
                                            <div>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <h3 className="pp-chirka mb-4" style={{ fontSize: "normal", fontWeight: "700", fontSize: "32px", lineHeight: "100%" }}>Please add your grants at {details.c_name}.</h3>
                                                            <p style={{ fontFamily: "Roboto", fontSize: "normal", fontWeight: "300", fontSize: "25px", lineHeight: "100%" }}>If you are unsure, you can edit this information later.</p>
                                                            <div>
                                                                <div style={{ backgroundColor: "#FEFCF7" }} className="container p-5 mt-5">
                                                                    <div className="row">
                                                                        <div className="col-7">
                                                                            <div className="container">
                                                                                <div className="row g-5" >
                                                                                    <div className="col-6">
                                                                                        <p>Number*</p>
                                                                                        <input onChange={(e)=>{setDetails({...details,"num":e.target.value})}} type="number" />
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                        <p>Strike Price*</p>
                                                                                        <input onChange={(e)=>{setDetails({...details,"strike_price":e.target.value})}} type="number" />
                                                                                    </div>

                                                                                </div>
                                                                                <div className="row g-5 mt-2" >
                                                                                    <div className="col-6">
                                                                                        <p>Vesting Details*</p>
                                                                                        <input onChange={(e)=>{setDetails({...details,"vesting_details":e.target.value})}} type="text" />
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                        <p>Vesting Start Date*</p>
                                                                                        <input onChange={(e)=>{setDetails({...details,"vesting_start_date":e.target.value})}} type="date" />
                                                                                    </div>

                                                                                </div>
                                                                                <div className="row g-5 mt-2" >
                                                                                    <div className="col-6">
                                                                                        <p>Deadline after leaving*</p>
                                                                                        <input onChange={(e)=>{setDetails({...details,"deadline":e.target.value})}} type="text" />
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                    </div>

                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div class="d-flex" style={{ height: "340px" }}>
                                                                                <div style={{width:"3px",color:"#000"}} class="vr"></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-4">
                                                                        <div className="row g-5 mt-2" >
                                                                                    <div className="col">
                                                                                        <p>Pre- exercised options</p>
                                                                                        <input onChange={(e)=>{setDetails({...details,"pre_exercise_option":e.target.value})}} type="text" />
                                                                                    </div>

                                                                                </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <NavLink to="" style={{ textDecoration: "none", marginTop: "70px" }} onClick={() => { setPage(x => (x + 1)); console.log(details); }} ><Button name="continue" /></NavLink>

                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {page == 4 &&
                                            <div>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-11">
                                                            <h3 className="pp-chirka mb-5" style={{ fontSize: "normal", fontWeight: "700", fontSize: "32px", lineHeight: "100%" }}>Select the grants you have at {details.c_name}.</h3>
                                                            <p style={{ fontFamily: "Roboto", fontSize: "normal", fontWeight: "300", fontSize: "25px", lineHeight: "100%" }}>If you are unsure, you can edit this information later..</p>
                                                            <div style={{ backgroundColor: "#FEFCF7" }} className="container p-5 mt-5">
                                                                <div className="row g-5">
                                                                    <div className="col-2">
                                                                        <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "700", fontSize: "25px", lineHeight: "100%" }}>Quantity</p>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "700", fontSize: "25px", lineHeight: "100%" }}>Type</p>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "700", fontSize: "25px", lineHeight: "100%" }}>Price</p>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "700", fontSize: "25px", lineHeight: "100%" }}>Vesting</p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <NavLink to="" style={{ textDecoration: "none", marginTop: "70px" }} onClick={(e) => { setPage(x => (x + 1));addGrant(e);console.log(details); }} ><Button name="continue" /></NavLink>

                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {page == 5 && <>done</>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Sidebar>
            </div>
        </>
    );
};

export default AddGrants;
