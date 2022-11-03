import React, { useState } from "react";
import signuppic from "../../assets/helloworld.gif"
import "./auth.css";
import { useNavigate } from "react-router";
import * as api from "../../axios";
import { NavLink } from "react-router-dom";
import Loading from "../Loading/Loading";

const Signin = () => {
    const curruser = localStorage.getItem("user");
    const navigate = useNavigate();
    if (curruser !== null) {
        setTimeout(() => {
            navigate("/");
        }, 500)
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [user, setUser] = useState(false);
    const [notAdmin, setNotAdmin] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorwep, setErrorwep] = useState(false); //wrong email password
    const [errorune, setErrorune] = useState(false); //user not exists
    const handleClick = (e) => {
        e.preventDefault();
        setIsActive((current) => !current);
    };
    const defaultClick = (e) => {
        e.preventDefault();
        setIsActive(false);
    };

    const signinfun = async (e) => {
        setLoading(true);
        e.preventDefault();
        // if (email != "bhanu@zionn.trade") {
        //     setError(true);
        //     setNotAdmin(true)
        //     setLoading(false);
        //     setTimeout(() => {
        //         setError(false)
        //         setNotAdmin(false)
        //     }, 3000);
        //     return;
        // } 
        let res = await api.userSignIn({ email, password });
        console.log(res);
        if (res.data.message === "User logged up") {
            localStorage.setItem(
                "user",
                JSON.stringify({ email: email, token: res.data.token })
            );
            let res2 = await api.isAuth({ email });
            if (res2.data.message == "Unauthorized") {
                setError(true);
                setNotAdmin(true);
                setLoading(false);
                localStorage.removeItem("user");
                setTimeout(() => {
                    setNotAdmin(false);
                    setError(false);
                }, 3000);
                return;
            }
            console.log(res2);
            // setTimeout(() => {
            //     navigate("/");
            // }, 500);
            setLoading(false);
        } else {
            console.log(res.data.message);
            if (res.data.message === "user doesn't exist") {
                setError(true);
                setErrorune(true);
                setLoading(false);
                setTimeout(() => {
                    setError(false);
                    setErrorwep(false);
                }, 3000);
            }
            else if (res.data.message === "Wrong password or email") {
                setError(true);
                setErrorwep(true);
                setLoading(false);
                setTimeout(() => {
                    setError(false);
                    setErrorwep(false);
                }, 3000);
            }
        }
    };

    return (
        <>
            {curruser ? (<></>) : (<div>
                <div className="container ">
                    <div className="row">
                        <div className="col-md-6 order-2 order-lg-1">
                            <div className="con-image mt-5">
                                <img className="img-signup" src={signuppic} alt="signuppic" />
                            </div>
                        </div>
                        <div className="form-css-su col-md-6 order-1">
                            <div className="container form-si">
                                {error ? <>
                                    {errorune && (<div class="alert alert-warning" role="alert">
                                        user not exists
                                    </div>)}
                                    {errorwep && (<div class="alert alert-warning" role="alert">
                                        wrong email or password
                                    </div>)}
                                    {notAdmin && (<div class="alert alert-danger" role="alert">
                                        you are not authorised to access <strong>admin.zionn.trade</strong>
                                    </div>)}
                                </> : <></>}
                                <form id="form1" onSubmit={signinfun}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col"></div>
                                            <div className="col-8">

                                                <div className="inp-css">
                                                    <input
                                                        onChange={(e) => {
                                                            setError(false);
                                                            setErrorune(false);
                                                            setErrorwep(false);
                                                            setEmail(e.target.value);
                                                        }}
                                                        type="email"
                                                        className="butto-2 input-form"
                                                        placeholder="email"
                                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                        title="Please enter valid email"
                                                        required
                                                    />
                                                </div>
                                                <div className="inp-css mt-4">
                                                    <input
                                                        onChange={(e) => {
                                                            setPassword(e.target.value);
                                                        }}
                                                        type="password"
                                                        className="butto-2 input-form"
                                                        placeholder="password"
                                                        pattern=".{6,}"
                                                        title="Password should contain six or more characters"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col d-flex justify-content-center">
                                                <div className="sign-btn">
                                                    {loading ? <><Loading /></> : <><button
                                                        form="form1"
                                                        type="submit"
                                                        onPointerLeave={defaultClick}
                                                        onPointerDown={handleClick}
                                                        onPointerUp={handleClick}
                                                        className={isActive ? "btn-2-suu btn-2-suu-pressed" : "btn-2-suu"}
                                                        onSubmit={signinfun}
                                                    >
                                                        sign in
                                                    </button></>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <p className="txt-2">not an admin? <a style={{ textDecoration: "none" }} className="pur-nav-css" href="https://beta.zionn.trade">visit zionn</a> </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </>
    );
};

export default Signin;
