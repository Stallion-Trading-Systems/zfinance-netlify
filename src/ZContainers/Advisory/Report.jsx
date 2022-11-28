import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Sidebar } from "react-responsive-sidebar"
import Button from '../../Components/Button/Button.jsx'
import monkey from "../../assets/monkey.svg"
import { items } from '../../ZComponents/items.js'
import "./advisory.css"
import * as api from "../../axios.js"
import Table1 from './Table1.jsx'
import Table2 from './Table2.jsx'
import Table3 from './Table3.jsx'

const Report = () => {
    const navigate = useNavigate();
    const params=useParams()
    const user = localStorage.getItem("user");
    const userobj = JSON.parse(localStorage.getItem('user'));
    const [openlogout, setOpenlogout] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [vestingdetails, setVestingDetails] = useState()
    const [type,setType]=useState(1)

    let liquidity=params?.liquidity
    let capital=params?.capital
    let period=params?.period
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
    useEffect(() => {
        async function vestingdata() {
            let res = await api.getChartData({ email: userobj?.email })
            // console.log(res.data.message);

            setVestingDetails(res.data.message)
            // console.log(chartdetails);

        }
        vestingdata()
        function typeCheck(){
            if(liquidity==1){
                setType(1)
            }
            else{
                if(capital==1){
                    if(period==1)setType(2)
                    else setType(3)
                }
                else{
                    setType(3)
                }
            }
        }
        typeCheck()
    }, [])
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
                            <div className="row">
                                <div>
                                    <div className="container p-5 pt-0">
                                        <div className="row">
                                            <div className="col-10">
                                                <p className='ppchirka-32px'>
                                                    Given the answers provided, we feel the best option for you would be to {type==1&&"secondary sale"}{type==2&&"exercise & hold"}{type==3&&"exercise at exit"}, we’ve provided a side-by-side comparison of all the options available for you to be able to make an informed decision
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-11">
                                                {type==1&&<Table1 vestingdetails={vestingdetails}/>}
                                                {type==2&&<Table2 vestingdetails={vestingdetails}/>}
                                                {type==3&&<Table3 vestingdetails={vestingdetails}/>}
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
            </>
        </>

    )
}

export default Report