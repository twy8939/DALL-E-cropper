import React, { useRef } from "react";
import IconButton from "./IconButton";
import { FiDownload, FiUpload } from "react-icons/fi";

interface Props {
  mode: "crop" | "generate";
  onUpload?: (blob: string) => void;
  onDownload?: () => void;
  onCrop?: () => void;
}

export default function Navigation({
  mode,
  onUpload,
  onDownload,
  onCrop,
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
      </div>

      <IconButton title="Download Image" onClick={onDownload}>
        <FiDownload />
      </IconButton>
    </div>
  );
}
