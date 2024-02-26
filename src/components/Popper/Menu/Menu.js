import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { Wrapper as PopperWraper } from "../index";
import MenuItem from "./MenuItem";
import React from "react";
import HeadlessTippy from "@tippyjs/react/headless";

const cx = classNames.bind(styles);

function Menu({
  items = [],
  sideBar = false,
  visible = false,
  arrow = false,
  placement,
  className,
  children,
}) {
  const renderItem = () => {
    return items.map((item, index) => (
      <MenuItem key={index} data={item} onClick={item.onClick} />
    ));
  };

  const renderResult = (attrs) => (
    <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
      <PopperWraper className={cx("wrapper-menu")}>
        {items.length > 0 && renderItem()}
      </PopperWraper>
    </div>
  );

  let Comp = HeadlessTippy;
  // @ts-ignore
  if (items.length === 0) Comp = "div";

  const classes = cx("wrapper-menu", {
    [className]: className,
    sideBar,
    visible,
  });

  return (
    <Comp
      interactive
      delay={[0, 600]}
      render={renderResult}
      className={classes}
      placement={placement}
      arrow={arrow}
    >
      <div>{children}</div>
    </Comp>
  );
}

export default Menu;
