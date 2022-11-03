import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as api from "../../axios"
import InventoryRow from "../../Components/Row/InventoryRow";
import { NavLink } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const Inventory = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userobj = JSON.parse(localStorage.getItem('user'));
  if (user === null) {
    setTimeout(() => {
      navigate("/signin");
    }, 1000)
  }
  const [inventorydetails, setInventoryDetails] = useState([])
  const [sloading,setSloading]=useState(false);

  useEffect(() => {

    async function f() {
      let res = await api.inventoryTableData()
      setSloading(true);
      // console.log(res);
      setInventoryDetails(res.data.message);

      // console.log(res.data.message);
    }

    f()
  }, []);
  const filterusers = async (e) => {
    e.preventDefault();
    let res = await api.inventoryTableData()
    let arr = res?.data.message.filter((content) => {
      return content.c_name.toLowerCase().includes((e.target.value).toLowerCase());
    });
    setInventoryDetails(arr);
  }
  return (

    <>
      {user && <div className='container'>
        <div className='row back-btn'>
          <strong ><NavLink style={{ textDecoration: 'none' }} to="/"><i class="bi bi-arrow-return-left"></i>back</NavLink></strong>
        </div>
        <div className='row mt-3'>
          <div className="heading-cp-css head-font">inventory</div>
          <div className="container-sm  main-con">
            <div className="row">
              <div className="col">
                <input type="text" onChange={(e) => { filterusers(e); }} className='butto mar-left mb-4' placeholder="search inventory" />
              </div>
              <div className="col-3"></div>
            </div>
            <div className="row g-4">
              <div className="col-2">
                <div className="cell-wide cell purple-b">
                  <strong>company</strong>
                </div>
              </div>
              <div className="col-3">
                <div className="cell-mid cell purple-b">
                  <strong># of securities</strong>
                </div>
              </div>
              <div className="col-2">
                <div className="cell-mid cell purple-b">
                  <strong>order type</strong>
                </div>
              </div>
              <div className="col-3">
                <div className="cell-wide cell purple-b">
                  <strong>#of unique users</strong>
                </div>
              </div>
            </div>
            {sloading?<>{inventorydetails.map((detail) => {
              return (
                <div>
                  <InventoryRow
                    a={detail?.c_name}
                    b={detail?.no_of_shares}
                    c={detail?.trans_type}
                    d={detail?.count}
                  />
                </div>
              )

            })}
          </>:<>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>
            <Skeleton width="80%"/>


            </>}
            </div>
        </div>
      </div>}
    </>

  )
}

export default Inventory
