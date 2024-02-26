import React from "react";
import classNames from "classnames/bind";
import Button from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCheckCircle,
  faCommentDots,
  faHeart,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

import Menu from "../../../components/Popper/Menu";
import icon from "../../../components/Icons";
import Image from "../../../components/Image";
import VideoTikTok from "../../../components/VideoTikTok";
import styles from "./ContentVideo.module.scss";

const cx = classNames.bind(styles);

function ContentVideo({ data }) {
  const BTN_ITEM = [
    {
      icon: <FontAwesomeIcon icon={faHeart} />,
      actionCSS: "red-heart",
      noLink: true,
      text: data.likes,
    },
    {
      icon: <FontAwesomeIcon icon={faCommentDots} />,
      to: "/english",
      text: data.comments,
    },
    {
      icon: <FontAwesomeIcon icon={faBookmark} />,
      actionCSS: "yellow-bookMark",
      noLink: true,
      text: data.markers,
    },
  ];

  const SHARE_MENU = [
    {
      icon: <Image src={icon.Embed} alt="Embed" />,
      title: "Embed",
      to: "/test",
    },
    {
      icon: <Image src={icon.Send} alt="Send" />,
      title: "Send to friends",
      to: "/test",
    },
    {
      icon: <Image src={icon.FaceBook} alt="Send" />,
      title: "Send to friends",
      to: "/test",
    },
    {
      icon: <Image src={icon.WhatsApp} alt="Send" />,
      title: "Share to WhatsApp",
      to: "/test",
    },
  ];

  const handlerFakeClick = () => {
    console.log("fake Click");
  };

  const renderItem = () => {
    return BTN_ITEM.map((item, index) => (
      <div className={cx("action-item-container")}>
        <Button
          key={index}
          noLink={item.noLink}
          to={item.to}
          acctionCss={item.actionCSS}
          onClick={handlerFakeClick}
          circle
        >
          {item.icon}
        </Button>
        <strong className={cx("action-text")}>{item.text}</strong>
      </div>
    ));
  };

  return (
    <div className={cx("container")}>
      <div className={cx("content-container")}>
        <img className={cx("avatar")} src={data.avatar} alt={data.name} />
        <div className={cx("info")}>
          <h4 className={cx("name")}>
            {data.name}
            {data.tick && (
              <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
            )}
          </h4>
          <span className={cx("desc")}>{data.description}</span>
          <div className={cx("videos-container")}>
            <VideoTikTok src={data.video} />
            <div className={cx("btn-interact")}>
              {renderItem()}
              <Menu items={SHARE_MENU} placement={"top-start"} arrow={true}>
                <div className={cx("action-item-container")}>
                  <Button noLink={true} onClick={undefined} circle noClick>
                    <FontAwesomeIcon icon={faShare} />
                  </Button>
                  <strong className={cx("action-text")}>{data.shares}</strong>
                </div>
              </Menu>
            </div>
          </div>
        </div>
        <Button outline className={cx("login-button")}>
          Follow
        </Button>
      </div>
      <hr className={cx("horizontal-line")} />
    </div>
  );
}

export default ContentVideo;
