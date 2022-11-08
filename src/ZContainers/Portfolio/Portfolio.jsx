import React, { useEffect, useState } from 'react'
import PostfolioChart from '../../ZComponents/recharts/portfolioChart.jsx'
import * as api from "../../axios.js"

const Portfolio = () => {
  const [cdetails,setcDetails]=useState()
  useEffect(() => {
    async function f(){
      let res=await api.getcData({c_name:"swiggy"})
      setcDetails(res.data.obj)
    }
    f()
  }, [])
  return (
    <div>
        <div className="mt-5 p-5">
        <PostfolioChart data={cdetails} vd="480" num="150" vs="243" />
        </div>
    </div>
  )
}

export default Portfolio