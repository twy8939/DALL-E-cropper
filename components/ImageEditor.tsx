"use client";

import React, { useRef, useState } from "react";
import Navigation from "./Navigation";
import {
  Coordinates,
  CropperRef,
  FixedCropper,
  FixedCropperRef,
  ImageRestriction,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import ImageSelector from "./ImageSelector";
import { resolve } from "path";
import { rejects } from "assert";

export default function ImageEditor() {
  const cropperRef = useRef<FixedCropperRef>(null);

  const [src, setSrc] = useState("");
  const [mode, setMode] = useState<"crop" | "generate">("crop");
  const [selectionRect, setSelectionRect] = useState<Coordinates | null>();

  const isGenerating = mode === "generate";

  const crop = async () => {
    const imageSrc = await getCroppedImageSrc();
    if (imageSrc) {
      setSrc(imageSrc);
      setMode("generate");
    }
  };

  const handleUploadClick = (url: string) => {
    setSrc(url);
    setMode("crop");
  };

  const handleDownloadClick = async () => {
    if (isGenerating) {
      downloadImage(src);
      return;
    }

    const imageSrc = await getCroppedImageSrc();

    if (imageSrc) {
      downloadImage(imageSrc);
    }
  };

  const downloadImage = (src: string) => {
    const a = document.createElement("a");
    a.href = src;
    a.download = src;
    a.click();
  };

  const getCroppedImageSrc = async () => {
    if (!cropperRef.current) return;

    const canvas = cropperRef.current.getCanvas({
      height: 1024,
      width: 1024,
    });

    if (!canvas) return;

    const blob = (await getCanvasData(canvas)) as Blob;

    return blob ? URL.createObjectURL(blob) : null;
  };

  const getCanvasData = async (canvas: HTMLCanvasElement | null) => {
    return new Promise((resolve, reject) => {
      canvas?.toBlob(resolve);
    });
  };

  const onSelectionChange = (cropper: CropperRef) => {
    setSelectionRect(cropper.getCoordinates());
  };

  const getImageData = async () => {
    if (!src) return;

    const canvas = document.createElement("canvas");
    await drawImage(canvas, src);

    return getCanvasData(canvas);
  };

  const drawImage = (canvas: HTMLCanvasElement | null, src: string) => {
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        canvas.width = width;
        canvas.height = height;

        context.drawImage(image, 0, 0, width, height);
        resolve(context);
      };

      image.src = src;
    });
  };

  const getMaskData = async () => {
    if (!src || !selectionRect) return;

    const canvas = document.createElement("canvas");
    drawMask(canvas, selectionRect);

    return getCanvasData(canvas);
  };

  const drawMask = (
    canvas: HTMLCanvasElement | null,
    rect: Coordinates | null
  ) => {
    const context = canvas?.getContext("2d");

    if (!context || !rect) return;

    context.globalCompositeOperation = "destination-out";
    context.fillRect(rect.left, rect.top, rect.width, rect.height);
  };

  return (
    <div className="w-full bg-slate-950 rounded-lg overflow-hidden">
      {isGenerating ? (
        <ImageSelector
          src={src}
          selectionRect={selectionRect}
          onSelectionChange={onSelectionChange}
        />
      ) : (
        <FixedCropper
          src={src}
          ref={cropperRef}
          stencilProps={{
            movable: false,
            resizable: false,
            lines: false,
            handlers: false,
          }}
          className="h-[600px]"
          stencilSize={{
            width: 600,
            height: 600,
          }}
          imageRestriction={ImageRestriction.stencil}
        />
      )}
      <Navigation
        mode={mode}
        onDownload={handleDownloadClick}
        onUpload={handleUploadClick}
        onCrop={crop}
      />
    </div>
  );
}
