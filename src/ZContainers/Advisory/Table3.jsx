import React, { useEffect } from 'react'
import Button from '../../Components/Button/Button.jsx'
import * as api from "../../axios.js"
import { useState } from 'react'

const Table3 = (props) => {
    let vestingdetails=props.vestingdetails
    let date=new Date().toDateString().substring(4)
    const [exitPrice,setExitPrice]=useState(vestingdetails?.fmp)
    let c_name=vestingdetails?.c_name
    useEffect(() => {
        async function checkBid(){
            let res=await api.checkbid({c_name:c_name})
            if(res?.data.message!="No price found"){
                setExitPrice(res.data.message?.buy_price)
            }
            // console.log(res);
        }
        
        async function getFmp(){
            let res2=await api.checkCname({ c_name: c_name }) 
            if (res2.data.message != "No"){ 
                let res22 = await api.getcData({ c_name: c_name })
                setExitPrice(res22.data.obj[res22.data.obj?.length-1]?.price)
                console.log(res22);
            }


        }
        getFmp()
        checkBid()
    }, [c_name])
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <table class="table table-borderless">
                            <thead>
                                <tr >
                                    <th style={{ border: "0px" }} scope='col'>Plans</th>
                                    <th style={{ backgroundColor: "#fbf7ec" }} scope="col">Exercise at exit</th>
                                    <th scope="col">Secondary sale</th>
                                    <th style={{ backgroundColor: "#fbf7ec" }} scope="col">Exercise & hold</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}>Rationale</td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}>Given no need for liquidity and long term stay at the firm, it is best for you to hold onto your options and exit at IPO or buyback.</td>
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
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}></td>
                                    <td></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}></td>
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
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.strike_price * vestingdetails?.num}</td>
                                    <td>{vestingdetails?.strike_price * vestingdetails?.num}</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.strike_price * vestingdetails?.num}</td>
                                </tr>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                    <td><hr /></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Taxes  <i class="bi bi-info-circle"></i></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{Math.ceil((vestingdetails?.fmp - vestingdetails?.strike_price * vestingdetails?.num) * 0.3)}</td>
                                    <td>{Math.ceil((vestingdetails?.fmp - vestingdetails?.strike_price * vestingdetails?.num) * 0.3)}</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{Math.ceil((vestingdetails?.fmp - vestingdetails?.strike_price * vestingdetails?.num) * 0.3)}</td>
                                </tr>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                    <td><hr /></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Total exercise costs <i class="bi bi-info-circle"></i></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.strike_price * vestingdetails?.num + Math.ceil((vestingdetails?.fmp - vestingdetails?.strike_price * vestingdetails?.num) * 0.3)}</td>
                                    <td>{vestingdetails?.strike_price * vestingdetails?.num + Math.ceil((vestingdetails?.fmp - vestingdetails?.strike_price * vestingdetails?.num) * 0.3)}</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.strike_price * vestingdetails?.num + Math.ceil((vestingdetails?.fmp - vestingdetails?.strike_price * vestingdetails?.num) * 0.3)}</td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Your returns</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                    <td> </td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}> </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Exit Price</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{exitPrice} </td>
                                    <td>{exitPrice}  </td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{exitPrice}  </td>
                                </tr>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                    <td><hr /></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Exercise Cost</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.strike_price * vestingdetails?.num + Math.ceil((vestingdetails?.fmp - vestingdetails?.strike_price * vestingdetails?.num) * 0.3)} </td>
                                    <td>{vestingdetails?.strike_price * vestingdetails?.num + Math.ceil((vestingdetails?.fmp - vestingdetails?.strike_price * vestingdetails?.num) * 0.3)} </td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{vestingdetails?.strike_price * vestingdetails?.num + Math.ceil((vestingdetails?.fmp - vestingdetails?.strike_price * vestingdetails?.num) * 0.3)} </td>
                                </tr>
                                <tr className='no-tbb' >
                                    <td style={{ border: "0px" }}></td>
                                    <td style={{ backgroundColor: "#fbf7ec", borderTop: "none", borderBottom: "none" }}><hr /></td>
                                    <td><hr /></td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td style={{ border: "0px" }}>Net returns discounted to present value</td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{exitPrice-(vestingdetails?.strike_price * vestingdetails?.num + Math.ceil((vestingdetails?.fmp - vestingdetails?.strike_price * vestingdetails?.num) * 0.3))} </td>
                                    <td>{exitPrice-(vestingdetails?.strike_price * vestingdetails?.num + Math.ceil((vestingdetails?.fmp - vestingdetails?.strike_price * vestingdetails?.num) * 0.3))} </td>
                                    <td style={{ backgroundColor: "#fbf7ec" }}>{exitPrice-(vestingdetails?.strike_price * vestingdetails?.num + Math.ceil((vestingdetails?.fmp - vestingdetails?.strike_price * vestingdetails?.num) * 0.3))} </td>
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
    )
}

export default Table3