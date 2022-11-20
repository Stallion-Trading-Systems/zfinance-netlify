import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Sidebar } from "react-responsive-sidebar"
import Button from '../../Components/Button/Button.jsx'
import monkey from "../../assets/monkey.svg"
import { items } from '../../ZComponents/items.js'
import "./advisory.css"
import * as api from "../../axios.js"

const Advisory = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userobj = JSON.parse(localStorage.getItem('user'));
    const [openlogout, setOpenlogout] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [boolType,setboolType]=useState("yes")
    const [dataDetails,setDataDetails]=useState()
    if (user === null) {
        setTimeout(() => {
            navigate("/auth");
        }, 1000)
    }

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
        navigate("/auth");
    };
    useEffect(() => {
        async function getdata() {
          let res = await api.getChartData({ email: userobj?.email })
          // console.log(res.data.message);
          setDataDetails(res.data.message)

          console.log(res.data.message);
        }
        getdata()
      }, [])
    return (
        <>
            {user && <>
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
                                <div className="container p-5">
                                    <div className="row">
                                        <div className="col-9">
                                            <div className="row">
                                                <p className='ppchirka-32px'>Help us answer a few questions to rank the most suitable options for you</p>

                                            </div>
                                            <div className="row mt-2">
                                                <div className="col ml-5">
                                                    <select className='new-input-css' style={{width:"170px"}} name="company" id="company">
                                                        <option value="razorpay">Razorpay</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="col ml-5">
                                                    <p className='ppchirka-22px'>How long do you plan to stay?</p>
                                                    <input className='new-input-css' type="number" />
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="col ml-r">
                                                    <p className='ppchirka-22px'>
                                                    Do you have capital to cover the exercise costs of around <span style={{color:"#71AD25"}}>Rs {dataDetails?.strike_price*dataDetails?.num}</span>?
                                                    </p>
                                                    <input className='new-input-css' style={{width:"100px"}} type="number" />
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="col">
                                                    <p className='ppchirka-22px'>
                                                    Do you have a liquidity need like student education, home purchase, etc?
                                                    </p>
                                                    <div className="row">
                                                        <div className="col-2">
                                                        <div className='d-flex justify-content-center align-items-center'>
                                                        <div className='wrapper '>
                                                            <input checked={boolType == "yes"} className='input-display-none' onChange={(e) => { setboolType(e.target.value) }} type="radio" name="yes" value="yes" id="option-1" />
                                                            <input checked={boolType == "no"} className='input-display-none' onChange={(e) => { setboolType(e.target.value) }} type="radio" name="no" value="no" id="option-2" />
                                                            <label for="option-1" className="option option-b option-1">
                                                                <span>Yes</span>
                                                            </label>
                                                            <label for="option-2" className="option option-s option-2">
                                                                <span>No</span>
                                                            </label>
                                                        </div> 
                                                    </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="col-3"></div>
                                                <div className="col">
                                                    <Button name="explore options"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Sidebar>
                </div>
            </>}
        </>

    )
}

export default Advisory