import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from "./Menu.module.scss";
import React from "react";

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, activeIcon }) {
  return (
    <NavLink
      className={(nav) => cx("menu-item", { active: nav.isActive })}
      to={to}
    >
      <span className={cx("icon")}>{icon}</span>
      <span className={cx("activeIcon", activeIcon)}>{icon}</span>
      <span className={cx("title")}>{title}</span>
    </NavLink>
  );
}

export default MenuItem;
