import React, { useState } from "react";
import "./button.css"

const Button = (props) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = (event) => {
    setIsActive((current) => !current);
  };
  const x = props.widthv;
  const back=props.back;
  const defaultClick = (e) => {
    setIsActive(false);
  };
  return (
    <div className="mar">
      <div>
        <button
          style={{ width: x }}
          onPointerLeave={defaultClick}
          onPointerDown={handleClick}
          onPointerUp={handleClick}
          className={isActive ? "butt butt-ac" : "butt"}
        >
          {back&&<i class="bi bi-arrow-up-left"></i>}
          {props.name}
          {!back&&<i class="bi bi-arrow-up-right"></i>}
        </button>
      </div>
    </div>
  );
};

export default Button;
