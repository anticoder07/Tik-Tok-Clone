import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import images from "../../../assets/images";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEllipsisVertical,
  faPaperPlane,
  faLightbulb,
  faAddressBook,
  faCircleQuestion,
  faKeyboard,
  faMoon,
  faVideo,
  faGear,
  faArrowRightFromBracket,
  faBitcoinSign,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faMessage,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

import Button from "../../../components/Button";
import Menu from "../../../components/Popper/Menu";
import Image from "../../../components/Image";
import ToggleSwitch from "../../../components/Button/ToggleSwitch/index";
import styles from "./Header.module.scss";
import Search from "../Search";
import { ThemeContext } from "../Themes/DarkModeTheme";

const cx = classNames.bind(styles);

function Header() {
  const context = useContext(ThemeContext);
  const [isTippyOpen, setIsTippyOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState();
  const currentUser = false;

  const handlerClickDarkMode = () => {
    context.toggleTheme();
  };

  const MENU_ITEM_LIVE = {
    icon: <FontAwesomeIcon icon={faLightbulb} />,
    title: "LIVE creater Hub",
    to: "/live-creater",
  };

  const MENU_ITEMS = [
    {
      icon: <FontAwesomeIcon icon={faAddressBook} />,
      title: "English",
      to: "/english",
    },
    {
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
      title: "Feedback and help",
      to: "/feedback-help",
    },
    {
      icon: <FontAwesomeIcon icon={faKeyboard} />,
      title: "Keyboard shortcuts",
      to: "/shortcuts",
    },
    {
      icon: <FontAwesomeIcon icon={faMoon} />,
      title: "Dark mode",
      to: "/dark-mode",
      rightComp: <ToggleSwitch />,
      onClick: handlerClickDarkMode,
    },
  ];

  const USER_MENU = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View profile",
      to: "/test",
    },
    {
      icon: <FontAwesomeIcon icon={faBookmark} />,
      title: "Favorites",
      to: "/test",
    },
    {
      // icon: <img src={images.logoCoinTikTok} alt="Get Coin" />,
      icon: <FontAwesomeIcon icon={faBitcoinSign} />,
      title: "Get Coins",
      to: "/test",
    },
    {
      icon: <FontAwesomeIcon icon={faVideo} />,
      title: "LIVE Studio",
      to: "/test",
    },
    MENU_ITEM_LIVE,
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Settings",
      to: "/test",
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
      title: "Log out",
      to: "/test",
      separate: true,
    },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/headerAvatar")
      .then((res) => res.json())
      .then((res) => {
        setUserAvatar(res.data.avatar);
      });
  }, []);

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <a className={cx("logo-wrapper")} href="/">
          {context.theme !== "dark" ? (
            <img src={images.logo} alt="Tiktok" className={cx("logo")} />
          ) : (
            <img
              src={images.logoDarkMode}
              alt="Tiktok"
              className={cx("logo")}
            />
          )}
        </a>

        <Search />

        <div className={cx("action")}>
          <Button whiteBasic>
            <FontAwesomeIcon className={cx("plus-icon")} icon={faPlus} />
            <span className={cx("inner-upload")}>Upload</span>
          </Button>
          {currentUser ? (
            <>
              <Button primary>Log in</Button>
              <Menu
                items={[MENU_ITEM_LIVE, ...MENU_ITEMS]}
                visible={isTippyOpen}
              >
                <Button text onMouseEnter={() => setIsTippyOpen(true)} noClick>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </Button>
              </Menu>
            </>
          ) : (
            <>
              <Tippy content="Messages">
                <button className={cx("messages")}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </Tippy>
              <Tippy content="Inbox">
                <button className={cx("in-box")}>
                  <FontAwesomeIcon icon={faMessage} />
                </button>
              </Tippy>
              <Menu items={USER_MENU}>
                <Image
                  src={userAvatar}
                  alt="no image"
                  className={cx("use-avatar")}
                />
              </Menu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
