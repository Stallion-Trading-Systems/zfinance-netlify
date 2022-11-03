import React from "react";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NavLink } from "react-router-dom";
import * as api from "../../axios"

const RowUserPage = (props) => {
  // console.log(props);
  var date = new Date(parseInt(props.e));
  var dateToStr = date.toUTCString().split(' ');
  var cleanDate = dateToStr[1] + ' ' + dateToStr[2] + ' ' + dateToStr[3] + ' ' + dateToStr[0] + ' ' + dateToStr[4];
  var type="sell";
  if(props?.buy)type="buy";
  return (
    <div>
      <div className="row mt-2 gr-4">
        <div className="col-4">
          <div className="row">
            <div className="col-5 ">
              <div className="cell-wide cell"><a style={{ textDecoration: 'none ', color: '#7b61ff' }} target="___blank" href={`https://beta.zionn.trade/company/${props.a}`}>{props.a || <Skeleton width={80} height={15} />}{props.a ? (<i className="bi bi-arrow-up-right" />) : (<></>)}</a></div>
            </div>
            <div className="col-4 ">
              <div className="cell-mid cell">{props.b || <Skeleton width={80} height={15} />}</div>
            </div>
            <div className="col-3 ">
              <div className="cell-mid cell">{props.sell || props.buy || <Skeleton width={80} height={15} />}</div>
            </div>
          </div>
        </div>
        <div className="col-1">
          <div className="cell-mid cell">{props.d || <Skeleton width={80} height={15} />}</div>
        </div>
        <div className="col-3 ">
          <div className="cell-mid cell">{props.e ? cleanDate : <Skeleton width={80} height={15} />}</div>
        </div>
        <div className="col-2 ">
          <div className="cell-mid cell">{props.g ? props.g : <Skeleton width={80} height={15} />}</div>
        </div>
        <div className="col-2">
          <div className="row">
            <div className="col-8"><div className="cell-mid cell">{props.c ? <><a style={{ textDecoration: 'none ', color: '#7b61ff' }} target="___blank" href={props.c}>view <i className="bi bi-arrow-up-right" /></a></> : <Skeleton width={80} height={15} />}</div></div>
            <div className="col-4"><NavLink className="cell-mid cell" to={`/users/user/updatedoc/${props.f}/${props.e}/${props.a}/${type}`}><i className="bi bi-pen-fill" /></NavLink></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RowUserPage;
