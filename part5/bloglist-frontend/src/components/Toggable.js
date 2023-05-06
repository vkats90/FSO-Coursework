import { useState } from "react";

const Toggable = (props) => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <div style={{ display: visible ? "" : "none" }}>
        <button onClick={() => setVisible(!visible)}>{props.text}</button>
      </div>
      <div style={{ display: !visible ? "" : "none" }}>
        {props.children}
        <button onClick={() => setVisible(!visible)}>Cancel</button>
      </div>
    </>
  );
};

export default Toggable;
