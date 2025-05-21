import { useState } from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export default function ImageWithFallback({ src, alt, ...props }: Props) {
  const fallbackSrc =
    "https://st2.depositphotos.com/1001599/7241/v/950/depositphotos_72418305-stock-illustration-camera-thin-line-icon.jpg";
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
