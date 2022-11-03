import React, { useState } from "react";
import "./userpage.css";
import * as api from "../../axios"
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Loading from "../../Components/Loading/Loading";

const UpdateDocument = () => {
    const curruser = localStorage.getItem("user");
    if (curruser === null) {
        setTimeout(() => {
            navigate("/signin");
        }, 500)
    }
    const [isActive, setIsActive] = useState(false);
    const handleClick = (event) => {
        setIsActive((current) => !current);
    };
    const defaultClick = (e) => {
        setIsActive(false);
    };
    const params = useParams();
    const navigate = useNavigate();
    const [uploaded, setUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [doc, setDoc] = useState(null);
    const [doe, setDoe] = useState(null);
    const [price,setPrice]=useState();
    const handleFileInput = (e) => {
        // setUploaded(false);
        setDoc({
            selectedFile: e.target.files[0],
            loaded: 0,
        });
        setUploaded(true);
    };
    const updateDoc = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("file", doc.selectedFile);
        formData.append("c_name", params.cname);
        formData.append("date", params.date);
        formData.append("uid", params.uid)
        let res = await api.updateDoc(formData)
        // console.log(res.data.message);

        navigate(`/users/user/${params.uid}`);
        setLoading(false);
    };
    const updateDoe = async (e) => {
        e.preventDefault();
        if(!doe){
            alert("enter date of exercise")
            return;
        }
        setLoading2(true);
        let res = await api.updateDoe({doe: doe,c_name: params.cname,date:params.date,u_id:params.uid})

        navigate(`/users/user/${params.uid}`);
        setLoading2(false);
    };
    const updatePrice=async(e)=>{
        e.preventDefault()
        if(!price){
            alert("enter price");
            return;
        }
        setLoading3(true);
        let res = await api.updatePrice({new_price: price,date:params.date,u_id:params.uid,type:params.type})

        navigate(`/users/user/${params.uid}`);
        setLoading3(false);
    }
    return (
        <>
            {curruser ?
                <div className="container">
                    <h1 className="mb-5 mt-3 head-user-page-css">
                        update details for share: {params.cname} <p><NavLink to={`/users/user/${params.uid}`} style={{ textDecoration: 'none' }} ><h5 style={{ color: '#000' }}><i class="bi bi-x-circle-fill"></i> cancel</h5></NavLink></p>
                    </h1>
                    <hr />
                    <div className="row">
                        <div>
                            <h3 className="mb-5 mt-3 head-user-page-css">
                                update document
                            </h3>
                            <div className="container">
                                <div className="row">
                                    <div className="col"></div>
                                    <div className="col-2">
                                        {loading ? <Loading /> : <>{!uploaded ? <><label for="file-doc" style={{ cursor: "pointer" }} className="cell-mid cell">
                                            <input
                                                type="file"
                                                onChange={handleFileInput}
                                                id="file-doc"
                                                className="input-update-doc"
                                                name="file"
                                                accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                required
                                            />
                                            upload doc<i class="bi bi-pen"></i>
                                        </label></> : <button onClick={(e) => { updateDoc(e) }} className="cell-mid cell remove-btn-default">update doc<i class="bi bi-save"></i></button>
                                        }</>}
                                    </div>
                                    <div className="col"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <h3 className="mb-5 mt-3 head-user-page-css">
                        update price
                    </h3>
                    <div className="row mt-5 mb-3">

                        <div className="col-4"></div>
                        <div className="col-2">
                            <input type="number" id="price" className="" onChange={(e)=>{setPrice(e.target.value);}} required/>
                        </div>
                        <div className="col-2">
                            {loading3?<Loading/>:<button
                                onClick={updatePrice}
                                className={isActive ? "butt butt-ac" : "butt"}
                            >
                                update price
                            </button>}
                        </div>
                        <div className="col-4"></div>
                    </div>
                    <hr/>
                    <h3 className="mb-5 mt-3 head-user-page-css">
                        update doe
                    </h3>
                    <div className="row mt-5 mb-3">

                        <div className="col-4"></div>
                        <div className="col-2">
                            <input type="date" id="doe" className="" onChange={(e)=>{setDoe(e.target.value);}} required/>
                        </div>
                        <div className="col-2">
                            {loading2?<Loading/>:<button
                                onPointerLeave={defaultClick}
                                onPointerDown={handleClick}
                                onPointerUp={handleClick}
                                onClick={updateDoe}
                                className={isActive ? "butt butt-ac" : "butt"}
                            >
                                update doe
                            </button>}
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
                : <></>}

        </>

    )
}

export default UpdateDocument