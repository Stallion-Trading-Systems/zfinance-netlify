import React, { useEffect } from 'react'
import Button from '../../Components/Button/Button.jsx'
import * as api from "../../axios.js"
import { useState } from 'react'
import { Tooltip } from '@mui/material'
import { NavLink } from 'react-router-dom'

const Table1 = (props) => {
    let vestingdetails = props.vestingdetails
    let date = new Date().toDateString().substring(4)
    console.log(vestingdetails?.fmp);
    const [exitPrice, setExitPrice] = useState()
    let c_name = vestingdetails?.c_name
    let ipoDetails = props.ipoDetails
    useEffect(() => {
        setExitPrice(parseInt(vestingdetails?.fmp))
        async function checkBid() {
            let res = await api.checkbid({ c_name: c_name })
            if (res?.data.message != "No price found") {
                console.log(res.data.message);
                setExitPrice(parseInt(res.data.message?.buy_price))
            }
            // console.log(res);
        }

        async function getFmp() {
            let res2 = await api.checkCname({ c_name: c_name })
            if (res2.data.message != "No") {
                let res22 = await api.getcData({ c_name: c_name })
                setExitPrice(parseInt(res22.data.obj[res22.data.obj?.length - 1]?.price))
                console.log(res22);
            }


        }
        getFmp()
        checkBid()
    }, [c_name])
    const numFor = Intl.NumberFormat('en-US');
    let totalexercisecost = vestingdetails?.strike_price * vestingdetails?.num + Math.ceil((vestingdetails?.fmp * vestingdetails?.num - vestingdetails?.strike_price * vestingdetails?.num) * 0.3);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <table class="table table-borderless table-fields">
                            <thead>
                                <tr >
                                    <th style={{ border: "0px" }} scope='col'>Plans</th>
                                    <th style={{ backgroundColor: "#fbf7ec" }} scope="col">Secondary sale</th>
                                    <th scope="col">Exercise & hold</th>
                                    <th style={{ backgroundColor: "#fbf7ec" }} scope="col">Exercise at exit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}>Rationale</td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}>Given your need for liquidity, the best option is to sell your holdings on a secondary marketplace.<br /> Visit <NavLink style={{color:"black"}} to="/marketplace">here</NavLink> for marketplace</td>
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
                                    <td className='bold-underline-advisory-css' style={{ border: "0px" }}>Summary</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}></td>
                                    <td></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}></td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}># of options used</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(vestingdetails?.num)}</td>
                                    <td>{numFor.format(vestingdetails?.num)}</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(vestingdetails?.num)}</td>
                                </tr>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                    <td><hr /></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Date of exercise</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{props?.dateplus2}</td>
                                    <td>{date}</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{props?.dateplusipo}</td>
                                </tr>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                    <td><hr /></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                </tr>
                                <tr style={{ backgroundColor: "#fbf7ec" }}>
                                    <td style={{ border: "0px", backgroundColor: "#FFF" }}>Liquidity risk  <Tooltip title="This has to be one of the most important factors to be kept in mind whenever deciding on whether to double down on ESOPs or not, requiring not just numerical calculations, but also, based on your interactions with the senior team, how probable is an IPO/Merger. Always remember, cash in hand > cash on paper." placement="right" arrow><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg></Tooltip></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }} >
                                        <div className='container'>
                                            <div className="row">
                                                <div className="col-4"></div>
                                                <div className="col-4">
                                                    <p className='cell-green'>LOW</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ backgroundColor: "#FFF" }}>
                                        <div className='container'>
                                            <div className="row">
                                                <div className="col-4"></div>
                                                <div className="col-4">
                                                    <p className='cell-red'>HIGH</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>
                                        <div className='container'>
                                            <div className="row">
                                                <div className="col-4"></div>
                                                <div className="col-4">
                                                    <p className='cell-red'>HIGH</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}></td>
                                    <td></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}></td>
                                </tr>
                                <tr>
                                    <td className='bold-underline-advisory-css' style={{ border: "0px" }}>Your exercise costs</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}></td>
                                    <td> </td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Latest share price</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(vestingdetails?.fmp)}</td>
                                    <td> {numFor.format(vestingdetails?.fmp)}</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}> {numFor.format(vestingdetails?.fmp)}</td>
                                </tr>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                    <td><hr /></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Exercise cost  <Tooltip title="This is what you pay to exercise your options. It is a function of strike times number of options" placement="right" arrow><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg></Tooltip></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(vestingdetails?.strike_price * vestingdetails?.num)}</td>
                                    <td>{numFor.format(vestingdetails?.strike_price * vestingdetails?.num)}</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(vestingdetails?.strike_price * vestingdetails?.num)}</td>
                                </tr>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                    <td><hr /></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Taxes on exercise  <Tooltip title={<React.Fragment>

                                        You are supposed to pay the differential b/w latest share price and strike price, as the government views this gap as an income. This income is taxed at your existing tax slab. There is a small subset of companies that are exempt from paying this tax. Please contact <a style={{ color: "white" }} href='https://calendly.com/bhanu_zionn/intro' target="__blank">here</a> to learn more.</React.Fragment>} placement="right" arrow><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                        </svg></Tooltip></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(Math.ceil((vestingdetails?.fmp * vestingdetails?.num - vestingdetails?.strike_price * vestingdetails?.num) * 0.3))}</td>
                                    <td>{numFor.format(Math.ceil((vestingdetails?.fmp * vestingdetails?.num - vestingdetails?.strike_price * vestingdetails?.num) * 0.3))}</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>0</td>
                                </tr>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                    <td><hr /></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Total exercise costs <Tooltip title="This is the sum total of Exercise cost and Taxes on exercise." placement="right" arrow><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg></Tooltip></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(totalexercisecost)}</td>
                                    <td>{numFor.format(totalexercisecost)}</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(vestingdetails?.strike_price * vestingdetails?.num)}</td>
                                </tr>
                                <tr>
                                    <td className='bold-underline-advisory-css' style={{ border: "0px" }}>Your returns</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                    <td> </td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Exit Price</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(exitPrice * vestingdetails?.num)} </td>
                                    <td>{numFor.format(ipoDetails?.ipo_price * vestingdetails?.num)}  </td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(ipoDetails?.ipo_price * vestingdetails?.num)}  </td>
                                </tr>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                    <td><hr /></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Exercise Cost</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(totalexercisecost)} </td>
                                    <td>{numFor.format(totalexercisecost)} </td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(vestingdetails?.strike_price * vestingdetails?.num)} </td>
                                </tr>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                    <td><hr /></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                </tr>
                                <tr  >
                                    <td style={{ border: "0px" }}>Taxes on sale <Tooltip title={<React.Fragment>Under Secondary sale: Assuming the price you get is the same as last round valuation, you shouldn't be paying any more taxes.
                                        Under Exercise and Hold: given there was tax paid upon exercise, plus time has lapsed since purchase, you'd be eligible for LTCG.
                                        Under Exercise at Exit: You'd be liable to pay taxes at your income tax slab. This is one of the most tax inefficient options.
                                        Please get in touch <a style={{ color: "white" }} href='https://calendly.com/bhanu_zionn/intro' target="__blank">here</a> if you are interested in learning more about taxation. </React.Fragment>} placement="right" arrow><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                        </svg></Tooltip></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}>0</td>
                                    <td>{numFor.format(((ipoDetails?.ipo_price - vestingdetails?.fmp) * vestingdetails?.num) * 0.1)}</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format(((ipoDetails?.ipo_price - vestingdetails?.strike_price) * vestingdetails?.num) * 0.3)}</td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Net returns discounted to present value <Tooltip title="Time value of money is the most important aspect of investing. Money in the future has an opportunity cost, which we have pegged at 16% in our calculations (avg. return on a large cap index fund) to help you compare whether its worth the wait or you are better off liquidating your holdings earlier." placement="right" arrow><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg></Tooltip></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format((exitPrice * vestingdetails?.num)-(totalexercisecost)-0)} </td>
                                    <td>{numFor.format((ipoDetails?.ipo_price * vestingdetails?.num)-(totalexercisecost)-(((ipoDetails?.ipo_price - vestingdetails?.fmp) * vestingdetails?.num) * 0.1))} </td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{numFor.format((ipoDetails?.ipo_price * vestingdetails?.num)-(vestingdetails?.strike_price * vestingdetails?.num)-(((ipoDetails?.ipo_price - vestingdetails?.strike_price) * vestingdetails?.num) * 0.3))} </td>
                                </tr>
                                <tr className=''>
                                    <td style={{ border: "0px" }}></td>
                                    <td> </td>
                                    <td> </td>
                                    <td > </td>
                                </tr>
                                <tr style={{ fontSize: "15px" }} className=''>
                                    <td style={{ border: "0px" }}></td>
                                    <td> <NavLink style={{ textDecoration: "none" }} to="/marketplace" ><Button name="go to marketplace" /></NavLink></td>
                                    <td> </td>
                                    <td > </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table1