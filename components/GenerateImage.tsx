import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

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

  const generate = async () => {
    const image = (await getImageData()) as any;
    const mask = (await getMaskData()) as any;

    if (!image || !mask) return;

    const formData = new FormData();

    formData.append("image", image);
    formData.append("mask", mask);
    formData.append("prompt", prompt);
    formData.append("response_format", "b64_json");

    let result, response;

    try {
      response = await fetch("https://api.openai.com/v1/images/edits", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
        },
        body: formData,
      });

      result = await response.json();

      if (result.error) {
        throw new Error(result.error.message);
      }

      const imageData = result.data[0].b64_json;
      const blob = dataURLToBlob(imageData, "image/png");

      if (onGenerate) {
        onGenerate(blob, prompt);
      }
    } catch (error) {}
  };

  const dataURLToBlob = (dataURL: string, type: string) => {
    var binary = atob((dataURL || "").trim());
    var array = new Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }

    return new Blob([new Uint8Array(array)], { type });
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Input type="text" onChange={onPromptChange} />
      <Button disabled={!canGenerate} onClick={generate}>
        Generate
      </Button>
    </div>
  );
}
