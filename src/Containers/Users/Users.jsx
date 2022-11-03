import React, { useEffect, useState } from "react";
import * as api from "../../axios"
import Row from "../../Components/Row/Row";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NavLink } from "react-router-dom";
import './users.css'
import { useNavigate } from "react-router";


const Users = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userobj = JSON.parse(localStorage.getItem('user'));
  if (user === null) {
    setTimeout(() => {
      navigate("/signin");
    }, 1000)
  }
  const [userdetails, setUserDetails] = useState([])
  const [sloading,setSloading]=useState(false);
  useEffect(() => {

    async function f() {
      let res = await api.userTableData()
      setSloading(true);
      setUserDetails(res.data.users);
      // console.log(res.data.users);
    }

    f()

  }, []);
  const filterusers=async(e)=>{
    e.preventDefault();
    let res = await api.userTableData()
    let arr = res?.data.users.filter((content) => {
      return content.user_name.toLowerCase().includes((e.target.value).toLowerCase());
    });
    setUserDetails(arr);
  }
  return (
    <div>
      {user && (<div className='container'>
        <div className='row back-btn'>
          <strong ><NavLink style={{ textDecoration: 'none' }} to="/"><i class="bi bi-arrow-return-left"></i>back</NavLink></strong>
        </div>
        <div className='row mt-3'>
          <div className="heading-cp-css head-font">users</div>
          <div className="container-sm  main-con">
            <div className="row">
              <div className="col">
                <input type="text" onChange={(e)=>{filterusers(e);}} className='butto mar-left mb-4' placeholder="search user" />
              </div>
              <div className="col-3"></div>
            </div>
            <h5 className="mb-4"><NavLink style={{ textDecoration: 'none' }} to="/users/addnewuser">add user<i class="bi bi-person-plus-fill"></i></NavLink></h5>
            <div className="row g-4">
              <div className="col-4">
                <div className="cell-wide cell purple-b">
                  <strong>customer</strong>
                </div>
              </div>
              <div className="col-5">
                <div className="cell-mid cell purple-b">
                  <strong>email</strong>
                </div>
              </div>
            </div>
            {sloading?<>
              {userdetails.map((detail) => {
              return (
                <div>
                  <Row
                    a={detail?.user_name}
                    b={detail?.email}
                    c={detail?.u_id}
                  />
                </div>
              )

            })}</>:<>
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

      </div>)}
    </div>
  )
}

export default Users