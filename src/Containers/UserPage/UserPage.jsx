import React, { useEffect, useState } from "react";
import "./userpage.css";
import * as api from "../../axios"
import { NavLink, useParams } from "react-router-dom";
import RowUserPage from "./RowUserPage.jsx"
import RowOnboarding from "./RowOnboarding.jsx"
import { useNavigate } from "react-router";


const UserPage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userobj = JSON.parse(localStorage.getItem('user'));
  if (user === null) {
    setTimeout(() => {
      navigate("/signin");
    }, 1000)
  }
  const params = useParams();
  const [userdetails, setUserDetails] = useState([])
  const [editf, setEditF] = useState(false)
  const [newname, setNewname] = useState();
  const [newphone, setNewphone] = useState();
  const [newemail, setNewemail] = useState();
  const [newuid, setNewuid] = useState();
  const [newcompany, setNewcompany] = useState();
  const [newtenure, setNewtenure] = useState();
  const [newdesignation, setNewdesignation] = useState();

  useEffect(() => {

    async function f() {
      let res = await api.userPageDetails(userobj.email, params.uid);
      if (res.data.message == "Unauthorized") {
        navigate("/");
        return;
      }
      setUserDetails(res.data.result);
      console.log(res);
      setNewname(res.data.result[0].user_name);
      setNewcompany(res.data.result[0].c_name)
      setNewdesignation(res.data.result[0].designation)
      setNewphone(res.data.result[0].phone)
      setNewtenure(res.data.result[0].tenure)
      setNewemail(res.data.result[0].email)
      setNewuid(params.uid)
      console.log(res.data.result);
    }

    f()
  }, [editf]);
  const [errornew, seterrornew] = useState(false);
  const [donenew, setdonenew] = useState(false);
  const saveNewDetails = async (e) => {
    e.preventDefault();
    if (!newname || !newcompany || !newdesignation || !newphone || !newtenure) {
      seterrornew(true);
      setTimeout(() => {
        seterrornew(false)
      }, 3000)
      return;
    }
    let res = await api.updateUserData({ user_name: newname, email: newemail, u_id: newuid, phone: newphone, curr_employer: newcompany, designation: newdesignation, tenure: newtenure });
    console.log(res);
    if (res.data.message == "User updated") {
      setdonenew(true);
      setTimeout(() => {
        setdonenew(false)
      }, 3000)
    }
    else {
      alert(res.data.message)
    }
    setEditF(false);
  }
  return (
    <>
      {user && (
        <>
          {editf ? (<div className='container p-2'>
            <form id="form1">
              <h1 className="mb-5 mt-3 head-user-page-css">
                Edit Details <p><button for="form1" className="remove-btn-default" onClick={saveNewDetails}><h5 style={{ color: '#000' }}><i class="bi bi-save"></i>save</h5></button>&nbsp;<button className="remove-btn-default" onClick={() => { setEditF(false) }}><h5 style={{ color: '#000' }}><i class="bi bi-x-circle-fill"></i>cancel</h5></button></p>
              </h1>
              <div className="heading-cp-css head-font">onboarding</div>

              <div className="container-sm  main-con mb-5">
                {errornew && (<div className="row mb-2 mt-2">
                  <div class="alert alert-warning" role="alert">
                    fields can not be empty *
                  </div>
                </div>)}
                <div className="row mt-2 gr-4">
                  <div className="col-4 ">
                    <div style={{ color: '#fff' }} className="cell-wide cell purple-b"><strong>name</strong></div>
                  </div>
                  <div className="col-6 ">
                    <input type="text" defaultValue={newname} onChange={(e) => { setNewname(e.target.value) }} className="cell-mid cell" required />
                    {/* {userdetails[0]?.user_name}</div> */}
                  </div>
                </div>

                <RowOnboarding
                  a="email"
                  b={userdetails[0]?.email}
                />
                <div className="row mt-2 gr-4">
                  <div className="col-4 ">
                    <div style={{ color: '#fff' }} className="cell-wide cell purple-b"><strong>phone #</strong></div>
                  </div>
                  <div className="col-6 ">
                    <input type="number" defaultValue={newphone} onChange={(e) => { setNewphone(e.target.value) }} className="cell-mid cell" required />
                    {/* {userdetails[0]?.user_name}</div> */}
                  </div>
                </div>
                <RowOnboarding
                  a="unique id"
                  b={params.uid}
                />
                <div className="row mt-2 gr-4">
                  <div className="col-4 ">
                    <div style={{ color: '#fff' }} className="cell-wide cell purple-b"><strong>company</strong></div>
                  </div>
                  <div className="col-6 ">
                    <input type="text" defaultValue={newcompany} onChange={(e) => { setNewcompany(e.target.value) }} className="cell-mid cell" required />
                    {/* {userdetails[0]?.user_name}</div> */}
                  </div>
                </div>
                <div className="row mt-2 gr-4">
                  <div className="col-4 ">
                    <div style={{ color: '#fff' }} className="cell-wide cell purple-b"><strong>designation</strong></div>
                  </div>
                  <div className="col-6 ">
                    <input type="text" defaultValue={newdesignation} onChange={(e) => { setNewdesignation(e.target.value) }} className="cell-mid cell" required />
                    {/* {userdetails[0]?.user_name}</div> */}
                  </div>
                </div>
                <div className="row mt-2 gr-4">
                  <div className="col-4 ">
                    <div style={{ color: '#fff' }} className="cell-wide cell purple-b"><strong>tenure</strong></div>
                  </div>
                  <div className="col-6 ">
                    <input type="number" defaultValue={newtenure} onChange={(e) => { setNewtenure(e.target.value) }} className="cell-mid cell" required />
                    {/* {userdetails[0]?.user_name}</div> */}
                  </div>
                </div>
              </div>
            </form>


          </div>) : (<div className='container p-2'>
            <h1 className="mb-5 mt-3 head-user-page-css">
              User Details <p><NavLink onClick={() => { setEditF(true) }} to=""><h5 style={{ color: '#000' }}><i class="bi bi-pen-fill"></i>edit</h5></NavLink></p>
            </h1>
            <div className="heading-cp-css head-font">onboarding</div>

            <div className="container-sm  main-con mb-5">
              {donenew && <>
                <div className="row mb-2 mt-2">
                  <div class="alert alert-success" role="alert">
                    user details updated successfully!
                  </div>
                </div>
              </>}
              <RowOnboarding
                a="name"
                b={userdetails[0]?.user_name}
              />
              <RowOnboarding
                a="email"
                b={userdetails[0]?.email}
              />
              <RowOnboarding
                a="phone #"
                b={userdetails[0]?.phone}
              />
              <RowOnboarding
                a="unique id"
                b={params.uid}
              />
              <RowOnboarding
                a="company"
                b={userdetails[0]?.curr_employer}
              />
              <RowOnboarding
                a="designation"
                b={userdetails[0]?.designation}
              />
              <RowOnboarding
                a="tenure"
                b={userdetails[0]?.tenure}
              />
            </div>

            <div>
              <div className="heading-cp-css head-font">sell/buy</div>
              <h5>
                <NavLink style={{ textDecoration: 'none' }} target="_____blank" to={`/users/user/addinventory/${params.uid}/${userdetails[0]?.email}`}>add inventory<i class="bi bi-plus"></i></NavLink>
              </h5>
              <div className="container-sm  main-con p-3">
                <div className="row g-4">
                  <div className="col-4">
                    <div className="row">
                      <div className="col-5">
                        <div className="cell-wide cell purple-b">
                          <strong>company</strong>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="cell-mid cell purple-b">
                          <strong>inventory</strong>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="cell-mid cell purple-b">
                          <strong>price</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-1">
                    <div className="cell-mid cell purple-b">
                      <strong>type</strong>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="cell-mid cell purple-b">
                      <strong>date</strong>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="cell-mid cell purple-b">
                      <strong>date of exercise</strong>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="row">
                      <div className="col-8"><div className="cell-mid cell purple-b"><strong>ownership</strong></div></div>
                      <div className="col-4"><div className="cell-mid cell purple-b "><strong></strong></div></div>
                    </div>
                  </div>
                </div>
                {userdetails.map((detail) => {
                  return (
                    <div>
                      <RowUserPage
                        key={detail?.date}
                        a={detail?.c_name}
                        b={detail?.no_of_shares}
                        c={detail?.doc_url}
                        d={detail?.trans_type}
                        e={detail?.date}
                        f={params.uid}
                        g={detail?.doe}
                        buy={detail?.buy_price}
                        sell={detail?.sell_price}
                      />

                    </div>
                  )

                })}
              </div>
            </div>
          </div>)}
        </>
      )}
    </>
  )
}

export default UserPage