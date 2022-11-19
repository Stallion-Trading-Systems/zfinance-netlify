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
  const [cdetails, setcDetails] = useState()
  const [chartdetails, setChartDetails] = useState()
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userobj = JSON.parse(localStorage.getItem('user'));
  const [openlogout, setOpenlogout] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [sensex,setSensex]=useState();
  const [selectt,setSelectt]=useState("nifty");
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
    async function f() {
      let res = await api.getcData({ c_name: "swiggy" })
      setcDetails(res.data.obj)
    }
    f()
    async function chartdata() {
      let res = await api.getChartData({ email: userobj?.email })
      // console.log(res.data.message);
      setChartDetails(res.data.message)

    }
    async function sensexdata(){
      let res=await api.getSensexData()
      setSensex(res.data.data)
      console.log(res.data.data);
    }
    sensexdata()
    chartdata()
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
                    <div className="row p-5 pt-0 ">
                      <div className="col-10">
                        <h3 className="pp-chirka" style={{ fontSize: "normal", fontWeight: "700", fontSize: "32px", lineHeight: "100%", textDecorationLine: "underline" }}>Portfolio</h3>
                        <h3 className="pp-chirka mt-3" style={{ fontSize: "normal", fontWeight: "700", fontSize: "32px", lineHeight: "100%" }}>c name</h3>

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
                        <div className="col-3">
                          <p className="pp-chirka mt-4" style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>Latest Price</p>
                          <input className='new-input-css-2' style={{ width: "150px" }} type="number" value={chartdetails?.fmp} disabled />
                        </div>
                      </div>
                      <div className="row">
                        <p className="pp-chirka mt-5" style={{ fontSize: "normal", fontWeight: "700", fontSize: "25px", lineHeight: "100%" }}>Variables</p>
                        <div className="col-3">
                          <p className="pp-chirka " style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>Time to IPO</p>
                          <input onChange={(e) => { setVariables({ ...variables, time_to_ipo: e.target.value }) }} className='new-input-css-2' style={{ width: "150px" }} type="number" />
                        </div>
                        <div className="col-3">
                          <p className="pp-chirka" style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>Lock-in</p>
                          <input onChange={(e) => { setVariables({ ...variables, lock_in: e.target.value }) }} className='new-input-css-2' style={{ width: "150px" }} type="number" />
                        </div>
                        <div className="col-3">
                          <p className="pp-chirka " style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>IPO Price</p>
                          <input onChange={(e) => { setVariables({ ...variables, ipo_price: e.target.value }) }} className='new-input-css-2' style={{ width: "150px" }} type="number" />
                        </div>
                        <div className="col-3">
                          <p className="pp-chirka " style={{ fontSize: "normal", fontWeight: "700", fontSize: "22px", lineHeight: "100%" }}>Discount</p>
                          <input onChange={(e) => { setVariables({ ...variables, discount: e.target.value }) }} className='new-input-css-2' style={{ width: "150px" }} type="number" />
                        </div>
                      </div>
                    </div>
                    <div className="row p-5">
                      <div style={{ backgroundColor: "#FEFCF7" }} className="col-10 p-5">

                        <div className="row mb-5">
                          <div className="col-9 "></div>

                          <div className="col-2">
                            <select onChange={(e)=>{setSelectt(e.target.value)}} style={{ color: "white", fontSize: "20px" }}
                                className='drop-down-portfolio' name="cars" id="cars">
                              <option value="nifty">Nifty 50</option>
                              <option value="sensex">Sensex</option>
                            </select></div>
                        </div>

                        <div className="row mt-5">
                          {chartdetails && <PostfolioChart data={cdetails} type={selectt} cd={chartdetails} sensex={sensex} vd={chartdetails?.vesting_details} variables={variables} num={chartdetails?.num} vs={chartdetails?.vs} />}
                        </div>
                      </div>
                      <div className="col-4"></div>
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