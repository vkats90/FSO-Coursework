import { useState, forwardRef, useImperativeHandle } from "react";

const Toggable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <>
      <div style={{ display: visible ? "" : "none" }}>
        <button onClick={toggleVisibility}>{props.text}</button>
      </div>
      <div style={{ display: !visible ? "" : "none" }}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  );
});

export default Toggable;
