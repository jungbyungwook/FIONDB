import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}
export const ImageWithFallback = ({
  src,
  fallbackSrc,
  ...props
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image src={imgSrc} onError={() => setImgSrc(fallbackSrc)} {...props} />
  );
};
