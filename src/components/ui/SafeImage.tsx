"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

/**
 * A wrapper around Next.js Image component that handles loading errors
 * and provides a fallback placeholder.
 */
export function SafeImage({ src, fallbackSrc = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80", alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  // Reset error state if src changes
  useEffect(() => {
    setImgSrc(src);
    setError(false);
  }, [src]);

  return (
    <Image
      {...props}
      src={error ? fallbackSrc : imgSrc}
      alt={alt}
      onError={() => {
        if (!error) {
          setError(true);
        }
      }}
    />
  );
}
