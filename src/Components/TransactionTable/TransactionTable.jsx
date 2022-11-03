import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../Button/Button'
import "./transactiontable.css"


const TransactionTable = (props) => {
  return (
    <div className="container mt-5">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">

            <div className="container">
              <div className="row">
                <div className="heading-cp-css">{props.heading1}</div>
                <div className="">
                  <div className="mb-5 mt-5 d-flex justify-content-center">
                  <NavLink style={{ textDecoration: 'none' }} to="/transaction"><Button name="add transaction" /></NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
  )
}

export default TransactionTable