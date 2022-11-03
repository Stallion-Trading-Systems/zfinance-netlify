import React from 'react'
import { useState } from 'react'
import Button from '../../Components/Button/Button'
import "./transaction.css"
import * as api from "../../axios"
import Loading from "../../Components/Loading/Loading"

const Transaction = (props) => {
    const [issuerName, setIssuerName] = useState("");
    const [issuerDetails, setIssuerDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingTransaction, setLoadingTransaction] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState();
    const [selectedBuyer, setSelectedBuyer] = useState();
    const [selectedSellerDetails, setSelectedSellerDetails] = useState([]);
    const [selectedBuyerDetails, setSelectedBuyerDetails] = useState([]);
    const [noOfSecu, setNoOfSecu] = useState();
    const [pricePerShare, setPricePerShare] = useState();
    const [buyerCom, setBuyerCom] = useState([]);
    const [sellerCom, setSellerCom] = useState([]);
    const [done, setDone] = useState(false);
    const [errorNoOfSecu,setErrorNoOfSecu]=useState(false);
    const [errorPPS,setErrorPPS]=useState(false);
    const [errorNoOfSecuLimit,setErrorNoOfSecuLimit]=useState(false);
    const getIssuerDetails = async (e) => {
        setLoading(true);
        e.preventDefault();
        setIssuerName(e.target.value);
        let res = await api.getIssuerDetails({ c_name: e.target.value.trim() });
        setIssuerDetails(res.data.result);
        // console.log(res.data.result);
        setLoading(false);
    }
    const inititateTransactionFun = async (e) => {
        e.preventDefault();
        
        if(!noOfSecu||!pricePerShare){
            if(!noOfSecu){
                setErrorNoOfSecu(true);
            }
            if(!pricePerShare){
                setErrorPPS(true);
            }
            return;
        }
        var minshares=Math.min(selectedBuyerDetails.shares,selectedSellerDetails.shares);
        if(noOfSecu>minshares){
            setErrorNoOfSecuLimit(true);
            return;
        }
        setLoadingTransaction(true);
        let res = await api.initiateTransaction({ c_name: issuerName, s_id: selectedSellerDetails.uid, b_id: selectedBuyerDetails.uid, seller_name: selectedSellerDetails.name, buyer_name: selectedBuyerDetails.name, trans_price: pricePerShare, no_of_secu: noOfSecu, seller_commission: 5, buyer_commission: 5, seller_inv_time: selectedSeller, buyer_inv_time: selectedBuyer })
        setLoadingTransaction(false);
        if (res.data.message == "Transaction initiated") {
            setDone(true);
            setTimeout(() => {
                setSelectedBuyer();
                setSelectedBuyerDetails([]);
                setSelectedSeller();
                setSelectedSellerDetails([]);
                setNoOfSecu();
                setPricePerShare();
                setDone(false);
                
            }, 5000);
        }
        else {
            setSelectedBuyer();
            setSelectedBuyerDetails([]);
            setSelectedSeller();
            setSelectedSellerDetails([]);
            setNoOfSecu();
            setPricePerShare();
            alert("something went wrong")
        }
    }
    return (
        <div>
            <div className='container p-5'>
                <div className='row mb-3 d-flex justify-content-center align-items-center' >
                    <h3 className='pp-chirka head-transac-css'>Generate transaction</h3>
                </div>
                <div className='row'>
                    <div className="container">
                        <div className="row">
                            <div className="container-sm  main-con">
                                <div className="row mb-3 g-5">
                                    <div className="col-3">
                                        <div className="cell-wide cell purple-b">
                                            <strong>Issuer</strong>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="cell-mid cell purple-b">
                                            <strong># of securities</strong>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="cell-mid cell purple-b">
                                            <strong>Price per share</strong>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={getIssuerDetails} >
                                    <div className="row g-5">
                                        <div className="col-3">
                                            <input placeholder='issuer name' onChange={(e) => { getIssuerDetails(e); }} className="cell-wide cell " type="text" required />
                                        </div>
                                        <div className="col-3">
                                            <input placeholder='# of securities' value={noOfSecu} onChange={(e) => { setNoOfSecu(e.target.value);setErrorNoOfSecu(false);setErrorNoOfSecuLimit(false); }} className="cell-mid cell" type="number" />
                                            {errorNoOfSecu&&<p style={{color:"red"}} >*please enter # of securities</p>}
                                            {errorNoOfSecuLimit&&<p style={{color:"red"}} >*securities can't be more than seller and buyer shares</p>}
                                        </div>
                                        <div className="col-3">
                                            <input placeholder='price per share' value={pricePerShare} onChange={(e) => { setPricePerShare(e.target.value);setErrorPPS(false); }} className="cell-mid cell" type="number" />
                                            {errorPPS&&<p style={{color:"red"}} >*please enter price</p>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
                {loading && <Loading />}
                {(issuerDetails[0]) ? <div>
                    <div className='row mb-3 d-flex justify-content-center align-items-center' >
                        <h3 className='pp-chirka head-transac-css'>Finalize parties</h3>
                    </div>
                    {loadingTransaction&&<Loading/>}
                    {done&&!loadingTransaction ? <>
                        <div class="alert alert-success" role="alert">
                            transaction initiated between <strong>{selectedBuyerDetails.name}</strong> and <strong>{selectedSellerDetails.name}</strong> for issuer <strong>{issuerName}</strong>.
                        </div>
                    </> : <>
                        {(selectedBuyer || selectedSeller) ? <>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-3'></div>
                                    <div className='col-3'>
                                        {selectedBuyer && <p>selected buyer:<strong>{selectedBuyerDetails.name}</strong></p>}
                                        {selectedSeller && <p>selected seller:<strong>{selectedSellerDetails.name}</strong></p>}
                                    </div>
                                    <div className='col'>
                                        {(selectedBuyer && selectedSeller) ? <button onClick={(e) => { inititateTransactionFun(e) }} className='remove-btn-default'><Button name="initiate transaction" /></button> : <></>}
                                    </div>
                                </div>

                            </div>
                        </> : <></>}
                    </>}
                    <div className='row'>
                        <div className="container">
                            <div className="row">
                                <div className="container-sm  main-con">
                                    <div className="row mb-3 g-5">
                                        <div className="col-2">
                                            <div className="cell-wide cell purple-b">
                                                <strong>seller</strong>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="cell-mid cell purple-b">
                                                <strong>commission %</strong>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="cell-mid cell purple-b">
                                                <strong># of shares</strong>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="cell-mid cell purple-b">
                                                <strong>ask price</strong>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="cell-mid cell purple-b">
                                                <strong>activate dashboard</strong>
                                            </div>
                                        </div>
                                    </div>
                                    {issuerDetails.filter(detail => detail.trans_type.includes('sell')).map(detail => (
                                        <div className="row mb-3 g-5">
                                            <div className="col-2">
                                                <div className="cell-mid cell">
                                                    {detail.user_name}
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <input defaultValue={5} className="cell-mid cell" type="text" />

                                            </div>
                                            <div className="col-2">
                                                <div className="cell-mid cell">
                                                    {detail.no_of_shares}
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="cell-mid cell">
                                                    {detail.sell_price}
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className='container'>
                                                    <div className='row'>
                                                        <div className='col-1'></div>
                                                        <div className='col-10'>
                                                            <label className={selectedSeller == detail.date ? "butt-input-label-sellbuy-css-selected " : 'butt-input-label-sellbuy-css '} for={detail.date}>
                                                                <input style={{ display: "none" }} onChange={(e) => { setSelectedSeller(e.target.value); setSelectedSellerDetails({ name: detail.user_name, uid: detail.u_id, shares: detail.no_of_shares }) }} checked={selectedSeller == detail.date} type="radio" value={detail.date} id={detail.date} />

                                                                {selectedSeller == detail.date ? "selected" : "select seller"}
                                                            </label>
                                                        </div>
                                                        <div className='col-1'></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='row'>
                        <div className="container">
                            <div className="row">
                                <div className="container-sm  main-con">
                                    <div className="row mb-3 g-5">
                                        <div className="col-2">
                                            <div className="cell-wide cell purple-b">
                                                <strong>buyer</strong>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="cell-mid cell purple-b">
                                                <strong>commission %</strong>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="cell-mid cell purple-b">
                                                <strong># of shares</strong>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="cell-mid cell purple-b">
                                                <strong>bid price</strong>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="cell-mid cell purple-b">
                                                <strong>activate dashboard</strong>
                                            </div>
                                        </div>
                                    </div>
                                    {issuerDetails.filter(detail => detail.trans_type.includes('buy')).map(detail => (
                                        <div className="row mb-3 g-5">
                                            <div className="col-2">
                                                <div className="cell-mid cell">
                                                    {detail.user_name}
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <input defaultValue={5} className="cell-mid cell" type="text" />

                                            </div>
                                            <div className="col-2">
                                                <div className="cell-mid cell">
                                                    {detail.no_of_shares}
                                                </div>
                                            </div><div className="col-2">
                                                <div className="cell-mid cell">
                                                    {detail.buy_price}
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className='container'>
                                                    <div className='row'>
                                                        <div className='col-1'></div>
                                                        <div className='col-10'>
                                                            <label className={selectedBuyer == detail.date ? "butt-input-label-sellbuy-css-selected " : 'butt-input-label-sellbuy-css '} for={detail.date}>
                                                                <input style={{ display: "none" }} onChange={(e) => { setSelectedBuyer(e.target.value); setSelectedBuyerDetails({ name: detail.user_name, uid: detail.u_id, shares: detail.no_of_shares }) }} checked={selectedBuyer == detail.date} type="radio" value={detail.date} id={detail.date} />

                                                                {selectedBuyer == detail.date ? "selected" : "select buyer"}
                                                            </label>
                                                        </div>
                                                        <div className='col-1'></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>

                        </div>
                    </div>
                </div> :
                    <>
                        {issuerName && !loading && <div class="alert alert-danger" role="alert">
                            no results for <strong>{issuerName}</strong>
                        </div>}
                    </>
                }
                {/* {!issuerName && <><div class="alert alert-warning" role="alert">
                    enter issuer name
                </div></>} */}
            </div>

        </div>
    )
}

export default Transaction