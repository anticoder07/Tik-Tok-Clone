import React from "react";

function Menu({ children, className }) {
  return <nav className={className}>{children}</nav>;
}

export default Menu;
