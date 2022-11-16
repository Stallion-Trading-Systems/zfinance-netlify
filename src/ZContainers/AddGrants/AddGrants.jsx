import React, { Fragment, useState } from "react";
import Button from "../../Components/Button/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import monkey from "../../assets/monkey.svg"
import logo from "../../assets/logo.svg"
import { Sidebar } from "react-responsive-sidebar"
import "./addgrants.css"
import { items } from "../../ZComponents/items.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEdit } from "@fortawesome/free-solid-svg-icons";
import * as api from "../../axios.js"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { styled } from '@mui/material/styles';
import { Box, LinearProgress, linearProgressClasses, Typography } from "@mui/material";

const AddGrants = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userobj = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
        setTimeout(() => {
            navigate("/auth");
        }, 1000)
    }
    let date=new Date()
    let year=date.getFullYear()
    year-=2000
    let month=date.getMonth()
    month+=1;
    year=12*year
    year+=month
    const [openlogout, setOpenlogout] = useState(false);
    const [page, setPage] = useState(1);
    const [details, setDetails] = useState({ email: userobj?.email });
    const [isActive, setIsActive] = useState(false);
    const [p2,setp2]=useState(false);
    const [p3,setp3]=useState(false);
    let vestingvalue=0;
    let totalvalue=1;
    const [error, setError] = useState({ c_name: false, num: false, strike_price: false, vesting_details: false, vesting_start_date: false,fmp:false })
    const handleClick = (e) => {
        e.preventDefault();
        setIsActive((current) => !current);
    };
    const defaultClick = (e) => {
        e.preventDefault();
        setIsActive(false);
    };

    if(details?.fmp&&details?.num){
        totalvalue=parseInt(details?.fmp)*parseInt(details?.num)
        if(details?.vesting_details&&details?.vesting_start_date){
            let smonth=details?.vesting_start_date.getMonth()+1;
            let syear=details?.vesting_start_date.getFullYear()
            syear-=2000
            syear*=12
            syear+=smonth
            let period=year-syear+1

            let cliff=(details?.vesting_details.substring(2,3)=="1")?1:0
            let m=parseInt(details?.vesting_details.substring(0,2))
            if(cliff){
                if(period<12){
                    vestingvalue=0
                }
                else{
                    vestingvalue=details?.fmp*details?.num*period/m
                }
            }
            else{
                vestingvalue=details?.fmp*details?.num*period/m
            }
        }
        if(vestingvalue>totalvalue)vestingvalue=totalvalue
        // console.log(vestingvalue,totalvalue);
    }
    let logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        navigate("/auth");
    };

    const addGrant = async (e) => {
        let res = await api.addGrant(details);

        console.log(res);
        navigate("/portfolio")
    }
    const page1check = (e) => {
        e.preventDefault()
        if (!details?.c_name) {
            setError({ ...error, c_name: true })
            return;
        }
        setPage(x => (x + 1));
        console.log(details);
    }
    const page2check = (e) => {
        e.preventDefault()
        if (!details?.grant_type) {
            setError({ ...error, grant_type: true });
            return;
        }
        setPage(x => (x + 1));
        console.log(details);
    }
    const page3check = async (e) => {
        e.preventDefault()
        if (!details?.num || !details?.strike_price || !details?.vesting_start_date || !details?.vesting_details || !details?.fmp) {
            setError({ ...error, num: (!details?.num) ? true : false, strike_price: (!details?.strike_price) ? true : false, vesting_details: (!details?.vesting_details) ? true : false, vesting_start_date: (!details?.vesting_start_date) ? true : false, fmp: (!details?.fmp) ? true : false })
            console.log(error, details);
            return;
        }
        let date=new Date()
        let year=date.getFullYear()
        year-=2000;
        year*=12
        year+=date.getMonth()
        console.log(year);
        let syear=details?.vesting_start_date.getFullYear()
        syear-=2000;
        syear*=12
        syear+=details?.vesting_start_date.getMonth() 
        syear=year-syear
        console.log(syear);
        setp3(false)
        setp2(false)
        if(syear>=24&&syear<48){
            setp2(true)
            console.log("p2");
        }
        else if(syear<24){
            setp3(true)
            console.log("p3");
        }
        setPage(x => (x + 1));
        console.log(details);

    }
    function LinearProgressWithLabel(props) {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
          </Box>
        );
      }
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: theme.palette.mode === 'light' ? '#C9F0B1' : '#308fe8',
        },
      }));
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
                                <div className="row p-5 pl-0 pt-0">
                                    <div className="col-10">
                                    <LinearProgressWithLabel value={(page)/4*100} />
                                    {/* <BorderLinearProgress variant="determinate" value={page/4*100} /> */}
                                    </div>
                                    <div className="col-1"></div>
                                </div>
                                <div className="row">
                                    <div>
                                        {page == 1 &&
                                            <div className="container ">
                                                <div style={{ position: "relative", top: "50%" }} className="row p-5">
                                                    <div className="col-6">
                                                        <h3 className="pp-chirka mb-5" style={{ fontSize: "normal", fontWeight: "700", fontSize: "32px", lineHeight: "100%" }}>Where do you have equity?</h3>
                                                        <form id="page-1">
                                                            <input value={details.c_name} type="text" onChange={(e) => { e.preventDefault(); setError({ ...error, c_name: false }); setDetails({ ...details, "c_name": e.target.value }) }} className={(error?.c_name) ? "new-input-css ml-3 input-error-css" : "new-input-css mb-5 ml-3"} required />
                                                            {error?.c_name && <p className="mb-5" style={{ color: "red" }}>*please enter company name</p>}

                                                            <div className="row mb-4 ml-3 ">
                                                                <div className="col-1">
                                                                    <FontAwesomeIcon icon={faLock} color="green" />
                                                                </div>
                                                                <div className="col-11">
                                                                    <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "700", fontSize: "18px", lineHeight: "100%" }}>We will never sell your information. We only use your inputs to calculate accurate insights for your financial situation.</p>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <NavLink to="" style={{ textDecoration: "none" }} onClick={(e) => { page1check(e) }} ><Button name="continue" /></NavLink>
                                                                </div>
                                                            </div>
                                                        </form>
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
                                                                            <input className="input-type" onChange={(e) => { setError({ ...error, grant_type: false }); setDetails({ ...details, "grant_type": e.target.value }) }} value="first" style={{ display: "none" }} type="radio" name="typegrant" />
                                                                            <img className={details?.grant_type == "first" ? "selected-img img-type" : "img-type"} src={logo} style={{ cursor: "pointer", height: "200px", width: "200px" }} />
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <label className="granttype">
                                                                            <input className="input-type" onChange={(e) => { setError({ ...error, grant_type: false }); setDetails({ ...details, "grant_type": e.target.value }) }} value="second" style={{ display: "none" }} type="radio" name="typegrant" />
                                                                            <img className={details?.grant_type == "second" ? "selected-img img-type" : "img-type"} src={logo} style={{ cursor: "pointer", height: "200px", width: "200px" }} />
                                                                        </label>
                                                                    </div>

                                                                </div>
                                                                {error?.grant_type && <p className="mt-3" style={{ color: "red" }}>*please select grant type</p>}
                                                            </div>
                                                        </div>
                                                        <div className="row g-5">
                                                            <div className="col-2">
                                                                <NavLink to="" style={{ textDecoration: "none" }} onClick={() => { setPage(x => (x - 1)); console.log(details); }} ><Button name="back" back={true} /></NavLink>
                                                            </div>
                                                            <div className="col-2">
                                                                <NavLink to="" style={{ textDecoration: "none" }} onClick={(e) => { page2check(e) }} ><Button name="continue" /></NavLink>
                                                            </div>
                                                        </div>
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
                                                                                        <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "300", fontSize: "19px", lineHeight: "100%" }}>Number*</p>
                                                                                        <input value={details.num} className={(error?.num) ? "new-input-css-2 ml-3 input-error-css" : "new-input-css-2 mb-5 ml-3"} onChange={(e) => { setError({ ...error, num: false }); setDetails({ ...details, "num": e.target.value }) }} type="number" />
                                                                                        {error?.num && <p className="mb-5" style={{ color: "red" }}>*please enter number</p>}
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                        <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "300", fontSize: "19px", lineHeight: "100%" }}>Strike Price*</p>
                                                                                        <input value={details.strike_price} className={(error?.strike_price) ? "new-input-css-2 ml-3 input-error-css" : "new-input-css-2 mb-5 ml-3"} onChange={(e) => { setError({ ...error, strike_price: false }); setDetails({ ...details, "strike_price": e.target.value }) }} type="number" />
                                                                                        {error?.strike_price && <p className="mb-5" style={{ color: "red" }}>*please enter strike price</p>}
                                                                                    </div>

                                                                                </div>
                                                                                <div className="row g-5" >
                                                                                    <div className="col-6">
                                                                                        <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "300", fontSize: "19px", lineHeight: "100%" }}>Vesting Details*</p>
                                                                                        <select onChange={(e) => { setError({ ...error, vesting_details: false });setDetails({ ...details, "vesting_details": e.target.value })  }} style={{ height: "39px" }} className={(error?.vesting_details) ? "new-input-css-2 ml-3 input-error-css" : "new-input-css-2 mb-5 ml-3"} name="vd" id="vd">
                                                                                            <option selected onChange={(e) => { setError({ ...error, vesting_details: false }); setDetails({ ...details, "vesting_details": e.target.value }) }} value={null} >Select</option>
                                                                                            <option onChange={(e) => { setError({ ...error, vesting_details: false }); setDetails({ ...details, "vesting_details": e.target.value }) }} value="481">1/48 monthly, 1yr cliff</option>
                                                                                            <option onChange={(e) => { setError({ ...error, vesting_details: false }); setDetails({ ...details, "vesting_details": e.target.value }) }} value="480">1/48 monthly, no cliff</option>
                                                                                            <option onChange={(e) => { setError({ ...error, vesting_details: false }); setDetails({ ...details, "vesting_details": e.target.value }) }} value="601">1/60 monthly, 1yr cliff</option>
                                                                                            <option onChange={(e) => { setError({ ...error, vesting_details: false }); setDetails({ ...details, "vesting_details": e.target.value }) }} value="600">1/60 monthly, no cliff</option>
                                                                                            <option onChange={(e) => { setError({ ...error, vesting_details: false }); setDetails({ ...details, "vesting_details": e.target.value }) }} value="361">1/36 monthly, 1yr cliff</option>
                                                                                            <option onChange={(e) => { setError({ ...error, vesting_details: false }); setDetails({ ...details, "vesting_details": e.target.value }) }} value="360">1/36 monthly, no cliff</option>

                                                                                        </select>
                                                                                        {/* <input value={details.vesting_details} className={(error?.vesting_details) ? "new-input-css-2 ml-3 input-error-css" : "new-input-css-2 mb-5 ml-3"} onChange={(e) => { setError({ ...error, vesting_details: false }); setDetails({ ...details, "vesting_details": e.target.value }) }} type="text" /> */}
                                                                                        {error?.vesting_details && <p className="mb-5" style={{ color: "red" }}>*please select vesting details</p>}
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                        <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "300", fontSize: "19px", lineHeight: "100%" }}>Vesting Start Date*</p>
                                                                                        <p className={(error?.vesting_start_date) ? "new-input-css-2 ml-3 input-error-css" : "new-input-css-2 mb-5 ml-3"} style={{ height: "39px" }}>
                                                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                                                <KeyboardDatePicker
                                                                                                    autoOk
                                                                                                    format="MM/dd/yyyy"
                                                                                                    value={(details?.vesting_start_date) ? details?.vesting_start_date : null}
                                                                                                    InputAdornmentProps={{ position: "start" }}
                                                                                                    onChange={(e) => { setError({ ...error, vesting_start_date: false }); setDetails({ ...details, "vesting_start_date": e }) }}
                                                                                                />
                                                                                            </MuiPickersUtilsProvider>
                                                                                        </p>
                                                                                        {error?.vesting_start_date && <p className="mb-5" style={{ color: "red" }}>*please select vesting start date</p>}

                                                                                        {/* <input className="new-input-css-2" onChange={(e) => { setDetails({ ...details, "vesting_start_date": e.target.value }) }} type="date" /> */}
                                                                                    </div>

                                                                                </div>
                                                                                <div className="row g-5" >
                                                                                    <div className="col-6">
                                                                                        <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "300", fontSize: "19px", lineHeight: "100%" }}>Deadline after leaving</p>
                                                                                        <input value={details.deadline} className="new-input-css-2" onChange={(e) => { setDetails({ ...details, "deadline": e.target.value }) }} type="text" />
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                    <div className="col-6">
                                                                                        <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "300", fontSize: "19px", lineHeight: "100%" }}>FMP*</p>
                                                                                        <input value={details.fmp} className={(error?.fmp) ? "new-input-css-2 ml-3 input-error-css" : "new-input-css-2 mb-5 ml-3"} onChange={(e) => { setError({ ...error, fmp: false }); setDetails({ ...details, "fmp": e.target.value }) }} type="number" />
                                                                                        {error?.fmp && <p className="mb-5" style={{ color: "red" }}>*please enter FMP</p>}
                                                                                    </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div class="d-flex" style={{ height: "340px" }}>
                                                                                <div style={{ width: "3px", color: "#000" }} class="vr"></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-4">
                                                                            <div className="row g-5 mt-2" >
                                                                                <div className="col">
                                                                                    <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "300", fontSize: "19px", lineHeight: "100%" }}>Pre- exercised options</p>
                                                                                    <input value={details.pre_exercise_option} className="new-input-css-2" onChange={(e) => { setDetails({ ...details, "pre_exercise_option": e.target.value }) }} type="text" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="row mt-5">
                                                                                <div className="col-5"><p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "300", fontSize: "19px", lineHeight: "100%" }}>Vested</p></div>
                                                                                <div className="col-6"><p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "300", fontSize: "19px", lineHeight: "100%" }}>Unvested</p></div>
                                                                            </div>
                                                                            <div className="row">
                                                                            <div className="col-10"><BorderLinearProgress variant="determinate" value={vestingvalue/totalvalue*100} /></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row g-3">
                                                            <div className="col-2">
                                                                <NavLink to="" style={{ textDecoration: "none" }} onClick={() => { setPage(x => (x - 1)); console.log(details); }} ><Button name="back" back={true} /></NavLink>
                                                            </div>
                                                            <div className="col-2">
                                                                <NavLink to="" style={{ textDecoration: "none" }} onClick={(e) => { page3check(e) }} ><Button name="continue" /></NavLink>
                                                            </div>
                                                        </div>

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
                                                            {p2&&<>
                                                                <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "300", fontSize: "23px", lineHeight: "100%" }}>Working at a start-up is like an investment, with its own risk and reward. And with every decsion comes a trade-off. As your ESOPs get vested over the next few years, the main decision for you is whether to double down on equity in return for greater cash comp or choose other alternative assets with better returns. <br/><br/>Given you are in the middle of your vesting cycle, some critical trade-offs you must think carefully about:<br/> <br/>&nbsp;1. Optimal exercise schedule <br/>&nbsp;2. Implicit cost of choosing equity over cash <br/>&nbsp;3. Equity planning under different circumstances</p>
                                                            
                                                            </>}
                                                            {p3&&<>
                                                                <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "250", fontSize: "23px", lineHeight: "100%" }}>
                                                                As you are at the start of your vesting journey, there are some critical trade-offs that must be thought about before signing off on the dotted line.<br/><br/> The best way to look at ESOP vesting is like an SIP, with every monthly/yearly vest being nothing but your company setting aside_______ i.e. your opportunity cost is the difference between FMV and strike price.<br/><br/> Your main job to make an informed decision on whether the asset growth will outompete other alternatives, generating alpha, or would you be better off investing that money elsewhere
                                                                    </p>
                                                            
                                                            </>}
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
                                                                    <div className="col">
                                                                        <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "700", fontSize: "25px", lineHeight: "100%" }}>Vesting</p>
                                                                    </div>
                                                                </div>
                                                                <div className="row g-5">
                                                                    <div className="col-2">
                                                                        <p style={{ fontSize: "normal", fontWeight: "400", fontSize: "20px", lineHeight: "100%" }}>{details.num}</p>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <p style={{ fontSize: "normal", fontWeight: "400", fontSize: "20px", lineHeight: "100%" }}>{details.grant_type}</p>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <p style={{ fontSize: "normal", fontWeight: "400", fontSize: "20px", lineHeight: "100%" }}>{details.strike_price}</p>
                                                                    </div>
                                                                    <div className="col">
                                                                        <p style={{ fontSize: "normal", fontWeight: "400", fontSize: "20px", lineHeight: "100%" }}><BorderLinearProgress variant="determinate" value={vestingvalue/totalvalue*100} /></p>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <p style={{ fontSize: "normal", fontWeight: "400", fontSize: "20px", lineHeight: "100%" }}><NavLink to="" style={{ textDecoration: "none", color: "black" }} onClick={() => { setPage(x => (x - 1)); console.log(details); }} ><FontAwesomeIcon icon={faEdit} /></NavLink></p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row g-5">
                                                            <div className="col-2">
                                                                <NavLink to="" style={{ textDecoration: "none" }} onClick={() => { setPage(x => (x - 1)); console.log(details); }} ><Button name="back" back={true} /></NavLink>
                                                            </div>
                                                            <div className="col-2">
                                                                <NavLink to="" style={{ textDecoration: "none" }} onClick={(e) => { addGrant(e);  console.log(details); }} ><Button name="continue" /></NavLink>
                                                            </div>
                                                        </div>

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
            </>}
        </>
    );
};

export default AddGrants;
