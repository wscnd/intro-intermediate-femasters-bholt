import { ClipLoader } from "react-spinners";
import React from "react";

const Spinner = (props) => {
  return (
    <div style={style}>
      <ClipLoader
        size={props.size}
        color={props.color}
        loading={props.isFetching}
      />
    </div>
  );
};

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default Spinner;
