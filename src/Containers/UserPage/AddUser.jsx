import React, { useEffect, useState } from "react";
import "./userpage.css";
import * as api from "../../axios"
import { NavLink } from "react-router-dom";
import RowUserPage from "./RowUserPage.jsx"
import RowOnboarding from "./RowOnboarding.jsx"
import { useNavigate } from "react-router";


const AddUser = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userobj = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
        setTimeout(() => {
            navigate("/signin");
        }, 1000)
    }
    const [newname, setNewname] = useState();
    const [newphone, setNewphone] = useState();
    const [newemail, setNewemail] = useState();
    const [newcompany, setNewcompany] = useState();
    const [newtenure, setNewtenure] = useState();
    const [newdesignation, setNewdesignation] = useState();

    const [errornew, seterrornew] = useState(false);
    const [adding, setAdding] = useState(false);
    const saveNewUser = async (e) => {
        e.preventDefault();
        if (!newname || !newcompany || !newdesignation || !newphone || !newtenure) {
            seterrornew(true);
            setTimeout(() => {
                seterrornew(false)
            }, 3000)
            return;
        }
        setAdding(true)
        let res = await api.addNewUser({ user_name: newname, email: newemail, phone: newphone, curr_employer: newcompany, designation: newdesignation, tenure: newtenure });
        console.log(res);
        if (res.data.message == "added") {
            navigate("/users");
            setAdding(false);
        }
        else {
            setAdding(false);
            alert(res.data.message);
        }
    }
    return (
        <>
            {user && (
                <>
                    <div className='container p-2'>
                        <form id="form1">
                            <h1 className="mb-5 mt-3 head-user-page-css">
                                Add Users <p><NavLink to="/users" style={{ textDecoration: 'none' }} ><h5 style={{ color: '#000' }}><i class="bi bi-x-circle-fill"></i> cancel</h5></NavLink></p>
                            </h1>
                            <div className="heading-cp-css head-font">onboarding</div>

                            <div className="container-sm  main-con mb-5">
                                {errornew && (<div className="row mb-2 mt-2">
                                    <div class="alert alert-warning" role="alert">
                                        fields can not be empty *
                                    </div>
                                </div>)}
                                {adding && (
                                    <div className="row mb-2 mt-2">
                                        <div class="alert alert-success" role="alert">
                                            adding new user
                                        </div>
                                    </div>
                                )}
                                <div className="row mt-2 gr-4">
                                    <div className="col-4 ">
                                        <div style={{ color: '#fff' }} className="cell-wide cell purple-b"><strong>name</strong></div>
                                    </div>
                                    <div className="col-6 ">
                                        <input type="text" placeholder="type NA if not available" onChange={(e) => { setNewname(e.target.value) }} className="cell-mid cell" required />
                                        {/* {userdetails[0]?.user_name}</div> */}
                                    </div>
                                </div>
                                <div className="row mt-2 gr-4">
                                    <div className="col-4 ">
                                        <div style={{ color: '#fff' }} className="cell-wide cell purple-b"><strong>email</strong></div>
                                    </div>
                                    <div className="col-6 ">
                                        <input type="text" placeholder="type NA if not available" onChange={(e) => { setNewemail(e.target.value) }} className="cell-mid cell" required />
                                        {/* {userdetails[0]?.user_name}</div> */}
                                    </div>
                                </div>
                                <div className="row mt-2 gr-4">
                                    <div className="col-4 ">
                                        <div style={{ color: '#fff' }} className="cell-wide cell purple-b"><strong>phone #</strong></div>
                                    </div>
                                    <div className="col-6 ">
                                        <input type="number" placeholder="type 00 if not available" onChange={(e) => { setNewphone(e.target.value) }} className="cell-mid cell" required />
                                        {/* {userdetails[0]?.user_name}</div> */}
                                    </div>
                                </div>
                                <div className="row mt-2 gr-4">
                                    <div className="col-4 ">
                                        <div style={{ color: '#fff' }} className="cell-wide cell purple-b"><strong>company</strong></div>
                                    </div>
                                    <div className="col-6 ">
                                        <input type="text" placeholder="type NA if not available" onChange={(e) => { setNewcompany(e.target.value) }} className="cell-mid cell" required />
                                        {/* {userdetails[0]?.user_name}</div> */}
                                    </div>
                                </div>
                                <div className="row mt-2 gr-4">
                                    <div className="col-4 ">
                                        <div style={{ color: '#fff' }} className="cell-wide cell purple-b"><strong>designation</strong></div>
                                    </div>
                                    <div className="col-6 ">
                                        <input type="text" placeholder="type NA if not available" onChange={(e) => { setNewdesignation(e.target.value) }} className="cell-mid cell" required />
                                        {/* {userdetails[0]?.user_name}</div> */}
                                    </div>
                                </div>
                                <div className="row mt-2 gr-4">
                                    <div className="col-4 ">
                                        <div style={{ color: '#fff' }} className="cell-wide cell purple-b"><strong>tenure</strong></div>
                                    </div>
                                    <div className="col-6 ">
                                        <input type="number" placeholder="type 0 if not available" onChange={(e) => { setNewtenure(e.target.value) }} className="cell-mid cell" required />
                                        {/* {userdetails[0]?.user_name}</div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">

                                </div>
                                <div className="col">
                                    <button for="form1" className="remove-btn-default" onClick={saveNewUser}><h5 style={{ color: '#000' }}><i class="bi bi-person-plus-fill"></i> add</h5></button>
                                </div>
                                <div className="col">

                                </div>
                            </div>
                        </form>


                    </div>
                </>
            )}
        </>
    )
}

export default AddUser