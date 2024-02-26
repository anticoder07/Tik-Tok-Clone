import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ToggleSwitch.module.scss";

const cx = classNames.bind(styles);

function ToggleSwitch({ check }) {
  const [className, setClassName] = useState("");

  useEffect(() => {
    setClassName(check ? "checkClick" : "");
  }, [check]);

  return (
    <div className={cx("toggle-switch")}>
      <label className={cx(className)}>
        <input type="checkbox" />
        <span className={cx("slider")}></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
