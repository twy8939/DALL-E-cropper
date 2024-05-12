"use client";

import React, { useState } from "react";
import Navigation from "./Navigation";

export default function ImageEditor() {
  const [src, setSrc] = useState("");

  const handleUploadClick = (url: string) => {
    setSrc(url);
  };

  const handleDownloadClick = async () => {
    if (src) {
      downloadImage(src);
    }
  };

  const downloadImage = (src: string) => {
    const a = document.createElement("a");
    a.href = src;
    a.download = src;
    a.click();
  };

  return (
    <div className="h-screen">
      {src && <img src={src} alt={"img"} />}
      <Navigation
        onDownload={handleDownloadClick}
        onUpload={handleUploadClick}
      />
    </div>
  );
}
