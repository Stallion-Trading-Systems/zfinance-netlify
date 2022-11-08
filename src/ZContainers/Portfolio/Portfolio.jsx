import React, { useEffect, useState } from 'react'
import PostfolioChart from '../../ZComponents/recharts/portfolioChart.jsx'
import * as api from "../../axios.js"
import { useNavigate } from 'react-router'

const Portfolio = () => {
  const [cdetails,setcDetails]=useState()
  const [chartdetails,setChartDetails]=useState()
  const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userobj = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
        setTimeout(() => {
            navigate("/auth");
        }, 1000)
    }
  useEffect(() => {
    async function f(){
      let res=await api.getcData({c_name:"swiggy"})
      setcDetails(res.data.obj)
    }
    f()
    async function chartdata(){
      let res=await api.getChartData({email:userobj?.email})
      // console.log(res.data.message);
      setChartDetails(res.data.message)
      
    }
    chartdata()
  }, [])
  return (
    <div>
        <div className="mt-5 p-5">
        {chartdetails&&<PostfolioChart data={cdetails} vd={chartdetails?.vesting_details} num={chartdetails?.num} vs={chartdetails?.vs} />}
        </div>
    </div>
  )
}

export default Portfolio