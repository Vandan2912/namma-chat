import React from "react";
import "@/styles/fulllScreenLoader.css";

const FullScreenLoader = ({ opacity }: { opacity?: number }) => {
  return (
    <div className="loader !z-[9999] fixed top-0">
      <div
        id="overlay"
        className="fixed top-0 !z-[9998] bg-white h-screen w-screen"
        style={{ opacity: opacity || 1 }}></div>
      <div className="boxes !z-[9999]">
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
