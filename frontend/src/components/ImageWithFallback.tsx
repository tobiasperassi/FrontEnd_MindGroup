import { useState } from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export default function ImageWithFallback({ src, ...props }: Props) {
  const fallbackSrc =
    "https://st2.depositphotos.com/1001599/7241/v/950/depositphotos_72418305-stock-illustration-camera-thin-line-icon.jpg";
  const [imgSrc, setImgSrc] = useState(src);
  if (imgSrc == ""){
    setImgSrc(fallbackSrc)
  }

  return (
    <img
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
