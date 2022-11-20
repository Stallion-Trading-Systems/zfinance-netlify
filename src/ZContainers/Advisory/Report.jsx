import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Sidebar } from "react-responsive-sidebar"
import Button from '../../Components/Button/Button.jsx'
import monkey from "../../assets/monkey.svg"
import { items } from '../../ZComponents/items.js'
import "./advisory.css"
import * as api from "../../axios.js"

const Report = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userobj = JSON.parse(localStorage.getItem('user'));
    const [openlogout, setOpenlogout] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [vestingdetails, setVestingDetails] = useState()
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
    let date=new Date().toDateString().substring(4)
    let dateoriginal=new Date()
    useEffect(() => {



        async function vestingdata() {
            let res = await api.getChartData({ email: userobj?.email })
            console.log(res.data.message);

            setVestingDetails(res.data.message)
            // console.log(chartdetails);

        }

        vestingdata()
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
                                                            <table class="table table-borderless">
                                                                <thead>
                                                                    <tr >
                                                                        <th style={{ border: "0px" }} scope='col'>Plans</th>
                                                                        <th style={{ backgroundColor: "#fbf7ec" }} scope="col">Exercise & hold</th>
                                                                        <th scope="col">Secondary sale</th>
                                                                        <th style={{ backgroundColor: "#fbf7ec" }} scope="col">Exercise at exit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className='no-tbb' >
                                                                        <td style={{ border: "0px" }}>Rationale</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}>Given your need for liquidity, the best option is to sell your holdings on a secondary marketplace.<br /> Visit here for marketplace</td>
                                                                        <td></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}></td>
                                                                    </tr>
                                                                    <tr className='no-tbb' >
                                                                        <td style={{ border: "0px" }}></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                                                        <td><hr /></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Summary</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}></td>
                                                                        <td></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}># of options used</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.num}</td>
                                                                        <td>{vestingdetails?.num}</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.num}</td>
                                                                    </tr>
                                                                    <tr className='no-tbb' >
                                                                        <td style={{ border: "0px" }}></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                                                        <td><hr /></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Date of exercise</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}>{date}</td>
                                                                        <td>{date}</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}>N/A</td>
                                                                    </tr>
                                                                    <tr className='no-tbb' >
                                                                        <td style={{ border: "0px" }}></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                                                        <td><hr /></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Liquidity risk  <i class="bi bi-info-circle"></i></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }} ><p className='cell-green'>LOW</p></td>
                                                                        <td><p className='cell-red'>EXTREMELY HIGH</p></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}><p className='cell-red'>HIGH</p></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Your exercise costs</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}></td>
                                                                        <td> </td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Latest share price</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.fmp}</td>
                                                                        <td> {vestingdetails?.fmp}</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}> {vestingdetails?.fmp}</td>
                                                                    </tr>
                                                                    <tr className='no-tbb' >
                                                                        <td style={{ border: "0px" }}></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                                                        <td><hr /></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Exercise cost  <i class="bi bi-info-circle"></i></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.strike_price*vestingdetails?.num}</td>
                                                                        <td>{vestingdetails?.strike_price*vestingdetails?.num}</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.strike_price*vestingdetails?.num}</td>
                                                                    </tr>
                                                                    <tr className='no-tbb' >
                                                                        <td style={{ border: "0px" }}></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                                                        <td><hr /></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Taxes  <i class="bi bi-info-circle"></i></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}>{Math.ceil((vestingdetails?.fmp-vestingdetails?.strike_price*vestingdetails?.num)*0.3)}</td>
                                                                        <td>{Math.ceil((vestingdetails?.fmp-vestingdetails?.strike_price*vestingdetails?.num)*0.3)}</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}>{Math.ceil((vestingdetails?.fmp-vestingdetails?.strike_price*vestingdetails?.num)*0.3)}</td>
                                                                    </tr>
                                                                    <tr className='no-tbb' >
                                                                        <td style={{ border: "0px" }}></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                                                        <td><hr /></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Total exercise costs <i class="bi bi-info-circle"></i></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.strike_price*vestingdetails?.num+Math.ceil((vestingdetails?.fmp-vestingdetails?.strike_price*vestingdetails?.num)*0.3)}</td>
                                                                        <td>{vestingdetails?.strike_price*vestingdetails?.num+Math.ceil((vestingdetails?.fmp-vestingdetails?.strike_price*vestingdetails?.num)*0.3)}</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.strike_price*vestingdetails?.num+Math.ceil((vestingdetails?.fmp-vestingdetails?.strike_price*vestingdetails?.num)*0.3)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Your returns</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                                                        <td> </td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Exit Price</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                                                        <td> </td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                                                    </tr>
                                                                    <tr className='no-tbb' >
                                                                        <td style={{ border: "0px" }}></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                                                        <td><hr /></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Exercise Cost</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                                                        <td> </td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                                                    </tr>
                                                                    <tr className='no-tbb' >
                                                                        <td style={{ border: "0px" }}></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                                                        <td><hr /></td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ border: "0px" }}>Net returns discounted to present value</td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                                                        <td> </td>
                                                                        <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                                                    </tr>
                                                                    <tr className=''>
                                                                        <td style={{ border: "0px" }}></td>
                                                                        <td> </td>
                                                                        <td> </td>
                                                                        <td > </td>
                                                                    </tr>
                                                                    <tr className=''>
                                                                        <td style={{ border: "0px" }}></td>
                                                                        <td> <Button name="go to zadvisory" /></td>
                                                                        <td> </td>
                                                                        <td > </td>
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