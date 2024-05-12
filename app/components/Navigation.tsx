import React, { useRef } from "react";
import IconButton from "./IconButton";
import { FiDownload, FiUpload } from "react-icons/fi";

interface Props {
  onUpload?: (blob: string) => void;
  onDownload?: () => void;
}

export default function Navigation({ onUpload, onDownload }: Props) {
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

      <IconButton title="Download Image" onClick={onDownload}>
        <FiDownload />
      </IconButton>
    </div>
  );
}
