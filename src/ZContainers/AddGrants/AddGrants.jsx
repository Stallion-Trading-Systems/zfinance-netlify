import React, { Fragment, useEffect, useRef, useState } from "react";
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
import { searchFilter } from "../../ZComponents/Search/Filter.js";
import "../../ZComponents/Search/search.css"

const AddGrants = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userobj = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
        setTimeout(() => {
            navigate("/auth");
        }, 1000)
    }
    const list = [
        {
            id: 1,
            name: "Ather"
        },
        {
            id: 2,
            name: "Atlan"
        },
        {
            id: 3,
            name: "Bankbazaar"
        },
        {
            id: 4,
            name: "Bizongo"
        },
        {
            id: 5,
            name: "Bluestone"
        },
        {
            id: 6,
            name: "Boat"
        },
        {
            id: 7,
            name: "BookMyShow"
        },
        {
            id: 8,
            name: "Brightchamps"
        },
        {
            id: 9,
            name: "Capillary Tech"
        },
        {
            id: 10,
            name: "Capital Float"
        },
        {
            id: 11,
            name: "Captain Fresh"
        },
        {
            id: 12,
            name: "CarTrade"
        },
        {
            id: 13,
            name: "Cashfree"
        },
        {
            id: 14,
            name: "Citymall"
        },
        {
            id: 15,
            name: "Classplus"
        },
        {
            id: 16,
            name: "Clear"
        },
        {
            id: 17,
            name: "Country Delight"
        },
        {
            id: 18,
            name: "CueMath"
        },
        {
            id: 19,
            name: "DeHaat"
        },
        {
            id: 20,
            name: "Drip Capital"
        },
        {
            id: 21,
            name: "Dunzo"
        },
        {
            id: 22,
            name: "EatClub Brands "
        },
        {
            id: 23,
            name: "Ecom Express"
        },
        {
            id: 24,
            name: "Exotel"
        },
        {
            id: 25,
            name: "FarEye"
        },
        {
            id: 26,
            name: "Fi"
        },
        {
            id: 27,
            name: "Filo"
        },
        {
            id: 28,
            name: "FINO Paytech"
        },
        {
            id: 29,
            name: "Finova Capital"
        },
        {
            id: 30,
            name: "FreshToHome"
        },
        {
            id: 31,
            name: "Furlenco"
        },
        {
            id: 32,
            name: "GreyOrange"
        },
        {
            id: 33,
            name: "Hackerrank"
        },
        {
            id: 34,
            name: "HealthifyMe"
        },
        {
            id: 35,
            name: "Homelane"
        },
        {
            id: 36,
            name: "Hopscotch"
        },
        {
            id: 37,
            name: "Hubilo"
        },
        {
            id: 38,
            name: "Incred"
        },
        {
            id: 39,
            name: "IndiaMart"
        },
        {
            id: 40,
            name: "IndMoney"
        },
        {
            id: 41,
            name: "Infibeam"
        },
        {
            id: 42,
            name: "Inshorts"
        },
        {
            id: 43,
            name: "Jumbotail"
        },
        {
            id: 44,
            name: "Jupiter.money"
        },
        {
            id: 45,
            name: "Juspay"
        },
        {
            id: 46,
            name: "Khatabook"
        },
        {
            id: 47,
            name: "Kissht"
        },
        {
            id: 48,
            name: "KreditBee"
        },
        {
            id: 49,
            name: "Lambdatest"
        },
        {
            id: 50,
            name: "LeadSquared"
        },
        {
            id: 51,
            name: "LendingKart"
        },
        {
            id: 52,
            name: "Loco"
        },
        {
            id: 53,
            name: "LogiNext"
        },
        {
            id: 54,
            name: "M2P Fintech"
        },
        {
            id: 55,
            name: "mCaffeine"
        },
        {
            id: 56,
            name: "Medgenome"
        },
        {
            id: 57,
            name: "Medikabazaar"
        },
        {
            id: 58,
            name: "MFine"
        },
        {
            id: 59,
            name: "MoEngage"
        },
        {
            id: 60,
            name: "Money View"
        },
        {
            id: 61,
            name: "Mswipe"
        },
        {
            id: 62,
            name: "Mygate"
        },
        {
            id: 63,
            name: "Navi Technologies"
        },
        {
            id: 64,
            name: "Nazara tech"
        },
        {
            id: 65,
            name: "Netradyne"
        },
        {
            id: 66,
            name: "Ninjacart"
        },
        {
            id: 67,
            name: "Niyo"
        },
        {
            id: 68,
            name: "OneCard"
        },
        {
            id: 69,
            name: "Paymate"
        },
        {
            id: 70,
            name: "Pepperfry"
        },
        {
            id: 71,
            name: "PlayShifu"
        },
        {
            id: 72,
            name: "Pocket FM"
        },
        {
            id: 73,
            name: "Porter"
        },
        {
            id: 74,
            name: "Practo"
        },
        {
            id: 75,
            name: "Pratilipi"
        },
        {
            id: 76,
            name: "Purplle"
        },
        {
            id: 77,
            name: "Rapido"
        },
        {
            id: 78,
            name: "Refyne"
        },
        {
            id: 79,
            name: "Rupeek"
        },
        {
            id: 80,
            name: "Scaler Academy"
        },
        {
            id: 81,
            name: "Scripbox"
        },
        {
            id: 82,
            name: "Shiprocket"
        },
        {
            id: 83,
            name: "Smartron"
        },
        {
            id: 84,
            name: "Square Yards"
        },
        {
            id: 85,
            name: "Stader Labs"
        },
        {
            id: 86,
            name: "Stanza Living"
        },
        {
            id: 87,
            name: "Sugar"
        },
        {
            id: 88,
            name: "Teachmint"
        },
        {
            id: 89,
            name: "True Balance"
        },
        {
            id: 90,
            name: "Turtlemint"
        },
        {
            id: 91,
            name: "Uni Cards"
        },
        {
            id: 92,
            name: "Wakefit"
        },
        {
            id: 93,
            name: "Waycool"
        },
        {
            id: 94,
            name: "Whatfix"
        },
        {
            id: 95,
            name: "WinZO"
        },
        {
            id: 96,
            name: "Zenwork"
        },
        {
            id: 97,
            name: "Zepto"
        },
        {
            id: 98,
            name: "Zestmoney"
        },
        {
            id: 99,
            name: "Zoomcar"
        },
        {
            id: 100,
            name: "Zupee"
        },
        {
            id: 101,
            name: "Purplle"
        },
        {
            id: 102,
            name: "PhysicsWallah"
        },
        {
            id: 103,
            name: "Open Financial Technologies"
        },
        {
            id: 104,
            name: "Games24x7"
        },
        {
            id: 105,
            name: "Oxyzo Financial Services"
        },
        {
            id: 106,
            name: "Amagi Media Labs"
        },
        {
            id: 107,
            name: "CredAvenue"
        },
        {
            id: 108,
            name: "Hasura"
        },
        {
            id: 109,
            name: "Uniphore Software Systems"
        },
        {
            id: 110,
            name: "XpressBees Logistics"
        },
        {
            id: 111,
            name: "LivSpace"
        },
        {
            id: 112,
            name: "ElasticRun"
        },
        {
            id: 113,
            name: "Polygon"
        },
        {
            id: 114,
            name: "DealShare"
        },
        {
            id: 115,
            name: "DarwinBox"
        },
        {
            id: 116,
            name: "LEAD School"
        },
        {
            id: 117,
            name: "Fractal"
        },
        {
            id: 118,
            name: "GlobalBees"
        },
        {
            id: 119,
            name: "Mamaearth"
        },
        {
            id: 120,
            name: "Pristyn Care"
        },
        {
            id: 121,
            name: "Slice"
        },
        {
            id: 122,
            name: "Upstox"
        },
        {
            id: 123,
            name: "Spinny"
        },
        {
            id: 124,
            name: "NoBroker"
        },
        {
            id: 125,
            name: "Mensa Brands"
        },
        {
            id: 126,
            name: "CureFit"
        },
        {
            id: 127,
            name: "MyGlamm"
        },
        {
            id: 128,
            name: "Acko"
        },
        {
            id: 129,
            name: "Cardekho"
        },
        {
            id: 130,
            name: "Rebel Foods"
        },
        {
            id: 131,
            name: "CoinSwitch"
        },
        {
            id: 132,
            name: "Licious"
        },
        {
            id: 133,
            name: "Vedantu"
        },
        {
            id: 134,
            name: "Apna.co"
        },
        {
            id: 135,
            name: "Mobile Premier League"
        },
        {
            id: 136,
            name: "Zetwerk"
        },
        {
            id: 137,
            name: "Blinkit"
        },
        {
            id: 138,
            name: "Eruditus"
        },
        {
            id: 139,
            name: "CoinDCX"
        },
        {
            id: 140,
            name: "upGrad"
        },
        {
            id: 141,
            name: "MindTickle"
        },
        {
            id: 142,
            name: "BharatPe"
        },
        {
            id: 143,
            name: "OfBusiness"
        },
        {
            id: 144,
            name: "Droom"
        },
        {
            id: 145,
            name: "BlackBuck"
        },
        {
            id: 146,
            name: "BrowserStack"
        },
        {
            id: 147,
            name: "Zeta"
        },
        {
            id: 148,
            name: "Moglix"
        },
        {
            id: 149,
            name: "Urban Company"
        },
        {
            id: 150,
            name: "ChargeBee"
        },
        {
            id: 151,
            name: "Gupshup"
        },
        {
            id: 152,
            name: "ShareChat"
        },
        {
            id: 153,
            name: "Groww"
        },
        {
            id: 154,
            name: "PharmEasy"
        },
        {
            id: 155,
            name: "CRED"
        },
        {
            id: 156,
            name: "Meesho"
        },
        {
            id: 157,
            name: "FirstCry"
        },
        {
            id: 158,
            name: "Five Star Business Finance"
        },
        {
            id: 159,
            name: "Infra.Market"
        },
        {
            id: 160,
            name: "Innovaccer"
        },
        {
            id: 161,
            name: "Digit"
        },
        {
            id: 162,
            name: "Glance InMobi"
        },
        {
            id: 163,
            name: "Dailyhunt"
        },
        {
            id: 164,
            name: "Zenoti"
        },
        {
            id: 165,
            name: "PhonePe"
        },
        {
            id: 166,
            name: "Cars24"
        },
        {
            id: 167,
            name: "RazorPay"
        },
        {
            id: 168,
            name: "Unacademy"
        },
        {
            id: 169,
            name: "Postman"
        },
        {
            id: 170,
            name: "Nykaa^"
        },
        {
            id: 171,
            name: "Pine Labs"
        },
        {
            id: 172,
            name: "Lenskart"
        },
        {
            id: 173,
            name: "Ola Electric"
        },
        {
            id: 174,
            name: "CitiusTech"
        },
        {
            id: 175,
            name: "Icertis"
        },
        {
            id: 176,
            name: "Druva Software"
        },
        {
            id: 177,
            name: "Dream11"
        },
        {
            id: 178,
            name: "BigBasket"
        },
        {
            id: 179,
            name: "Rivigo"
        },
        {
            id: 180,
            name: "Delhivery"
        },
        {
            id: 181,
            name: "BillDesk^"
        },
        {
            id: 182,
            name: "Udaan"
        },
        {
            id: 183,
            name: "OYO Rooms"
        },
        {
            id: 184,
            name: "Freshworks^"
        },
        {
            id: 185,
            name: "PolicyBazaar^"
        },
        {
            id: 186,
            name: "Swiggy"
        },
        {
            id: 187,
            name: "PayTM Mall*"
        },
        {
            id: 188,
            name: "BYJUS"
        },
        {
            id: 189,
            name: "Hike*"
        },
        {
            id: 190,
            name: "ShopClues*"
        },
        {
            id: 191,
            name: "Zomato^"
        },
        {
            id: 192,
            name: "Quikr*"
        },
        {
            id: 193,
            name: "Ola Cabs"
        },
        {
            id: 194,
            name: "PayTM"
        },
        {
            id: 195,
            name: "Snapdeal*"
        },
        {
            id: 196,
            name: "Mu Sigma"
        },
        {
            id: 197,
            name: "Flipkart^"
        },
        {
            id: 198,
            name: "InMobi"
        }
    ];
    let date = new Date()
    let year = date.getFullYear()
    year -= 2000
    let month = date.getMonth()
    month += 1;
    year = 12 * year
    year += month
    const [openlogout, setOpenlogout] = useState(false);
    const [page, setPage] = useState(1);
    const [details, setDetails] = useState({ email: userobj?.email });
    const [isActive, setIsActive] = useState(false);
    const [p2, setp2] = useState(false);
    const [p3, setp3] = useState(false);
    let vestingvalue = 0;
    let totalvalue = 1;
    const [error, setError] = useState({ c_name: false, num: false, strike_price: false, vesting_details: false, vesting_start_date: false, fmp: false })
    const handleClick = (e) => {
        e.preventDefault();
        setIsActive((current) => !current);
    };
    const defaultClick = (e) => {
        e.preventDefault();
        setIsActive(false);
    };

    if (details?.fmp && details?.num) {
        totalvalue = parseInt(details?.fmp) * parseInt(details?.num)
        if (details?.vesting_details && details?.vesting_start_date) {
            let smonth = details?.vesting_start_date.getMonth() + 1;
            let syear = details?.vesting_start_date.getFullYear()
            syear -= 2000
            syear *= 12
            syear += smonth
            let period = year - syear + 1

            let cliff = (details?.vesting_details.substring(2, 3) == "1") ? 1 : 0
            let m = parseInt(details?.vesting_details.substring(0, 2))
            if (cliff) {
                if (period < 12) {
                    vestingvalue = 0
                }
                else {
                    vestingvalue = details?.fmp * details?.num * period / m
                }
            }
            else {
                vestingvalue = details?.fmp * details?.num * period / m
            }
        }
        if (vestingvalue > totalvalue) vestingvalue = totalvalue
        // console.log(vestingvalue,totalvalue);
    }
    let logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        navigate("/auth");
    };
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);

    // click away listener
    useEffect(() => {
        document.addEventListener("mousedown", handleClick2, false);
        return () => document.removeEventListener("mousedown", handleClick2, false);
    }, []);

    const handleClick2 = (e) => {
        if (dropdownRef.current.contains(e.target)) {
            return;
        }
        setVisible(false);
    };

    const handleChange2 = (e) => {
        setSearchValue(e.target.value);
        setError({ ...error, c_name: false }); 
        setDetails({ ...details, "c_name": e.target.value });
        if (!visible) {
            setVisible(true);
        }
    };

    const selectItem = (item) => {
        setSearchValue(item.name);
        setSelectedItem(item.id);
        setError({ ...error, c_name: false }); 
        setDetails({ ...details, "c_name": item.name });
        setVisible(false);
    };

    const selectChange = (e) => {
        console.log(e.target.value);
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
        let date = new Date()
        let year = date.getFullYear()
        year -= 2000;
        year *= 12
        year += date.getMonth()
        console.log(year);
        let syear = details?.vesting_start_date.getFullYear()
        syear -= 2000;
        syear *= 12
        syear += details?.vesting_start_date.getMonth()
        syear = year - syear
        console.log(syear);
        setp3(false)
        setp2(false)
        if (syear >= 24 && syear < 48) {
            setp2(true)
            console.log("p2");
        }
        else if (syear < 24) {
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
                                <div className="container mb-5 p-5 pt-0">
                                    <div className="row p-5 pl-0 pt-0">
                                        <div className="col-10">
                                            <LinearProgressWithLabel value={(page) / 4 * 100} />
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
                                                                {/* <input value={details.c_name} type="text" onChange={(e) => { e.preventDefault(); setError({ ...error, c_name: false }); setDetails({ ...details, "c_name": e.target.value }) }} className={(error?.c_name) ? "new-input-css ml-3 input-error-css" : "new-input-css mb-5 ml-3"} required /> */}
                                                                <div className="container mb-5">
                                                                    <div tabIndex="0" className="input_container">
                                                                        <input
                                                                            className="input"
                                                                            type="text"
                                                                            placeholder="Search Company"
                                                                            value={details.c_name}
                                                                            onChange={handleChange2}
                                                                            onFocus={() => {
                                                                                // if (searchValue) {
                                                                                setVisible(true);
                                                                                // };
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div ref={dropdownRef} className={`dropdown ${visible ? "v" : ""}`}>
                                                                        {visible && (
                                                                            <ul>
                                                                                {!list && (
                                                                                    <li key="zxc" className="dropdown_item">
                                                                                        no result
                                                                                    </li>
                                                                                )}
                                                                                {/* you can remove the searchFilter if you get results from Filtered API like Google search */}
                                                                                {list &&
                                                                                    searchFilter(searchValue, list).map((x) => (
                                                                                        <li
                                                                                            key={x.id}
                                                                                            onClick={() => selectItem(x)}
                                                                                            className="dropdown_item"
                                                                                        >
                                                                                            <div className="item_text1">{x.name}</div>
                                                                                        </li>
                                                                                    ))}
                                                                            </ul>
                                                                        )}
                                                                    </div>
                                                                </div>
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
                                                                                            <select onChange={(e) => { setError({ ...error, vesting_details: false }); setDetails({ ...details, "vesting_details": e.target.value }) }} style={{ height: "39px" }} className={(error?.vesting_details) ? "new-input-css-2 ml-3 input-error-css" : "new-input-css-2 mb-5 ml-3"} name="vd" id="vd">
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
                                                                                    <div className="col-10"><BorderLinearProgress variant="determinate" value={vestingvalue / totalvalue * 100} /></div>
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
                                                                {p2 && <>
                                                                    <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "300", fontSize: "23px", lineHeight: "100%" }}>Working at a start-up is like an investment, with its own risk and reward. And with every decsion comes a trade-off. As your ESOPs get vested over the next few years, the main decision for you is whether to double down on equity in return for greater cash comp or choose other alternative assets with better returns. <br /><br />Given you are in the middle of your vesting cycle, some critical trade-offs you must think carefully about:<br /> <br />&nbsp;1. Optimal exercise schedule <br />&nbsp;2. Implicit cost of choosing equity over cash <br />&nbsp;3. Equity planning under different circumstances</p>

                                                                </>}
                                                                {p3 && <>
                                                                    <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "250", fontSize: "23px", lineHeight: "100%" }}>
                                                                        As you are at the start of your vesting journey, there are some critical trade-offs that must be thought about before signing off on the dotted line.<br /><br /> The best way to look at ESOP vesting is like an SIP, with every monthly/yearly vest being nothing but your company setting aside_______ i.e. your opportunity cost is the difference between FMV and strike price.<br /><br /> Your main job to make an informed decision on whether the asset growth will outompete other alternatives, generating alpha, or would you be better off investing that money elsewhere
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
                                                                            <p style={{ fontSize: "normal", fontWeight: "400", fontSize: "20px", lineHeight: "100%" }}><BorderLinearProgress variant="determinate" value={vestingvalue / totalvalue * 100} /></p>
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
                                                                    <NavLink to="" style={{ textDecoration: "none" }} onClick={(e) => { addGrant(e); console.log(details); }} ><Button name="continue" /></NavLink>
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
