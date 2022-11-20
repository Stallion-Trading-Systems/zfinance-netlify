import React, { useEffect, useState } from 'react'
import PostfolioChart from '../../ZComponents/recharts/portfolioChart.jsx'
import * as api from "../../axios.js"
import { useNavigate, useParams } from 'react-router'
import { Sidebar } from "react-responsive-sidebar"
import Button from '../../Components/Button/Button.jsx'
import monkey from "../../assets/monkey.svg"
import { items } from '../../ZComponents/items.js'
import "./portfolio.css"
import { FormControl, InputLabel, NativeSelect } from '@mui/material'
import { NavLink } from 'react-router-dom'

const PortfolioMain = () => {
    const params = useParams()
    const type = params.type
    const [cdetails, setcDetails] = useState([])
    const [chartdetails, setChartDetails] = useState()
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userobj = JSON.parse(localStorage.getItem('user'));
    const [openlogout, setOpenlogout] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [sensex, setSensex] = useState();
    const [selectt, setSelectt] = useState("nifty");
    if (user === null) {
        setTimeout(() => {
            navigate("/auth");
        }, 1000)
    }

    const handleClick = (e) => {
        e.preventDefault();
        setIsActive((current) => !current);
    };
    const [variables, setVariables] = useState({ email: userobj?.email })
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



        async function chartdata() {
            let res = await api.getChartData({ email: userobj?.email })
            // console.log(res.data.message);

            setChartDetails(res.data.message)
            setcDetails([{
                name: "Series_A",
                date: "05-11-2000",
                price: chartdetails?.fmp
            }])
            // console.log(chartdetails);

        }
        async function sensexdata() {
            let res = await api.getSensexData()
            setSensex(res.data.data)
        }
        async function f() {
            let res2=await api.checkCname({ c_name: chartdetails?.c_name })
             
            if (res2.data.message == "No") {
                {
                    setcDetails([{
                        name: "Series_A",
                        date: "05-11-2000",
                        price: chartdetails?.fmp
                    }])
                }
            }
            else 
            {
                let res = await api.getcData({ c_name: chartdetails?.c_name })
                setcDetails(res.data.obj)
            }
        }
        
        chartdata()
        f()
        sensexdata()
    }, [chartdetails?.c_name])
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
                                        <div className="row p-5 pt-0 ">
                                            <div className="col-10">
                                                <h3 className="pp-chirka" style={{ fontSize: "normal", fontWeight: "700", fontSize: "32px", lineHeight: "100%", textDecorationLine: "underline" }}>Portfolio</h3>
                                                <h3 className="pp-chirka mt-3" style={{ fontSize: "normal", fontWeight: "700", fontSize: "32px", lineHeight: "100%" }}>{chartdetails?.c_name}</h3>

                                            </div>
                                        </div>
                                        <div className="row p-5 pt-0">
                                            <div style={{ backgroundColor: "#FEFCF7" }} className="col-10 p-5">

                                                <div className="row mt-5">
                                                    {chartdetails && <PostfolioChart data={cdetails} type={selectt} cd={chartdetails} sensex={sensex} vd={chartdetails?.vesting_details} variables={variables} num={chartdetails?.num} vs={chartdetails?.vs} />}
                                                </div>
                                            </div>

                                            <div className="col-4"></div>
                                        </div>
                                        <div className="row mt-3 p-5 pt-0">
                                            <div className="col-6 ppchirka-25px">Total equity value</div>
                                            <div className="col-6 ppchirka-25px">Vested equity value</div>
                                        </div>
                                        <div className="row mb-5">
                                            <div className="col-10">
                                            {type=="p2"&&
                                            <p className='ppchirka-25px' style={{fontWeight:"300"}}>
                                                While vested equity value wil eventually converge to the total equity value as seen from the graph, this should not be considered as net wealth, especially in the case of illiquid companies. There are a lot of other variables that eventually define how much you actually make like:<br/><br/> &nbsp; 1. Time to IPO <br/>&nbsp; 2. Companies acceptance towards secondaries <br/>&nbsp; 3. Company fundamentals <br/>&nbsp; 4.Lock-ins <br/><br/>And some other extraneous variables. Select an option below to play out different scenarios.

                                            </p>
                                            }
                                            {type=="p3"&&
                                            <p className='ppchirka-25px' style={{fontWeight:"300"}}>
                                                Your main job at the start of vesting/ negotiating a new salary is whether to push harder for equity or cash. While vested equity value wil eventually converge to the total equity value as seen from the graph, this should not be considered as net wealth, especially in the case of illiquid companies. There are a lot of other variables that eventually define how much you actually make like:<br/><br/> &nbsp; 1. Time to IPO <br/>&nbsp; 2. Companies acceptance towards secondaries <br/>&nbsp; 3. Company fundamentals <br/>&nbsp; 4.Lock-ins <br/><br/>And some other extraneous variables. Select an option below to play out different scenarios.
                                            </p>
                                            }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3"></div>
                                            <div className="col">
                                                <NavLink style={{textDecoration:"none"}} to="/portfolio"><Button name="scenario analysis"/></NavLink>
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

export default PortfolioMain