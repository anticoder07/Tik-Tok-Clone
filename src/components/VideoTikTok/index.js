import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import {
  faArrowUp,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";

import styles from "./CustomVideoPlayer.module.scss";

const cx = classNames.bind(styles);

function VideoTikTok({ src }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sound, setSound] = useState(false);

  const videoHandler = (control) => {
    if (control === "play") {
      videoRef.current.play();
      setPlaying(false);
    } else if (control === "pause") {
      videoRef.current.pause();
      setPlaying(true);
    }
  };

  const fastForward = () => {
    videoRef.current.currentTime += 5;
  };

  const revert = () => {
    videoRef.current.currentTime -= 5;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(videoRef.current?.currentTime);
      setProgress((videoRef.current?.currentTime / videoTime) * 100);
    }, 10);
    return () => clearInterval(interval);
  }, [videoTime]);

  return (
    <div className={cx("video-container")}>
      <video
        id="video1"
        className={cx("video-comp")}
        src={src}
        ref={videoRef}
        width={"320px"}
        height={"565px"}
        onLoadedMetadata={() => {
          let vid = document.getElementById("video1");
          setVideoTime(vid.duration);
        }}
      ></video>

      <div className={cx("controls-container")}>
        <div className={cx("controls")}>
          <div className={cx("icon-button")}>
            {playing ? (
              <div
                className={cx("control-play")}
                onClick={() => videoHandler("play")}
              >
                <FontAwesomeIcon icon={faPlay} />
              </div>
            ) : (
              <div
                className={cx("control-play")}
                onClick={() => videoHandler("pause")}
              >
                <FontAwesomeIcon icon={faPause} />
              </div>
            )}
          </div>

          <div className={cx("icon-button")}>
            <Tippy content="Auto scroll is off">
              <FontAwesomeIcon icon={faArrowUp} />
            </Tippy>
          </div>
          <div className={cx("icon-button")}>
            {sound ? (
              <FontAwesomeIcon icon={faVolumeHigh} />
            ) : (
              <FontAwesomeIcon icon={faVolumeXmark} />
            )}
          </div>
        </div>

        <div className={cx("time-container")}>
          <div className={cx("time_progressbarContainer")}>
            <div
              style={{ width: `${progress}%` }}
              className={cx("time_progressBar")}
            ></div>
          </div>

          <p className={cx("text-time", "controlsTime")}>
            {Math.floor(currentTime / 60) +
              ":" +
              ("0" + Math.floor(currentTime % 60)).slice(-2)}
          </p>
          <p className={cx("text-time", "controlsVideoTime")}>
            {"/" + (videoTime / 100).toFixed(2).padStart(5, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoTikTok;
