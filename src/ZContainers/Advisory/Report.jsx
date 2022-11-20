import React, { useEffect, useState } from 'react'
import PostfolioChart from '../../ZComponents/recharts/portfolioChart.jsx'
import * as api from "../../axios.js"
import { useNavigate } from 'react-router'
import { Sidebar } from "react-responsive-sidebar"
import Button from '../../Components/Button/Button.jsx'
import monkey from "../../assets/monkey.svg"
import { items } from '../../ZComponents/items.js'
import "./advisory.css"
import { FormControl, InputLabel, NativeSelect } from '@mui/material'

const Report = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userobj = JSON.parse(localStorage.getItem('user'));
    const [openlogout, setOpenlogout] = useState(false);
    const [isActive, setIsActive] = useState(false);
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
                                <div>
                                    <div className="container p-5 pt-0">
                                        <div className="row">
                                            <div className="col-10">
                                                <p className='ppchirka-32px'>
                                                    Given the answers provided, we feel the best option for you would be to ____, we’ve provided a side-by-side comparison of all the options available for you to be able to make an informed decision
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-11">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col">
                                                            <table class="table table-bordered">
                                                                <thead>
                                                                    <tr >
                                                                        <th style={{ border: "0px" }} scope='col'>Plans</th>
                                                                        <th style={{backgroundColor:"#fbf7ec"}}  scope="col">Exercise & hold</th>
                                                                        <th scope="col">Secondary sale</th>
                                                                        <th style={{backgroundColor:"#fbf7ec"}} scope="col">Exercise at exit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className='no-tbb' >
                                                                        <td style={{ border: "0px" }}>Rationale</td>
                                                                        <td style={{backgroundColor:"#fbf7ec", borderTop:"none", borderBottom:"none"}}>Given you plan to leave the firm in near future, exercising now might suit you the best. For analsyt coverage and our recommendation, Visit here for zadvisory</td>
                                                                        <td></td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Summary</td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}></td>
                                                                        <td></td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}># of options used</td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}></td>
                                                                        <td></td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Date of exercise</td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}>Anytime</td>
                                                                        <td>Anytime after exercise</td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}>$today+time to IPO or N/A</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Bottom out risk  <i class="bi bi-info-circle"></i></td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}>LOW</td>
                                                                        <td>LOW</td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}>EXTREMELY HIGH</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Your exercise costs</td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}></td>
                                                                        <td> </td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Latest share price</td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}>$FMV</td>
                                                                        <td> $FMV</td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}> $FMV</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Exercise cost  <i class="bi bi-info-circle"></i></td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}>$OPTIONS X STRIKE</td>
                                                                        <td> $OPTIONS X STRIKE</td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}> $OPTIONS X STRIKE</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Taxes  <i class="bi bi-info-circle"></i></td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}>$ exer cost x .3</td>
                                                                        <td> $ exer cost x .3</td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}>$ exer cost x .3</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Total exercise costs <i class="bi bi-info-circle"></i></td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}>$OPTIONS X STRIKE + TAX</td>
                                                                        <td></td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Your returns <i class="bi bi-info-circle"></i></td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}> </td>
                                                                        <td> </td>
                                                                        <td style={{backgroundColor:"#fbf7ec"}}> </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-10">
                                                <p className='ppchirka-25px mb-5'>Speak to one of our team members to understand more about our liquidity program, and decide the best way to move forward</p>
                                                <Button name="book meeting" />
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

export default Report