import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import ContentVideo from "../../layouts/components/ContentVideo";
import * as videoService from "../../services/videoService";

const cx = classNames.bind(styles);

function Home() {
  const [videos, setVideos] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    // fetch(`http://localhost:3000/content`)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setVideos(res.data);
    //   });

    const fetchApi = async () => {
      const result = await videoService.video();
      setVideos(result);
    };

    fetchApi();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        scrollRef.current.offsetHeight
      ) {
        setReachedEnd(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await videoService.videoMore();
      setVideos((prevVideos) => [...prevVideos, ...result]);
    };

    fetchApi();
    setReachedEnd(false);
  }, [reachedEnd]);

  const renderItem = () => {
    return videos.map((item) => {
      let data = {
        name: item.name,
        tick: item.tick,
        avatar: item.avatar,
        description: item.description,
        video: item.video,
        likes: item.likes,
        comments: item.comments,
        markers: item.markers,
        shares: item.shares,
      };

      return <ContentVideo key={data.id} data={data} />;
    });
  };

  return (
    <div className={cx("container")} ref={scrollRef}>
      {renderItem()}
    </div>
  );
}

export default Home;
