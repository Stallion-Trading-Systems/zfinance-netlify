import React, { useEffect, useState } from 'react'
import PostfolioChart from '../../ZComponents/recharts/portfolioChart.jsx'
import * as api from "../../axios.js"
import { useNavigate } from 'react-router'
import { Sidebar } from "react-responsive-sidebar"
import Button from '../../Components/Button/Button.jsx'
import monkey from "../../assets/monkey.svg"
import { items } from '../../ZComponents/items.js'
import "./portfolio.css"
import { FormControl, InputLabel, NativeSelect } from '@mui/material'

const Portfolio = () => {
  const [cdetails, setcDetails] = useState([])
  const [chartdetails, setChartDetails] = useState()
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userobj = JSON.parse(localStorage.getItem('user'));
  const [openlogout, setOpenlogout] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [sensex, setSensex] = useState();
  const [selectt, setSelectt] = useState("sensex");
  const [checkc, setcheckc] = useState(false)
  const [isActive2, setIsActive2] = useState(false);

  //error state
  const [ttiError,setttiError]=useState(false)
  const [ipopriceError,setipopriceError]=useState(false)

  const handleClick2 = (event) => {
    setIsActive2((current) => !current);
  };
  const defaultClick2 = (e) => {
    setIsActive2(false);
  };
  if (user === null) {
    setTimeout(() => {
      navigate("/signin");
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
    navigate("/signin");
  };
  const toAdvisory=(e)=>{
    e.preventDefault()
    console.log(variables?.time_to_ipo);
    if(!variables?.time_to_ipo||!variables?.ipo_price){
      if(!variables?.time_to_ipo){
        setttiError(true)
      }
      if(!variables?.ipo_price){
        setipopriceError(true)
      }
      return
    }
    localStorage.removeItem("zionn-variables");
    localStorage.setItem(
      "zionn-variables",
      JSON.stringify({ time_to_ipo: variables.time_to_ipo, ipo_price: variables.ipo_price }
        ))
    navigate("/advisory")

  }
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
      console.log(res.data.data);
    }
    async function f() {
      let res2 = await api.checkCname({ c_name: chartdetails?.c_name })

      if (res2.data.message == "No") {
        {
          setcDetails([{
            name: "Series_A",
            date: "05-11-2000",
            price: chartdetails?.fmp
          }])
        }
      }
      else {
        let res = await api.getcData({ c_name: chartdetails?.c_name })
        setcDetails(res.data.obj)
      }
    }

    chartdata()
    f()
    sensexdata()
  }, [chartdetails?.c_name])
  // console.log(cdetails);
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
                      <div className="row mt-3">
                        <div className="col-3">
                          <p className="pp-chirka mt-4" style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>Quantity</p>
                          <input className='new-input-css-2' style={{ width: "150px" }} type="number" value={chartdetails?.num} disabled />
                        </div>
                        <div className="col-3">
                          <p className="pp-chirka mt-4" style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>Strike Price</p>
                          <input className='new-input-css-2' style={{ width: "150px" }} type="number" value={chartdetails?.strike_price} disabled />
                        </div>
                        <div className="col-3">
                          <p className="pp-chirka mt-4" style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>Vesting Start</p>
                          <input className='new-input-css-2' style={{ width: "150px" }} type="text" value={chartdetails?.vesting_start_date} disabled />
                        </div>
                        {!checkc &&
                          <div className="col-3">
                            <p className="pp-chirka mt-4" style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>Latest Price</p>
                            <input className='new-input-css-2' style={{ width: "150px" }} type="number" value={chartdetails?.fmp} disabled />
                          </div>
                        }
                        {checkc && cdetails &&
                          <div className="col-3">
                            <p className="pp-chirka mt-4" style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>Latest Price</p>
                            <input className='new-input-css-2' style={{ width: "150px" }} type="number" value={cdetails[cdetails.length - 1].price} disabled />
                          </div>
                        }
                      </div>
                      <div className="row">
                        <p className="pp-chirka mt-5" style={{ fontSize: "normal", fontWeight: "700", fontSize: "25px", lineHeight: "100%" }}>Variables</p>
                        <div className="col-3">
                          <p className="pp-chirka " style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>Time to IPO</p>
                          <input onChange={(e) => { setVariables({ ...variables, time_to_ipo: e.target.value * 12 }); setttiError(false) }} className={ttiError?'new-input-css-2 input-error-css':'new-input-css-2'} style={{ width: "150px" }} type="number" />
                          {ttiError&&<p style={{color:"red"}}>*please enter time to ipo</p>}
                        </div>
                        {/* <div className="col-3">
                          <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>Lock-in</p>
                          <input onChange={(e) => { setVariables({ ...variables, lock_in: e.target.value }) }} className='new-input-css-2' style={{ width: "150px" }} type="number" />
                        </div> */}
                        <div className="col-3">
                          <p className="pp-chirka " style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>IPO Price</p>
                          <input onChange={(e) => { setVariables({ ...variables, ipo_price: e.target.value }); setipopriceError(false) }} className={ipopriceError?'new-input-css-2 input-error-css':'new-input-css-2'} style={{ width: "150px" }} type="number" />
                          {ipopriceError&&<p style={{color:"red"}}>*please enter ipo price</p>}
                        </div>
                        {/* <div className="col-3">
                          <p className="pp-chirka " style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>Discount</p>
                          <input onChange={(e) => { setVariables({ ...variables, discount: e.target.value }) }} className='new-input-css-2' style={{ width: "150px" }} type="number" />
                        </div> */}
                      </div>
                    </div>
                    <div className="row ">
                      <div style={{ backgroundColor: "#FEFCF7" }} className="col-11 p-5">

                        <div className="row mb-5">
                          <div className="col-9 "></div>

                          <div className="col-2">
                            <select onChange={(e) => { setSelectt(e.target.value) }} style={{ color: "white", fontSize: "20px" }}
                              className='drop-down-portfolio' name="cars" id="cars">
                              {/* <option value="compare">Compare w/</option> */}
                              <option value="sensex">Sensex</option>
                              <option value="bse_500">BSE 500</option>
                              <option value="bse_ipo">BSE IPO</option>
                              <option value="bse_largecap">BSE Large Cap</option>
                              <option value="bse_smallcap">BSE Small Cap</option>
                            </select></div>
                        </div>

                        <div style={{ marginTop: "90px" }} className="row">
                          {chartdetails && <PostfolioChart data={cdetails} type={selectt} cd={chartdetails} sensex={sensex} vd={chartdetails?.vesting_details} variables={variables} num={chartdetails?.num} vs={chartdetails?.vs} />}
                        </div>
                      </div>
                      <div className="col-4"></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-4"></div>
                      <div className="col-4">
                      {(ttiError||ipopriceError)&&<p style={{color:"red"}}>*please enter IPO details</p>}
                        
                        <button
                          onPointerLeave={defaultClick2}
                          onPointerDown={handleClick2}
                          onPointerUp={handleClick2}
                          onClick={(e)=>{toAdvisory(e)}}
                          className={isActive2 ? "butt butt-ac" : "butt"}
                        >
                          advisory
                          <i class="bi bi-arrow-up-right"></i>
                        </button>
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

export default Portfolio