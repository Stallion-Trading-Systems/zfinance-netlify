import React, { useEffect, useState } from "react";
import "./table.css";
import * as api from "../../axios"
import Row from "../Row/Row";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NavLink } from "react-router-dom";

const Tables = (props) => {


  const [userdetails, setUserDetails] = useState([])

  useEffect(() => {

    async function f() {
      let res = await api.userTableData()

      setUserDetails(res.data.users);

      // console.log(res.data.users);
    }

    f()
  }, []);
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">

            <div className="container">
              <div className="row">
                <div className="heading-cp-css">{props.heading1}</div>
                <div className="">
                  <div className="">
                    <div className="container-sm  main-con">
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
                      <Row
                        a={userdetails[0]?.user_name}
                        b={userdetails[0]?.email}
                        c={userdetails[0]?.u_id}
                      />
                      <Row
                        a={userdetails[1]?.user_name}
                        b={userdetails[1]?.email}
                        c={userdetails[1]?.u_id}
                      />
                      <Row
                        a={userdetails[2]?.user_name}
                        b={userdetails[2]?.email}
                        c={userdetails[2]?.u_id}
                      />
                      <Row
                        a={userdetails[3]?.user_name}
                        b={userdetails[3]?.email}
                        c={userdetails[3]?.u_id}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                  <NavLink style={{ textDecoration: 'none' }} to="/users">users<i class="bi bi-arrow-up-right"></i></NavLink>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Tables;