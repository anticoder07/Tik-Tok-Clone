import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserGroup,
  faVideo,
  faCompass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./SideBar.module.scss";
import Button from "../../../components/Button";
import AccountItem from "../AccountItem";
import MenuItem from "./Menu/MenuItem";
import Menu from "./Menu/Menu";
import PopperMenu from "../../../components/Popper/Menu";
import * as sideBarService from "../../../services/sideBarService";

const cx = classNames.bind(styles);

function SideBar() {
  const [accountAccess, setAccountAccess] = useState([]);
  const [visibleAccounts, setVisibleAccounts] = useState(2);

  let currentUser = true;

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     try {
  //       const res = await request.get("users/search", {
  //         params: {
  //           q: "n",
  //           type: "less",
  //         },
  //       });

  //       setAccountAccess(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchApi();
  // }, []);

  // useEffect(() => {
  //   request
  //     .get("users/search", {
  //       params: {
  //         q: "n",
  //         type: "less",
  //       },
  //     })
  //     .then(function (res) {
  //       setAccountAccess(res.data);
  //     });
  // }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await sideBarService.sidebar("n");
      setAccountAccess(result);
    };

    fetchApi();
  }, []);

  // useEffect(() => {
  //   fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=n&type=less`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setAccountAccess(res.data.data);
  //     });
  // }, []);

  const sideItems = [
    {
      icon: <FontAwesomeIcon icon={faHouse} />,
      title: "For You",
      toNav: "/en",
      active: "red-button",
    },
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "Following",
      toNav: "/following",
      active: "red-button",
    },
    {
      icon: <FontAwesomeIcon icon={faUserGroup} />,
      title: "Friends",
      toNav: "/friends",
      active: "red-button",
    },
    {
      icon: <FontAwesomeIcon icon={faCompass} />,
      title: "Explore",
      toNav: "/explore",
      active: "red-button",
    },
    {
      icon: <FontAwesomeIcon icon={faVideo} />,
      title: "LIVE",
      toNav: "/live",
      active: "red-button",
    },
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "Profile",
      toNav: "/profile",
      active: "red-button",
    },
  ];

  const renderSideItems = () => {
    return sideItems.map((item, index) => (
      <div className={cx("sidebar-item")} key={index}>
        <MenuItem
          title={item.title}
          to={item.toNav}
          icon={item.icon}
          activeIcon={item.active}
        />
      </div>
    ));
  };

  const handleSeeMore = () => {
    setVisibleAccounts((prevVisibleAccounts) => prevVisibleAccounts + 3);
  };

  return (
    <aside className={cx("wrapper-sidebar")}>
      <Menu className={cx("wrapper-menu")}>{renderSideItems()}</Menu>
      {!currentUser ? (
        <div className={cx("wrapper-login-container")}>
          <p className={cx("login-hint")}>
            Log in to follow creators, like videos, and view comments
          </p>
          <Button outline large className={cx("login-button")}>
            Log in
          </Button>
        </div>
      ) : (
        <PopperMenu className={cx("wrapper-Following-container")}>
          <h2 className={cx("following-title")}>Following accounts</h2>
          <div className={cx("account-list")}>
            {accountAccess.slice(0, visibleAccounts).map((element, index) => (
              <AccountItem key={index} data={element} />
            ))}
          </div>
          {visibleAccounts < accountAccess.length && (
            <button className={cx("seeMore-btn")} onClick={handleSeeMore}>
              See more
            </button>
          )}
        </PopperMenu>
      )}
    </aside>
  );
}

export default SideBar;
