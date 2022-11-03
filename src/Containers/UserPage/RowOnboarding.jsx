import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NavLink } from "react-router-dom";

const RowOnboarding = (props) => {
    return (
        <div>
            <div className="row mt-2 gr-4">
                <div className="col-4 ">
                    <div style={{ color: '#fff' }} className="cell-wide cell purple-b"><strong>{props.a || <Skeleton width={80} height={15} />}</strong></div>
                </div>
                <div className="col-6 ">
                    <div className="cell-mid cell">{props.b || <Skeleton width={80} height={15} />}</div>
                </div>
            </div>

        </div>
    );
};

export default RowOnboarding;
