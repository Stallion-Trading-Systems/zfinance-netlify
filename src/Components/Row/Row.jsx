import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NavLink } from "react-router-dom";

const Row = (props) => {
  return (
    <div>
      <div className="row mt-2 gr-4">
        <div className="col-4 ">
          <div className="cell-wide cell"><NavLink style={{ textDecoration: 'none ', color:'#7b61ff' }} target="__blank" to={`/users/user/${props.c}`}>{props.a || <Skeleton width={80} height={15} />}{props.a?(<i className="bi bi-arrow-up-right"/>):(<></>)}</NavLink></div>
        </div>
        <div className="col-5 ">
          <div className="cell-mid cell">{props.b || <Skeleton width={80} height={15} />}</div>
        </div>
        {/* <div className="col-4">
          <div className="cell-mid cell">{props.c || <Skeleton width={80} height={15} />}</div>
        </div> */}
        {/* <div className="col-2">
          <div className="cell-mid cell">{props.d?<><a style={{ textDecoration: 'none ', color:'#7b61ff' }} target="__blank" href={props.d}>view <i className="bi bi-arrow-up-right"/></a></>:<Skeleton width={80} height={15} />}</div>
        </div> */}
      </div>

    </div>
  );
};

export default Row;
