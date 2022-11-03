import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Loading from '../../Components/Loading/Loading';
import locksellbuy from "../../assets/locksellbuy.svg"
import { useNavigate } from "react-router";
import * as api from "../../axios"



const AddInventory = () => {
    const curruser = localStorage.getItem("user");
    const navigate = useNavigate();
    if (curruser === null) {
        setTimeout(() => {
            navigate("/signin");
        }, 500)
    }
    const params = useParams();
    const [c_name, setCname] = useState("");
    const [no_of_shares, setNshares] = useState("");
    const [secu_type, setSecutype] = useState("");
    const [user, setUser] = useState(false);
    const [doc, setDoc] = useState(null);
    const [issub, setIssub] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsActive((current) => !current);
    };
    const defaultClick = (e) => {
        e.preventDefault();
        setIsActive(false);
    };
    const addUserInv = async (e) => {
        setLoading(true);
console.log("submit");
        const formData = new FormData();
        if (doc != null)
            formData.append("file", doc.selectedFile);
        else
            formData.append("file", doc);
        formData.append("c_name", c_name);
        formData.append("secu_type", secu_type);
        formData.append("email", params.email);
        formData.append("no_of_shares", no_of_shares);
        let res = await api.addUserInv(formData)
        console.log(res.data.message);
        setLoading(false);
        navigate(`/users/user/${params.uid}`);

    }

    const handleFileInput = (e) => {
        setDoc({
            selectedFile: e.target.files[0],
            loaded: 0,
        });
        setIssub(true);
    };

    const setStockunits = (e) => {
        setSecutype(e.target.value);
    };
    return (
        <>
            {curruser && (<div>
                <h3 className="mb-5 mt-3 head-user-page-css">
                    Add Inventory for User: {params.email} <p><NavLink to={`/users/user/${params.uid}`} style={{ textDecoration: 'none' }} ><h5 style={{ color: '#000' }}><i class="bi bi-x-circle-fill"></i> cancel</h5></NavLink></p>
                </h3>
                <div className="container mb-5">
                    <form
                        id="form1"
                        onSubmit={(e) => {
                            e.preventDefault();
                            addUserInv(e);
                        }}
                    >
                        <div className="row no-mar-sb">

                        </div>
                        <div className="container form-sellbuy-css">
                            <div className="row mt-4">
                                <div className="col">
                                    <div className="inp-css">
                                        <input
                                            onChange={(e) => {
                                                setCname(e.target.value);
                                            }}
                                            type="text"
                                            className="butto-2 input-form"
                                            placeholder="company name"
                                            required
                                        />
                                    </div>
                                    <div className="inp-css mt-4">
                                        <input
                                            onChange={(e) => {
                                                setNshares(e.target.value);
                                            }}
                                            type="number"
                                            className="butto-2 input-form"
                                            placeholder="# of securities"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <p>security type:</p>
                                    <div class="form-check">
                                        <input
                                            value="esop"
                                            checked={secu_type == "esop"}
                                            onChange={(e) => {
                                                setSecutype(e.target.value);
                                            }}
                                            class="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault1"
                                            required
                                        />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            ESOP's
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input
                                            value="stockunits"
                                            checked={secu_type == "stockunits"}
                                            onChange={setStockunits}
                                            class="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault2"
                                        />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            stock units
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <p>
                                        proof of ownership:
                                        <br /> i.e. grant letter, share certificate.
                                    </p>
                                    <div className="row">
                                        <div className="col"></div>
                                        <div className="col-5 mt-2">

                                            <label for="file-doc" className={issub ? "butto-2 file-label uploaded-file-css" : "butto-2 file-label"}>
                                                <input
                                                    type="file"
                                                    onChange={handleFileInput}
                                                    id="file-doc"
                                                    className="upload-form-sb"
                                                    placeholder="# of securities"
                                                    name="file"
                                                    accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                    
                                                />
                                                {issub ? <>uploaded  <i class="bi bi-check"></i></> : <>upload <i class="bi bi-arrow-up-right"></i></>}
                                            </label>
                                        </div>
                                        <div className="col"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-1"></div>
                            <div className="col-1 img-lock-css">
                                <img src={locksellbuy} alt="lock" />
                            </div>
                            <div className="col-10 txt-lock-css">
                                <p>
                                    Data is maintained under extremely strict non-disclosure rules and is only used to confirm your holdings and get the best price from investors.
                                </p>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <div className="sign-btn btn-cen-doc">
                                    {loading ? <><Loading /></> : (<button
                                        form="form1"
                                        type="submit"
                                        onPointerLeave={defaultClick}
                                        onPointerDown={handleClick}
                                        onPointerUp={handleClick}
                                        className={isActive ? "btn-2-suu btn-2-suu-pressed" : "btn-2-suu"}
                                        onSubmit={addUserInv}
                                    >
                                        add
                                    </button>)}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>)}
        </>
    )
}

export default AddInventory