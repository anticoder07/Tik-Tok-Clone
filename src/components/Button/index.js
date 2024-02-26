import React, { useContext, useState } from "react";
import classNames from "classnames/bind";
import "tippy.js/dist/tippy.css";

import styles from "./Button.module.scss";
import ToggleSwitch from "./ToggleSwitch";

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  toNav,
  noLink,
  circle = false,
  whiteBasic = false,
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  disabled = false,
  noClick = false,
  small = false,
  large = false,
  hoverDefault = false,
  activeClassName = "red-button",
  acctionCss,
  children,
  className,
  leftIcon,
  rightIcon,
  leftComp,
  rightComp,
  onClick,
  ...passProps
}) {
  const [check, setCheck] = useState(false);

  const handlerClick = () => {
    setCheck(!check);
    onClick();
  };

  let Component = "button";
  const props = {
    onclick,
    ...passProps,
  };

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  if (to) {
    props["to"] = to;
    Component = "Link";
  } else if (href) {
    props["href"] = href;
    Component = "a";
  } else if (noLink === true) {
    Component = "div";
  }

  const classes = cx("wrapper", {
    [className]: className,
    circle,
    hoverDefault,
    whiteBasic,
    primary,
    outline,
    text,
    disabled,
    rounded,
    small,
    large,
    [acctionCss]: check,
  });

  return (
    <Component
      className={classes}
      {...props}
      activeClassName={activeClassName}
      onClick={handlerClick}
    >
      {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
      {leftComp && <span className={cx("Comp")}>{leftComp}</span>}
      <span className={cx("title")}>{children}</span>
      {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
      {rightComp && (
        <span className={cx("Comp")}>
          <ToggleSwitch check={check} />
        </span>
      )}
    </Component>
  );
}

export default Button;
