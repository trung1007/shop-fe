"use client";
import { Spin } from "antd";
import { useSelector } from "react-redux";

const Loading = () => {
  const uploading = useSelector((state: any) => state.loading.uploading);
  if (!uploading) return null;

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default Loading;
