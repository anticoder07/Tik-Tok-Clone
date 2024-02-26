import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import Button from "../../Button";
import React from "react";

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
  const classes = cx(
    "menu-item",
    {
      separate: data.separate,
    },
    { color: data.isActive ? "greenyellow" : "white" }
  );

  return (
    <Button
      className={classes}
      leftIcon={data.icon}
      to={data.to}
      toNav={data.toNav}
      onClick={onClick}
      activeClassName={data.active}
      rightComp={data.rightComp}
      hoverDefault
      style={{ padding: "10px" }}
    >
      {data.title}
    </Button>
  );
}

export default MenuItem;
