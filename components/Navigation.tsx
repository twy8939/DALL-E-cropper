import React, { useRef } from "react";
import IconButton from "./IconButton";
import { FiDownload, FiUpload } from "react-icons/fi";
import GenerateImage from "./GenerateImage";

interface Props {
  mode: "crop" | "generate";
  onUpload?: (blob: string) => void;
  onDownload?: () => void;
  onCrop?: () => void;
  onGenerate?: (blob: Blob, prompt: string) => void;
  getImageData: () => Promise<any>;
  getMaskData: () => Promise<any>;
}

export default function Navigation({
  mode,
  onUpload,
  onDownload,
  onCrop,
  onGenerate,
  getImageData,
  getMaskData,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const onLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (onUpload && file) {
      onUpload(URL.createObjectURL(file));
    }
  };

  const onGenerateImage = (blob: Blob, prompt: string) => {
    if (onGenerate) {
      onGenerate(blob, prompt);
    }
  };

  return (
    <div className="flex justify-between bg-slate-900 p-5">
      <IconButton title="Upload Image" onClick={handleUploadClick}>
        <FiUpload />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onLoadImage}
        />
      </IconButton>
      <div className="flex grow items-center justify-center gap-2 mx-20">
        {mode === "crop" && (
          <button className="bg-sky-500 px-3 py-2 text-white" onClick={onCrop}>
            Crop
          </button>
        )}
        {mode === "generate" && (
          <GenerateImage
            getImageData={getImageData}
            getMaskData={getMaskData}
            onGenerate={onGenerateImage}
          />
        )}
      </div>

      <IconButton title="Download Image" onClick={onDownload}>
        <FiDownload />
      </IconButton>
    </div>
  );
}
