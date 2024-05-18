import React, { useState } from "react";
import Input from "./Input";

interface Props {
  getImageData: () => void;
  getMaskData: () => void;
  onGenerate?: (blob: Blob, prompt: string) => void;
}

export default function GenerateImage({
  getImageData,
  getMaskData,
  onGenerate,
}: Props) {
  const [prompt, setPrompt] = useState("");

  const canGenerate = !!prompt;

  const onPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Input type="text" onChange={onPromptChange} />
    </div>
  );
}
